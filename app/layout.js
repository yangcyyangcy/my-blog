import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'My Premium Blog',
  description: 'A modern, luxurious personal blog built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="header">
          <div className="header-container">
            <Link href="/" className="logo">
              yancey
            </Link>
            <nav>
              <ul className="nav-links">
                <li>
                  <Link href="/" className="nav-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> 搜索
                  </Link>
                </li>
                <li>
                  <Link href="/" className="nav-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> 主页
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="nav-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> 分类
                  </Link>
                </li>
                <li>
                  <Link href="#" className="nav-link">
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

        <main>
          {children}
        </main>

        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} My Blog. Designed with precision & elegance.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
