import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';

export const revalidate = 60; // ISR Support

export async function generateMetadata({ params }) {
    const decodedTag = decodeURIComponent((await params).name);
    return {
        title: `标签: #${decodedTag} | yancey`,
        description: `查看带有标签 #${decodedTag} 的所有博客文章`,
    };
}

export default async function TagPage({ params }) {
    const decodedTag = decodeURIComponent((await params).name);
    const allPostsData = await getSortedPostsData();

    // Filter posts by the current Tag (checking if the tag exists in the post's tags array)
    const filteredPosts = allPostsData.filter(
        (post) => post.tags && Array.isArray(post.tags) && post.tags.includes(decodedTag)
    );

    return (
        <div className="container layout-wrapper" style={{ marginTop: 'calc(var(--nav-height) + 2rem)' }}>
            <div className="main-content">
                <div style={{ padding: '1rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/categories" className="back-btn" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
                        textDecoration: 'none', transition: 'all 0.2s ease'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </Link>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.2rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5 4 4"></path><path d="M13 14l6.16-6.16a2 2 0 0 0 0-2.82l-.4-.4a2 2 0 0 0-2.82 0L9.78 10.78"></path><path d="m7.3 14 6.7 6.7a2 2 0 0 1-.2 3l-1.4 1.4a2 2 0 0 1-2.8 0L2 17.5 7.3 14z"></path></svg>
                            # {decodedTag}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                            共有 {filteredPosts.length} 篇文章包含此标签
                        </p>
                    </div>
                </div>

                <div className="post-list" style={{ marginTop: '1rem' }}>
                    {filteredPosts.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-secondary)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <p style={{ color: 'var(--text-muted)' }}>该标签下暂无文章</p>
                        </div>
                    ) : (
                        filteredPosts.map(({ slug, date, title, description, category }) => (
                            <Link href={`/blog/${slug}`} key={slug} style={{ textDecoration: 'none' }}>
                                <div className="post-card" style={{ marginBottom: '1.5rem', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '1rem', background: 'var(--bg-primary)', transition: 'all 0.2s ease' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                                            {new Date(date).toISOString().split('T')[0]}
                                        </div>
                                        {category && (
                                            <div style={{ background: 'var(--bg-secondary)', padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                {category}
                                            </div>
                                        )}
                                    </div>
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                        {title}
                                    </h2>
                                    {description && (
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>
                                            {description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            <aside className="sidebar">
                <Sidebar />
            </aside>
        </div>
    );
}
