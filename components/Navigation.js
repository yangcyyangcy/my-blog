'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let scrollTimeout;

        // 1. 如果在文章详情页内（/blog/具体文章名），导航栏被彻底隐藏
        const isArticlePage = pathname.startsWith('/blog/') && pathname.length > 6;
        if (isArticlePage) {
            setIsVisible(false);
            return;
        }

        // 2. 首页及其他页面：初始静止状态为"隐藏"，只有滑动时出现，滑动停止2s后再次隐藏
        const handleScroll = () => {
            // 一旦监听到滚动，立马显示导航栏
            setIsVisible(true);

            // 如果之前有倒计时，先清空重置
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // 重新开始 2 秒的倒计时，时间一到就隐藏它
            scrollTimeout = setTimeout(() => {
                setIsVisible(false);
            }, 2000);
        };

        // 初始装载时检查是否非文章页如果是也要默认隐藏（等待滚动）
        setIsVisible(false);

        // 监听滚动事件
        window.addEventListener('scroll', handleScroll, { passive: true });

        // 组件卸载时清理定时器和监听
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
