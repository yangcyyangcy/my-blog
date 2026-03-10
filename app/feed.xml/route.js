import { getSortedPostsData } from '@/lib/posts';

export const revalidate = 3600; // Cache the RSS feed for 1 hour

export async function GET() {
    try {
        const posts = await getSortedPostsData();
        const siteUrl = 'https://www.yancey.blog';

        // Limit feed to the 20 most recent posts to keep size reasonable
        const feedPosts = posts.slice(0, 20);

        const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>yancey | 专注保姆级教程，小白福利站</title>
    <link>${siteUrl}</link>
    <description><![CDATA[专注保姆级教程，小白福利站。覆盖日常任务：总结、改写、代码解释、轻量 RAG、工具调用。]]></description>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${feedPosts.map(post => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      </item>`).join('')}
  </channel>
</rss>`;

        return new Response(rssXml, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
            },
        });
    } catch (error) {
        console.error("Error generating RSS feed:", error);
        return new Response("Error generating RSS feed", { status: 500 });
    }
}
