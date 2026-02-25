import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';

export const metadata = {
    title: 'Blog - 所有文章',
};

export default async function Blog() {
    const allPostsData = await getSortedPostsData();

    return (
        <div className="container layout-wrapper" style={{ marginTop: 'calc(var(--nav-height) + 2rem)' }}>
            <div className="main-content">
                <div style={{ padding: '1rem 0 2rem 0' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.04em' }}>所有文章</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                        记录技术成长与生活感悟，分享有价值的内容。
                    </p>
                </div>

                <div className="post-list list-view">
                    {allPostsData.map(({ slug, date, title, description }) => (
                        <Link href={`/blog/${slug}`} key={slug} className="post-card">
                            <div className="post-card-content">
                                <h3>{title}</h3>
                                <div className="date">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    {date}
                                </div>
                                <p>{description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <aside className="sidebar">
                <Sidebar />
            </aside>
        </div>
    );
}
