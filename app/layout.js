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
              博客
            </Link>
            <nav>
              <ul className="nav-links">
                <li>
                  <Link href="/" className="nav-link">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="nav-link">
                    文章
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="container">
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
