export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'],
        },
        sitemap: 'https://www.yancey.blog/sitemap.xml',
    }
}
