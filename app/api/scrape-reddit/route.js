import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: '请提供有效的 Reddit 链接' }, { status: 400 });
    }

    try {
        const match = url.match(/comments\/([a-zA-Z0-9]+)/);
        if (!match) {
            return NextResponse.json({ error: "无效的链接格式。请确保那是包含 'comments/...' 的有效 Reddit 帖子链接。" }, { status: 400 });
        }

        const postId = match[1];

        // Use a reliable Redlib frontend array for fallback redundancy
        const instances = [
            'https://l.opnxng.com',
            'https://redlib.ducks.party',
            'https://redlib.perennialte.ch',
            'https://redlib.4o1x5.dev'
        ];

        let html = null;
        let successInstance = null;

        for (const instance of instances) {
            try {
                // Notice we omit the subreddit. Redlib handles the redirect/localization internally.
                const targetUrl = `${instance}/comments/${postId}`;

                // Do NOT spoof Chrome UA here! Node fetch is less likely to be fingerprinted as a "fake browser" if it just uses default Node JS behavior 
                // compared to providing a Chrome UA with a Node TLS fingerprint!
                const response = await fetch(targetUrl, {
                    next: { revalidate: 0 }
                });

                if (response.ok) {
                    html = await response.text();
                    // Basic sanity check: did cloudflare/fastly intercept with a Bot Challenge?
                    if (!html.includes('Making sure you\'re not a bot!')) {
                        successInstance = instance;
                        break;
                    }
                }
            } catch (e) {
                console.warn(`Failed to fetch from ${instance}:`, e.message);
                continue;
            }
        }

        if (!html || !successInstance) {
            return NextResponse.json({ error: "所有代理节点均被限制或帖子已被删除。请稍后再试，或检查帖子是否仍在 Reddit 存活。" }, { status: 502 });
        }

        const $ = cheerio.load(html);
        const postTitle = $('title').text().replace(' - Redlib', '').replace(' - r/', ' - ').trim();

        const extracted = [];

        $('.comment').each((i, el) => {
            // Find author
            let authorUrl = $(el).find('.comment_author').first().text().trim();
            let author = authorUrl.replace(/^u\//, ''); // Redlib usually prepends "u/"

            // Find score (sometimes stored in span[title="Score"] or .score or .comment_score)
            let scoreStr = $(el).find('.comment_score').first().text().trim();

            // Handle "1.2k" score parsing
            let score = 0;
            if (scoreStr) {
                if (scoreStr.toLowerCase().includes('k')) {
                    score = parseFloat(scoreStr) * 1000;
                } else {
                    scoreStr = scoreStr.replace(/,/g, '').replace(/[^0-9.-]/g, '');
                    score = parseInt(scoreStr, 10) || 0;
                }
            }

            // Find body text inside comment_body
            let body = $(el).find('.comment_body').first().text().trim();

            if (author && !["[deleted]", "[removed]", "AutoModerator"].includes(author) &&
                body && !["[deleted]", "[removed]"].includes(body) &&
                score >= 1) {

                // Extra basic filtering
                if (body.split(/\s+/).length >= 3) {
                    let cleanedBody = body.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();
                    extracted.push({ author, score, body: cleanedBody });
                }
            }
        });

        if (extracted.length === 0) {
            return NextResponse.json({
                error: "成功抓取，但该帖子下没有任何符合质量条件的有效评论（可能都是机器人或被踩折叠的短回复）。"
            }, { status: 404 });
        }

        return NextResponse.json({
            title: postTitle,
            count: extracted.length,
            comments: extracted,
            source: successInstance
        });

    } catch (err) {
        console.error('Scrape API Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
