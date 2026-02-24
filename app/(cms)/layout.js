export const metadata = {
    title: 'Outstatic CMS',
    description: 'Outstatic Admin Dashboard',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
