import { getSortedPostsData } from '@/lib/posts';

export default async function sitemap() {
    const baseUrl = 'https://www.yancey.blog';

    // Get all blog posts
    const posts = await getSortedPostsData();

    const blogUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Add static routes
    const routes = ['', '/blog', '/about', '/archives', '/categories'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.9,
    }));

    return [...routes, ...blogUrls];
}
