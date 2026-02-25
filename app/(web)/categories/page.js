import Sidebar from '@/components/Sidebar';

export const metadata = {
    title: '分类与标签 | yancey',
};

export const revalidate = 60; // Regenerate every 60 seconds

import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

// Helper to calculate taxonomy counts
function getTaxonomy(posts) {
    const categories = {};
    const tags = {};

    posts.forEach(post => {
        if (post.category) {
            categories[post.category] = (categories[post.category] || 0) + 1;
        }
        if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach(tag => {
                tags[tag] = (tags[tag] || 0) + 1;
            });
        }
    });

    return { categories, tags };
}

export default async function Categories() {
    const allPostsData = await getSortedPostsData();
    const { categories, tags } = getTaxonomy(allPostsData);

    return (
        <div className="container layout-wrapper" style={{ marginTop: 'calc(var(--nav-height) + 2rem)' }}>
            <div className="main-content">
                <div style={{ padding: '1rem 0 2rem 0' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.04em' }}>分类与标签</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                        共计 {Object.keys(categories).length} 个分类，{Object.keys(tags).length} 个标签。
                    </p>
                </div>

                {/* Categories Section */}
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '2rem 0 1rem 0', color: 'var(--text-primary)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: '-3px' }}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    全部分类
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                    {Object.entries(categories).map(([category, count]) => (
                        <div key={category} className="category-card">
                            <span style={{ fontWeight: '500' }}>{category}</span>
                            <span style={{
                                background: 'var(--bg-primary)',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '99px',
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)'
                            }}>{count} 篇</span>
                        </div>
                    ))}
                </div>

                {/* Tags Section */}
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '2rem 0 1rem 0', color: 'var(--text-primary)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: '-3px' }}><path d="m15 5 4 4"></path><path d="M13 14l6.16-6.16a2 2 0 0 0 0-2.82l-.4-.4a2 2 0 0 0-2.82 0L9.78 10.78"></path><path d="m7.3 14 6.7 6.7a2 2 0 0 1-.2 3l-1.4 1.4a2 2 0 0 1-2.8 0L2 17.5 7.3 14z"></path></svg>
                    文章标签
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {Object.entries(tags).map(([tag, count]) => (
                        <div key={tag} className="tag-card">
                            <span># {tag}</span>
                            <span style={{ opacity: 0.5, fontSize: '0.85rem' }}>{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <aside className="sidebar">
                <Sidebar />
            </aside>
        </div>
    );
}
