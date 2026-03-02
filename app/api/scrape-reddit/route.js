import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------
// 工具函数：数据清理逻辑复用之前的 Python 脚本逻辑
// ----------------------------------------------------------------------
function cleanText(text) {
    if (!text) return "";
    let cleaned = text.replace(/[\n\r]+/g, ' ');
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
}

function isRelevantComment(author, body, score) {
    if (!author || ["[deleted]", "[removed]", "AutoModerator"].includes(author)) return false;
    if (!body || ["[deleted]", "[removed]"].includes(body)) return false;
    if (score < 1) return false;
    if (body.split(/\s+/).length < 3) return false;
    return true;
}

// ----------------------------------------------------------------------
// 获取 Reddit 官方 OAuth Token (如果配置了环境变量)
// ----------------------------------------------------------------------
async function getRedditAccessToken() {
    const clientId = process.env.REDDIT_CLIENT_ID;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET;

    if (!clientId || !clientSecret) return null;

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const res = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'NextJS:reddit-scraper:v1.0'
            },
            body: 'grant_type=client_credentials'
        });

        if (!res.ok) return null;
        const data = await res.json();
        return data.access_token;
    } catch {
        return null;
    }
}

// ----------------------------------------------------------------------
// GET 接口主处理函数
// ----------------------------------------------------------------------
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const urlParam = searchParams.get('url');

        if (!urlParam || !urlParam.includes('reddit.com')) {
            return NextResponse.json(
                { error: '无效的 Reddit 链接。请输入完整的 Reddit 帖子地址。' },
                { status: 400 }
            );
        }

        let jsonUrl = urlParam;
        if (!jsonUrl.endsWith('.json')) {
            jsonUrl = jsonUrl.replace(/\/$/, '') + '/.json';
        }

        // 尝试获取官方 Token 以彻底避免 403 拦截
        const token = await getRedditAccessToken();
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
            headers['User-Agent'] = 'NextJS:reddit-scraper-app:v1.0';
            // OAuth 必须使用 oauth.reddit.com 域名
            jsonUrl = jsonUrl.replace('www.reddit.com', 'oauth.reddit.com');
        }

        const response = await fetch(jsonUrl, { headers });

        if (!response.ok) {
            if (response.status === 403 || response.status === 401) {
                return NextResponse.json(
                    { error: '被 Reddit 防火墙拦截 (403)。请在 .env.local 中配置 REDDIT_CLIENT_ID 和 REDDIT_CLIENT_SECRET 并重启服务。' },
                    { status: 403 }
                );
            }
            if (response.status === 429) {
                return NextResponse.json(
                    { error: 'Reddit 限制了访问频率(429)。请稍后再试或配置你的 API Token。' },
                    { status: 429 }
                );
            }
            throw new Error(`抓取失败，HTTP 状态码: ${response.status}`);
        }

        const data = await response.json();
        const postTitle = data[0]?.data?.children?.[0]?.data?.title || 'Unknown Title';
        const commentsData = data[1]?.data?.children || [];
        const extracted = [];

        for (const item of commentsData) {
            if (item.kind === 'more') continue;

            const commentBody = item.data?.body || '';
            const author = item.data?.author || '';
            const score = item.data?.ups || 0;

            if (isRelevantComment(author, commentBody, score)) {
                extracted.push({
                    author,
                    score,
                    body: cleanText(commentBody)
                });
            }
        }

        return NextResponse.json({
            title: postTitle,
            count: extracted.length,
            comments: extracted
        });

    } catch (error) {
        console.error('Scrape API Error:', error);
        return NextResponse.json(
            { error: error.message || '抓取过程中发生未知错误' },
            { status: 500 }
        );
    }
}
