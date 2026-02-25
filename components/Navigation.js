'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        let scrollTimeout;
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if we are at the very top of the page
            setIsAtTop(currentScrollY < 10);

            // Logic 1: On Post detail pages (/blog/xxx), we want to hide it unless scrolling up, or we can just hide it completely as requested.
            // The prompt asks to "not show top nav on article pages". Let's hide it completely on /blog/* except /blog itself if it's a list.
            const isArticlePage = pathname.startsWith('/blog/') && pathname.length > 6;

            if (isArticlePage) {
                // Instantly hide on article pages
                setIsVisible(false);
                return;
            }

            // Logic 2: On Homepage (and other pages), only show while scrolling, hide 2s after stop, AND hide when at the very top (still).
            // Actually, "do not show navigation at rest on homepage, show when sliding, hide after 2s stop"

            // We are scrolling! Show the navbar.
            setIsVisible(true);

            // Clear any existing timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Set a timeout to hide the navbar after 2 seconds of no scrolling
            scrollTimeout = setTimeout(() => {
                setIsVisible(false);
            }, 2000);

            lastScrollY = currentScrollY;
        };

        // Initial check for route-based blanking
        const isArticlePage = pathname.startsWith('/blog/') && pathname.length > 6;
        if (isArticlePage) {
            setIsVisible(false);
        } else {
            // If on homepage and at top, should it be hidden initially? Yes, "at rest do not show"
            setIsVisible(false);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, [pathname]);

    return (
        <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="header-container">
                <Link href="/" className="logo">
                    yancey
                </Link>
                <nav>
                    <ul className="nav-links">
                        <li>
                            <Link href="/categories" className="nav-link">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> 搜索
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="nav-link">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> 主页
                            </Link>
                        </li>
                        <li>
                            <Link href="/categories" className="nav-link">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> 分类
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="nav-link">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> 说说
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="nav-link">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg> 云盘
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
