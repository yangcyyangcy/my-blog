import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------
// 工具函数：数据清理逻辑复用之前的 Python 脚本逻辑
// ----------------------------------------------------------------------
function cleanText(text) {
    if (!text) return "";
    // 替换换行符、回车符为空格
    let cleaned = text.replace(/[\n\r]+/g, ' ');
    // 合并多个连续空格为单一空格
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
}

function isRelevantComment(author, body, score) {
    // 1. 过滤掉被删除的账号或评论
    if (!author || ["[deleted]", "[removed]", "AutoModerator"].includes(author)) return false;
    if (!body || ["[deleted]", "[removed]"].includes(body)) return false;

    // 2. 过滤掉得分过低（被踩得太多）的评论
    if (score < 1) return false;

    // 3. 过滤掉字数极少的纯水贴（判断单词数小于3）
    if (body.split(/\s+/).length < 3) return false;

    return true;
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

        // 转换为 json 后缀的免鉴权 API 地址
        let jsonUrl = urlParam;
        if (!jsonUrl.endsWith('.json')) {
            jsonUrl = jsonUrl.replace(/\/$/, '') + '/.json';
        }

        // 发起服务器端请求 (绕过浏览器跨域 CORS 拦截，并高度伪装)
        const response = await fetch(jsonUrl, {
            headers: {
                // 伪装浏览器，防止被 Reddit 防火墙拦截
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'en-US,en;q=0.9',
                'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"macOS"',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'Cache-Control': 'max-age=0'
            }
        });

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error('Reddit 限制了访问频率(429 Too Many Requests)，请稍后再试。');
            }
            throw new Error(`抓取失败，HTTP 状态码: ${response.status}`);
        }

        const data = await response.json();

        // 解析标题
        const postTitle = data[0]?.data?.children?.[0]?.data?.title || 'Unknown Title';

        // 解析评论
        const commentsData = data[1]?.data?.children || [];
        const extracted = [];

        for (const item of commentsData) {
            if (item.kind === 'more') continue; // 忽略“加载更多”

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
