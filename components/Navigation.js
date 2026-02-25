'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchModal from './SearchModal';

export default function Navigation() {
    const pathname = usePathname();
    const [isAtTop, setIsAtTop] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        // Initial check on mount
        const calculateScroll = () => {
            if (window.scrollY < 10) {
                setIsAtTop(true);
            } else {
                setIsAtTop(false);
            }
        };

        // Trigger initial fade-in after a tick so transition applies
        setTimeout(calculateScroll, 50);

        const handleScroll = () => {
            calculateScroll();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    return (
        <>
            <header className={`header ${isAtTop ? 'fade-in' : ''}`}>
                <div className="header-container">
                    <Link href="/" className="logo">
                        yancey
                    </Link>
                    <nav>
                        <ul className="nav-links">
                            <li>
                                <button onClick={() => setIsSearchOpen(true)} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><span>搜索</span>
                                </button>
                            </li>
                            <li>
                                <Link href="/" className="nav-link">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg><span>主页</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="nav-link">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg><span>分类</span>
                                </Link>
                            </li>

                            <li>
                                <Link href="/about" className="nav-link">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg><span>关于</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
