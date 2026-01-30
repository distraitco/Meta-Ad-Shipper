const { extractLinks, identifyPlatform } = require('./utils');
const { logAdToNotion } = require('./notion');

/**
 * Set up Slack event handlers
 */
function setupSlackHandlers(app) {
  // Listen for @AdShipper mentions
  app.event('app_mention', async ({ event, client, say }) => {
    try {
      const { text, user, ts, channel, thread_ts } = event;

      // Extract links from the message
      const links = extractLinks(text);

      if (links.length === 0) {
        await say({
          text: "I couldn't find any links in your message. Please include the ad link when tagging me.",
          thread_ts: thread_ts || ts,
        });
        return;
      }

      // Get user info for submitter name
      const userInfo = await client.users.info({ user });
      const submitter = userInfo.user.real_name || userInfo.user.name;

      // Log each link to Notion
      const results = [];
      for (const link of links) {
        const platform = identifyPlatform(link);
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        await logAdToNotion({
          link,
          submitter,
          date,
        });

        results.push(`${platform}: ${link}`);
      }

      // Confirm in thread
      const confirmMessage =
        links.length === 1
          ? `Logged to Notion:\n${results[0]}`
          : `Logged ${links.length} ads to Notion:\n${results.join('\n')}`;

      await say({
        text: confirmMessage,
        thread_ts: thread_ts || ts,
      });
    } catch (error) {
      console.error('Error handling mention:', error);
      await say({
        text: `Something went wrong: ${error.message}`,
        thread_ts: event.thread_ts || event.ts,
      });
    }
  });
}

module.exports = { setupSlackHandlers };
