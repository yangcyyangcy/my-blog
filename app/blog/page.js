import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export const metadata = {
    title: 'Blog - 所有文章',
};

export default function Blog() {
    const allPostsData = getSortedPostsData();

    return (
        <div>
            <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>所有文章</h1>
            <div className="post-list">
                {allPostsData.map(({ id, date, title, description }) => (
                    <Link href={`/blog/${id}`} key={id} className="post-card">
                        <h3>{title}</h3>
                        <div className="date">{date}</div>
                        <p>{description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
