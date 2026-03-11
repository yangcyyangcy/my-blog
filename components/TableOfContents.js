'use client';

import { useEffect, useState, useRef } from 'react';

export default function TableOfContents({ toc }) {
    const [activeId, setActiveId] = useState('');
    const isClickScrolling = useRef(false);

    useEffect(() => {
        if (!toc || toc.length === 0) return;

        let ticking = false;

        const handleScroll = () => {
            if (isClickScrolling.current) return;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const headingElements = toc.map(item => document.getElementById(item.id)).filter(Boolean);
                    if (headingElements.length === 0) {
                        ticking = false;
                        return;
                    }

                    let currentActiveId = toc[0].id;

                    for (let i = 0; i < headingElements.length; i++) {
                        const rect = headingElements[i].getBoundingClientRect();
                        // 150px offset to trigger active state when heading is near the top
                        if (rect.top <= 150) {
                            currentActiveId = headingElements[i].id;
                        } else {
                            break;
                        }
                    }

                    // Check if we are at the absolute bottom of the page
                    if ((window.innerHeight + Math.round(window.scrollY)) >= document.documentElement.scrollHeight - 50) {
                        currentActiveId = headingElements[headingElements.length - 1].id;
                    }

                    setActiveId(currentActiveId);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [toc]);

    if (!toc || toc.length === 0) {
        return null;
    }

    // Handle smooth scrolling when clicking a TOC link
    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            isClickScrolling.current = true;
            setActiveId(id);

            // Adjust offset for floating header if needed
            const offset = 100; // rough estimate for nav bar height + padding
            const top = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });

            // Reset the flag after smooth scroll is likely finished
            setTimeout(() => {
                isClickScrolling.current = false;
            }, 1000);
        }
    };

    return (
        <nav className="toc-container">
            <ul className="toc-list">
                {toc.map((item) => {
                    return (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => handleClick(e, item.id)}
                                className={`toc-link ${activeId === item.id ? 'active' : ''}`}
                            >
                                <span className="toc-text">{item.text}</span>
                                <span className="toc-line"></span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

