import { getSortedPostsData, getPostData } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';

export const metadata = {
    title: '说说 - Journals',
};

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
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    marginBottom: '2rem',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                }}>
                                    <div className="journal-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div className="journal-avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', overflow: 'hidden' }}>
                                            <img src={author?.picture || "https://github.com/yanceyyancey.png"} alt="author" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div className="journal-meta">
                                            <div style={{ fontWeight: 600, fontSize: '1rem' }}>{author?.name || 'yancey'}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{postDate}</div>
                                        </div>
                                    </div>
                                    <div
                                        className="journal-content markdown-content"
                                        style={{ fontSize: '1.05rem', lineHeight: 1.6 }}
                                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                                    />
                                    <div className="journal-actions" style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                                        <button className="action-btn" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', outline: 'none' }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                            <span style={{ fontSize: '0.9rem' }}>赞</span>
                                        </button>
                                        <button className="action-btn" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', outline: 'none' }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                            <span style={{ fontSize: '0.9rem' }}>评论</span>
                                        </button>
                                        <button className="action-btn" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', outline: 'none', marginLeft: 'auto' }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
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
