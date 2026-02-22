import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default async function Home() {
    const allPostsData = getSortedPostsData();
    const recentPosts = allPostsData.slice(0, 3); // 首页展示最新的 3 篇文章

    return (
        <div>
            <section className="hero">
                <h1 className="typewriter-container">
                    你好，我是新晋博主
                    <span className="typewriter-cursor"></span>
                </h1>
                <p>
                    欢迎来到我的个人博客。这里我会分享一些关于生活、技术和随想的内容。
                    这是一个追求极致简约、响应式设计并支持深色模式的数字花园。
                </p>
            </section>

            <section className="recent-posts">
                <h2>最新文章</h2>
                <div className="post-list">
                    {recentPosts.map(({ id, date, title, description }) => (
                        <Link href={`/blog/${id}`} key={id} className="post-card">
                            <h3>{title}</h3>
                            <div className="date">{date}</div>
                            <p>{description}</p>
                        </Link>
                    ))}
                </div>

                {allPostsData.length > 3 && (
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <Link href="/blog" style={{ fontWeight: 500, display: 'inline-block', padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: '0.5rem' }}>
                            查看所有文章 →
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}
