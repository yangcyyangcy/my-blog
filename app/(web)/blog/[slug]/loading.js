export default function Loading() {
    return (
        <article className="container" style={{ maxWidth: '850px', margin: '0 auto', marginTop: 'calc(var(--nav-height) + 2rem)' }}>
            {/* Back link skeleton */}
            <div style={{ width: '120px', height: '20px', borderRadius: '8px', background: 'var(--bg-subtle)', marginBottom: '2rem' }} className="skeleton-pulse" />

            {/* Article header skeleton */}
            <header className="article-header" style={{ textAlign: 'center' }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div style={{ width: '60px', height: '28px', borderRadius: '16px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                    <div style={{ width: '50px', height: '28px', borderRadius: '16px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                </div>

                {/* Title */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '80%', height: '2.5rem', borderRadius: '12px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                    <div style={{ width: '50%', height: '2.5rem', borderRadius: '12px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                </div>

                {/* Meta (date, author, reading time) */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <div style={{ width: '100px', height: '18px', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                    <div style={{ width: '80px', height: '18px', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                    <div style={{ width: '100px', height: '18px', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                </div>
            </header>

            {/* Content skeleton */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ width: '100%', height: '1.2rem', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                <div style={{ width: '95%', height: '1.2rem', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                <div style={{ width: '88%', height: '1.2rem', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                <div style={{ width: '92%', height: '1.2rem', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                <div style={{ width: '75%', height: '1.2rem', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />

                <div style={{ height: '1rem' }} /> {/* Gap */}

                <div style={{ width: '60%', height: '1.8rem', borderRadius: '10px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />

                <div style={{ width: '100%', height: '1.2rem', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                <div style={{ width: '97%', height: '1.2rem', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                <div style={{ width: '85%', height: '1.2rem', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                <div style={{ width: '90%', height: '1.2rem', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />

                <div style={{ height: '1rem' }} />

                {/* Image placeholder */}
                <div style={{ width: '100%', height: '300px', borderRadius: '16px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />

                <div style={{ width: '100%', height: '1.2rem', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
                <div style={{ width: '80%', height: '1.2rem', borderRadius: '8px', background: 'var(--bg-subtle)' }} className="skeleton-pulse" />
            </div>
        </article>
    );
}
