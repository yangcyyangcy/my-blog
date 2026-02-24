import Sidebar from '@/components/Sidebar';

export const metadata = {
    title: '分类与标签 | yancey',
};

export default function Categories() {
    return (
        <div className="container layout-wrapper" style={{ marginTop: 'calc(var(--nav-height) + 2rem)' }}>
            <div className="main-content">
                <div style={{ padding: '1rem 0 2rem 0' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.04em' }}>分类与搜索</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                        这里是分类与标签的索引页。您可以直接在此页面规划您的归档目录。
                    </p>
                </div>

                <div className="post-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border-hover)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1.5rem auto' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>内容建设中</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>您可以在此处自由配置搜索和过滤组件来管控您的博客内容。</p>
                </div>
            </div>

            <aside className="sidebar">
                <Sidebar />
            </aside>
        </div>
    );
}
