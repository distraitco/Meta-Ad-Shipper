# Ad Shipper

Slack bot that logs ads to Notion when mentioned.

## Usage

Tag `@AdShipper` in any Slack message with a link:

```
@AdShipper log this https://drive.google.com/file/d/abc123
```

The bot will create an entry in Notion with the link, your name, and today's date.

## Environment Variables

Set these in Railway:
- `SLACK_BOT_TOKEN` - Bot token from Slack app
- `SLACK_APP_TOKEN` - App token from Slack app
- `NOTION_API_KEY` - Integration token from Notion
- `NOTION_DATABASE_ID` - ID of your Notion database
