const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function checkSchema() {
    try {
        const db = await notion.databases.retrieve({
            database_id: process.env.NOTION_DATABASE_ID
        });
        console.log("== AVAILABLE PROPERTIES IN NOTION DB ==");
        for (const [key, value] of Object.entries(db.properties)) {
            console.log(`- Name: "${key}" | Type: ${value.type}`);
        }
    } catch (err) {
        console.error(err);
    }
}
checkSchema();
