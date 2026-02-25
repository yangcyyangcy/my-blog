import Sidebar from '@/components/Sidebar';
import Comments from '@/components/Comments';

export const metadata = {
    title: '关于 | yancey',
};

export default function About() {
    return (
        <div className="container layout-wrapper" style={{ marginTop: 'calc(var(--nav-height) + 2rem)' }}>
            <div className="main-content">
                <div style={{ padding: '1rem 0 2rem 0' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.04em' }}>关于 / About</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        你好，欢迎来到我的网络自留地。
                    </p>
                </div>

                <div className="markdown-content" style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>
                    <p>
                        这是一个由 <strong>Next.js + Notion API</strong> 驱动的现代化极客博客。我在这里记录关于技术的探索、折腾各种工具的心得，以及生活中的碎碎念。
                    </p>

                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem' }}>关于本站</h2>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                        <li><strong>架构：</strong> 基于 Next.js App Router 的 React 服务端组件架构。</li>
                        <li><strong>数据源：</strong> 告别本地 Markdown，完全通过 Notion 数据库进行全自动无头(Headless)管理。</li>
                        <li><strong>部署：</strong> 托管于 Vercel 边缘网络，开启了 ISR（增量静态缓存），发文即时同步。</li>
                        <li><strong>设计语言：</strong> 全局高对比度深色模式，搭配流畅的微量玻璃态动效。</li>
                    </ul>

                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem' }}>找到我</h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="https://github.com/yanceyyancey" target="_blank" rel="noopener noreferrer" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem',
                            color: 'var(--text-primary)', textDecoration: 'none', border: '1px solid var(--border)'
                        }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            GitHub
                        </a>
                        <a href="mailto:yancey@example.com" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem',
                            color: 'var(--text-primary)', textDecoration: 'none', border: '1px solid var(--border)'
                        }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            Email
                        </a>
                    </div>
                </div>

                <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: '700' }}>留言板</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>在这里留下你想对我说的话，或者单纯打个招呼吧！</p>
                    <Comments />
                </div>
            </div>

            <aside className="sidebar">
                <Sidebar />
            </aside>
        </div>
    );
}
