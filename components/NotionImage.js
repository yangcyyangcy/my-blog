'use client';

import Image from 'next/image';

export default function NotionImage({ src, alt, ...props }) {
    // If the image doesn't have a valid src, just return null
    if (!src) return null;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
            <Image
                src={src}
                alt={alt || "Article Image"}
                width={1200}
                height={800}
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-md)',
                }}
                {...props}
            />
        </div>
    );
}
