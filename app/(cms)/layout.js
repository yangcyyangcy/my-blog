import Translator from './Translator'

export const metadata = {
    title: 'Outstatic CMS',
    description: 'Outstatic Admin Dashboard',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body id="outstatic">
                {children}
                <Translator />
            </body>
        </html>
    )
}
