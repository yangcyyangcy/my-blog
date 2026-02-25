const { Client } = require('@notionhq/client');

console.log("Notion Token Exists:", !!process.env.NOTION_TOKEN);
console.log("Database ID:", process.env.NOTION_DATABASE_ID);

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function verify() {
    try {
        console.log("Client Prototype:", Object.keys(notion));
        console.log("Databases Property:", typeof notion.databases);
        if (notion.databases) {
            console.log("Databases Query Property:", typeof notion.databases.query);

            const response = await notion.databases.query({
                database_id: process.env.NOTION_DATABASE_ID
            });
            console.log("Success! Extracted rows:", response.results.length);
        }
    } catch (err) {
        console.error("API Error:");
        console.error(err);
    }
}
verify();
