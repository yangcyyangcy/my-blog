import Sidebar from '@/components/Sidebar';
import Comments from '@/components/Comments';

export const metadata = {
    title: '说说 | yancey',
};

export default function About() {
    return (
        <div className="container layout-wrapper" style={{ marginTop: 'calc(var(--nav-height) + 2rem)' }}>
            <div className="main-content">
                <div style={{ padding: '1rem 0 2rem 0' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.04em' }}>说说 (About)</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                        随便聊聊，记录生活碎事和短篇灵感。
                    </p>
                </div>

                <div className="markdown-content" style={{ marginTop: '2rem' }}>
                    <blockquote style={{ borderLeftColor: 'var(--accent)', backgroundColor: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                        <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            "这里是你可以自由发表简短动态的地方。因为我们接入了 Giscus 评论区，你完全可以把下方的评论框当成小型的朋友圈来使用！"
                        </p>
                    </blockquote>
                </div>

                {/* 利用 Giscus 作为说说/留言板 */}
                <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '2rem' }}>参与讨论</h3>
                    <Comments />
                </div>
            </div>

            <aside className="sidebar">
                <Sidebar />
            </aside>
        </div>
    );
}
