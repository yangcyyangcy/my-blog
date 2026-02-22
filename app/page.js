import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default async function Home() {
    const allPostsData = getSortedPostsData();
    const recentPosts = allPostsData.slice(0, 4); // 首页展示最新的 4 篇文章（变成 2x2 网格）

    return (
        <div>
            <section className="hero">
                <div style={{ display: 'inline-block', padding: '0.25rem 1rem', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
                    V2.0 升级版 ✨
                </div>
                <h1 className="typewriter-container">
                    你好，我是<span className="gradient-text">yancey</span>
                    <span className="typewriter-cursor"></span>
                </h1>
                <p>
                    欢迎来到我的数字花园。这里不仅记录代码与技术的深度探索，
                    <br />同时也分享关于设计美学、生活灵感的随行笔记。
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <Link href="/blog" className="btn-primary">
                        阅读文章
                    </Link>
                    <a href="https://github.com/yangcyyangcy" target="_blank" rel="noopener noreferrer" className="btn-outline">
                        GitHub
                    </a>
                </div>
            </section>

            <section className="recent-posts" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 700 }}>近期精选</h2>
                    <Link href="/blog" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
                        全部文章 →
                    </Link>
                </div>

                <div className="post-list">
                    {recentPosts.map(({ id, date, title, description }) => (
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
            </section>
        </div>
    );
}
