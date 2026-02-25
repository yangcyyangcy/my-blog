import '../globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'My Premium Blog',
  description: 'A modern, luxurious personal blog built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <Navigation />

        <main>
          {children}
        </main>

        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} My Blog.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
