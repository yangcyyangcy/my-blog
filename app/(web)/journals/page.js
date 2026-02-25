import { getSortedPostsData, getPostData } from '@/lib/posts';
import JournalActions from '@/components/JournalActions';
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
                                <div key={slug} className="journal-card">

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

                                    <JournalActions slug={slug} />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

        </div>
    );
}

