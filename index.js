require('dotenv').config();

const { App } = require('@slack/bolt');
const { setupSlackHandlers } = require('./slack');
const { testConnection } = require('./notion');

// Validate required env vars
const required = ['SLACK_BOT_TOKEN', 'SLACK_APP_TOKEN', 'NOTION_API_KEY', 'NOTION_DATABASE_ID'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

// Initialize Slack app with Socket Mode
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// Set up event handlers
setupSlackHandlers(app);

// Start the app
(async () => {
  // Test Notion connection first
  const notionOk = await testConnection();
  if (!notionOk) {
    console.error('Could not connect to Notion. Check your API key and database ID.');
    process.exit(1);
  }

  await app.start();
  console.log('Ad Shipper bot is running!');
})();
