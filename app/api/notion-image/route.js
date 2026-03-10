import { Client } from '@notionhq/client';

const getNotion = () => new Client({ auth: process.env.NOTION_TOKEN });

/**
 * GET /api/notion-image?id=<block_id>
 *
 * Fetches a fresh signed URL for a Notion image block and redirects to it.
 * This solves Notion's 1-hour expiring image URL problem by always getting
 * the latest valid URL at request time.
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const blockId = searchParams.get('id');

    if (!blockId) {
        return new Response('Missing block id', { status: 400 });
    }

    try {
        const notion = getNotion();
        const block = await notion.blocks.retrieve({ block_id: blockId });

        if (block.type !== 'image') {
            return new Response('Block is not an image', { status: 404 });
        }

        const imageUrl =
            block.image.type === 'external'
                ? block.image.external.url
                : block.image.file.url;

        // Instead of redirecting (which next/image optimizer dislikes),
        // we fetch the actual image bytes and return them.
        const imageResponse = await fetch(imageUrl);
        const arrayBuffer = await imageResponse.arrayBuffer();

        return new Response(arrayBuffer, {
            headers: {
                'Content-Type': imageResponse.headers.get('content-type') || 'image/jpeg',
                // Cache intensely at the edge for 1 year, as we rely on next/image 
                // caching mechanism anyway.
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (err) {
        console.error('notion-image proxy error:', err.message);
        return new Response('Image not found', { status: 404 });
    }
}
