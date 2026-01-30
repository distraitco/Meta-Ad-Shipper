const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

/**
 * Create a new ad entry in Notion
 */
async function logAdToNotion({ link, submitter, date }) {
  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      'Ad link': {
        url: link,
      },
      'Submitter': {
        rich_text: [
          {
            text: {
              content: submitter,
            },
          },
        ],
      },
      'date logged': {
        date: {
          start: date,
        },
      },
    },
  });

  return response;
}

/**
 * Test Notion connection
 */
async function testConnection() {
  try {
    const response = await notion.databases.retrieve({ database_id: databaseId });
    console.log(`Connected to Notion database: ${response.title[0]?.plain_text || 'Untitled'}`);
    return true;
  } catch (error) {
    console.error('Failed to connect to Notion:', error.message);
    return false;
  }
}

module.exports = { logAdToNotion, testConnection };
