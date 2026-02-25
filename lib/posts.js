import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { remark } from 'remark';
import html from 'remark-html';

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Lazy initialize clients to prevent Next.js build-time Webpack errors
let _notionClient = null;
let _n2mClient = null;

const getNotion = () => {
    if (!_notionClient) {
        _notionClient = new Client({ auth: process.env.NOTION_TOKEN });
    }
    return _notionClient;
};

const getN2M = () => {
    if (!_n2mClient) {
        _n2mClient = new NotionToMarkdown({ notionClient: getNotion() });
    }
    return _n2mClient;
};

/**
 * Helper: Safely extract text from Notion's rich_text/title arrays
 */
const getText = (property) => {
    if (!property) return '';
    if (property.type === 'title') {
        return property.title.map((t) => t.plain_text).join('');
    }
    if (property.type === 'rich_text') {
        return property.rich_text.map((t) => t.plain_text).join('');
    }
    return '';
};

/**
 * Helper: Map a raw Notion Page object into our standard frontmatter format
 */
const mapNotionPage = (page) => {
    const props = page.properties;

    // Fallbacks just in case the Notion column hasn't been filled out
    return {
        slug: getText(props.Slug) || page.id,
        id: getText(props.Slug) || page.id,
        title: getText(props.Name) || 'Untitled Post',
        date: props.Date?.date?.start || page.created_time,
        tags: props.Tags?.multi_select?.map(tag => tag.name) || [],
        category: props.Category?.select?.name || 'Uncategorized',
        author: { name: 'yancey', picture: 'https://github.com/yanceyyancey.png' },
    };
};

/**
 * Fetch all published posts from the Notion Database, sorted by date
 */
export async function getSortedPostsData() {
    try {
        const notion = getNotion();
        const response = await notion.databases.query({
            database_id: DATABASE_ID,
            filter: {
                property: 'Status',
                status: {
                    equals: '完成' // Match the Chinese "Done" status
                }
            },
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending',
                },
            ],
        });

        return response.results.map(mapNotionPage);
    } catch (error) {
        // Output more verbose Notion errors
        console.error("Error fetching posts from Notion:", error.body || error.message);
        return [];
    }
}

/**
 * Fast path to get all valid slugs for Next.js static generation (getStaticPaths)
 */
export async function getAllPostIds() {
    try {
        const posts = await getSortedPostsData();
        return posts.map(post => ({
            params: {
                slug: post.slug,
            },
        }));
    } catch (error) {
        console.error("Error fetching slugs from Notion:", error.message);
        return [];
    }
}

/**
 * Fetch full content (blocks) + metadata for a specific slug
 */
export async function getPostData(slug) {
    // 1. Query the database to find the exact page by Slug
    const notion = getNotion();
    const response = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
            property: 'Slug',
            rich_text: {
                equals: slug,
            },
        },
    });

    if (!response.results.length) {
        throw new Error(`Post with slug "${slug}" not found in Notion.`);
    }

    const page = response.results[0];
    const metadata = mapNotionPage(page);

    // 2. Fetch all blocks belonging to this page and convert them to Markdown
    const n2m = getN2M();
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdBlocks);

    const rawMarkdown = mdString.parent || mdString;

    // 3. Convert Markdown to HTML exactly like the old logic
    const processedContent = await remark()
        .use(html)
        .process(rawMarkdown);
    const contentHtml = processedContent.toString();

    // 4. Return the exact payload structure the frontend expects
    return {
        slug,
        contentHtml,
        ...metadata,
    };
}

/**
 * Derive site stats (categories, tags, post counts)
 */
export async function getSiteStats() {
    const allPostsData = await getSortedPostsData();
    const categories = new Set();
    const tags = new Set();

    allPostsData.forEach(post => {
        if (post.category) categories.add(post.category);
        if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach(tag => tags.add(tag));
        }
    });

    return {
        postCount: allPostsData.length,
        categoryCount: categories.size,
        tagCount: tags.size
    };
}
