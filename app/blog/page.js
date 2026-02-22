import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export const metadata = {
    title: 'Blog - 所有文章',
};

export default function Blog() {
    const allPostsData = getSortedPostsData();

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.04em' }}>所有文章</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    记录技术成长与生活感悟，分享有价值的内容。
                </p>
            </div>

            <div className="post-list list-view" style={{ maxWidth: '700px', margin: '0 auto' }}>
                {allPostsData.map(({ id, date, title, description }) => (
                    <Link href={`/blog/${id}`} key={id} className="post-card">
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
    );
}
