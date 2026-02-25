import { getSortedPostsData, getPostData } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';

export const metadata = {
    title: '说说 - Journals',
};

export const revalidate = 60; // Regenerate every 60 seconds

// We will fetch all posts, filter by category='说说' or 'Journal', and then hydrate their full HTML content
export default async function Journals() {
    const allPostsData = await getSortedPostsData();

    // Filter posts that belong to the short-form Journal category
    const journalSlugs = allPostsData
        .filter(post => post.category === '说说' || post.category === 'Journal')
        .map(post => post.slug);

    // Fetch the full content HTML for each journal
    const journals = await Promise.all(
        journalSlugs.map(slug => getPostData(slug).catch(() => null))
    );

    const validJournals = journals.filter(Boolean);

    return (
        <div className="container layout-wrapper" style={{ marginTop: 'calc(var(--nav-height) + 2rem)' }}>
            <div className="main-content">
                <div style={{ padding: '1rem 0 2rem 0' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.04em' }}>说说 / Moments</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                        碎碎念，日常分享与瞬间捕获。
                    </p>
                </div>

                <div className="journals-list">
                    {validJournals.length === 0 ? (
                        <div className="empty-state" style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-secondary)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <svg style={{ margin: '0 auto 1rem text-muted', width: '48px', height: '48px', opacity: 0.5 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>还没有发布任何说说</h3>
                            <p style={{ color: 'var(--text-muted)' }}>请在 Notion 的 Category 列中标记为 "说说" 或 "Journal"</p>
                        </div>
                    ) : (
                        validJournals.map(({ slug, date, contentHtml, author }) => {
                            const postDate = new Date(date).toLocaleString('zh-CN', {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            });

                            return (
                                <div key={slug} className="journal-card" style={{
                                    background: 'var(--bg-primary)',
                                    border: '1px solid var(--border)',
                                    padding: '2rem',
                                    borderRadius: '1.2rem',
                                    marginBottom: '2.5rem',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)' }}>

                                    <div className="journal-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div className="journal-avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-secondary)', overflow: 'hidden', border: '2px solid var(--border)' }}>
                                            <img src={author?.picture || "https://github.com/yanceyyancey.png"} alt="author" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div className="journal-meta">
                                            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{author?.name || 'yancey'}</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{postDate}</div>
                                        </div>
                                    </div>

                                    <div
                                        className="journal-content markdown-content"
                                        style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-primary)' }}
                                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                                    />

                                    <div className="journal-actions" style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                        <button className="action-btn" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', outline: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                            <span style={{ fontSize: '0.95rem' }}>赞</span>
                                        </button>
                                        <button className="action-btn" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', outline: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                            <span style={{ fontSize: '0.95rem' }}>评论</span>
                                        </button>
                                        <button className="action-btn" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', outline: 'none', marginLeft: 'auto', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <aside className="sidebar">
                <Sidebar />
            </aside>
        </div>
    );
}
