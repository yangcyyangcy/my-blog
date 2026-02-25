import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';

export const metadata = {
    title: '归档 - Timeline Archives',
};

export const revalidate = 60; // Regenerate every 60 seconds

export default async function Archives() {
    const allPostsData = await getSortedPostsData();

    // Group posts by Year
    const groupedPosts = allPostsData.reduce((acc, post) => {
        const year = new Date(post.date).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(post);
        return acc;
    }, {});

    const sortedYears = Object.keys(groupedPosts).sort((a, b) => b - a);

    return (
        <div className="container layout-wrapper" style={{ marginTop: 'calc(var(--nav-height) + 2rem)' }}>
            <div className="main-content">
                <div style={{ padding: '1rem 0 2rem 0' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.04em' }}>归档</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                        回顾过去，记录点滴。共计 {allPostsData.length} 篇文章。
                    </p>
                </div>

                <div className="timeline-container">
                    {sortedYears.map((year) => (
                        <div key={year} className="timeline-year-group">
                            <h2 className="timeline-year">{year}</h2>
                            <div className="timeline-posts">
                                {groupedPosts[year].map(({ slug, title, date, category }) => {
                                    const postDate = new Date(date);
                                    const monthDay = `${(postDate.getMonth() + 1).toString().padStart(2, '0')}-${postDate.getDate().toString().padStart(2, '0')}`;

                                    return (
                                        <div key={slug} className="timeline-item">
                                            <div className="timeline-dot"></div>
                                            <div className="timeline-content">
                                                <span className="timeline-date">{monthDay}</span>
                                                <Link href={`/blog/${slug}`} className="timeline-title">
                                                    {title}
                                                </Link>
                                                {category && (
                                                    <span className="timeline-category">{category}</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
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
