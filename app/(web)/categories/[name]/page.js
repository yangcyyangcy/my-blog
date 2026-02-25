import Link from 'next/link';
import { getSortedPostsData, getSiteStats } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';

export const revalidate = 60; // ISR Support

export async function generateMetadata({ params }) {
    const decodedCategory = decodeURIComponent((await params).name);
    return {
        title: `分类: ${decodedCategory} | yancey`,
        description: `查看在分类 "${decodedCategory}" 下的所有博客文章`,
    };
}

export default async function CategoryPage({ params }) {
    const decodedCategory = decodeURIComponent((await params).name);
    const allPostsData = await getSortedPostsData();

    // Filter posts by the current Category
    const filteredPosts = allPostsData.filter(
        (post) => post.category === decodedCategory
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
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                            {decodedCategory}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                            该分类下共有 {filteredPosts.length} 篇文章
                        </p>
                    </div>
                </div>

                <div className="post-list" style={{ marginTop: '1rem' }}>
                    {filteredPosts.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-secondary)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <p style={{ color: 'var(--text-muted)' }}>该分类下暂无文章</p>
                        </div>
                    ) : (
                        filteredPosts.map(({ slug, date, title, description }) => (
                            <Link href={`/blog/${slug}`} key={slug} style={{ textDecoration: 'none' }}>
                                <div className="post-card" style={{ marginBottom: '1.5rem', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '1rem', background: 'var(--bg-primary)', transition: 'all 0.2s ease' }}>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                                        {new Date(date).toISOString().split('T')[0]}
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
