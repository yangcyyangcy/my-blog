import { getPostData } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    try {
        const postData = await getPostData(slug);
        return {
            title: `${postData.title} | Blog`,
            description: postData.description || '阅读此文章了解更多',
        };
    } catch (error) {
        return {
            title: '文章不存在',
        };
    }
}

export default async function Post({ params }) {
    const { slug } = await params;
    try {
        const postData = await getPostData(slug);

        return (
            <article>
                <div style={{ marginBottom: '2.5rem', marginTop: '1.5rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>{postData.title}</h1>
                    <div style={{ color: 'var(--text-secondary)', display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                        <span>{postData.date}</span>
                        {postData.author && <span>· {postData.author}</span>}
                    </div>
                </div>

                <div
                    className="markdown-content"
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                />

                <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <Link href="/blog" style={{ color: 'var(--text-secondary)' }}>
                        ← 返回博客列表
                    </Link>
                </div>
            </article>
        );
    } catch (error) {
        return notFound();
    }
}
