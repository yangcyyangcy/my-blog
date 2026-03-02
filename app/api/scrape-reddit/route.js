import { NextResponse } from 'next/server';

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

        // 使用极其简单的头信息或明确的爬虫身份以降低 Reddit 针对性拦截
        // 大量实测表明：伪装成过于真实的浏览器偶尔由于缺乏 Cookies 反而被封
        // 伪装成 GoogleBot 或者干脆使用老实本分的基础头信息存活率更高
        const randomID = Math.floor(Math.random() * 1000000);
        const response = await fetch(jsonUrl, {
            headers: {
                'User-Agent': `Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) req-${randomID}`,
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            },
            next: { revalidate: 0 } // NextJS: 禁用该接口全量缓存
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Reddit 防火墙拦截 (Code: ${response.status})。可能是当前 IP 被限流，请过几分钟再试，或尝试其他帖子链接。` },
                { status: response.status }
            );
        }

        const data = await response.json();

        // 解析内容
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
        console.error('Anonymous Scrape Error:', error);
        return NextResponse.json(
            { error: '抓取时发生网络通信错误。' },
            { status: 500 }
        );
    }
}
