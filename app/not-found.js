import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h2>
            <p style={{ marginBottom: '2rem' }}>糟糕，您访问的页面不存在！</p>
            <Link href="/" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--accent)', color: 'var(--bg-primary)', borderRadius: '0.25rem' }}>
                返回首页
            </Link>
        </div>
    );
}
