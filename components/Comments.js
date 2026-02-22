'use client';

import { useEffect, useRef } from 'react';

export default function Comments() {
    const commentsRef = useRef(null);

    useEffect(() => {
        // Check if the script is already appended to prevent duplicates on navigation
        if (commentsRef.current && commentsRef.current.childNodes.length === 0) {
            const script = document.createElement('script');

            // Giscus Configuration attributes
            script.src = 'https://giscus.app/client.js';
            script.setAttribute('data-repo', 'yangcyyangcy/my-blog'); // Please replace with your actual repo
            script.setAttribute('data-repo-id', 'R_kgDONRxyKg'); // Optional but recommended, auto-filled if repo is valid
            script.setAttribute('data-category', 'Announcements');
            script.setAttribute('data-category-id', 'DIC_kwDONRxyKs4CkeVX');
            script.setAttribute('data-mapping', 'pathname');
            script.setAttribute('data-strict', '0');
            script.setAttribute('data-reactions-enabled', '1');
            script.setAttribute('data-emit-metadata', '0');
            script.setAttribute('data-input-position', 'top');

            // Auto-detect theme based on user's system preference
            const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            script.setAttribute('data-theme', isDarkMode ? 'transparent_dark' : 'light');

            script.setAttribute('data-lang', 'zh-CN');
            script.setAttribute('data-loading', 'lazy');
            script.crossOrigin = 'anonymous';
            script.async = true;

            commentsRef.current.appendChild(script);
        }
    }, []);

    return (
        <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>参与讨论</h3>
            <div ref={commentsRef} id="comments-container" />
        </div>
    );
}
