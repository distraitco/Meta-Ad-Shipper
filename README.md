# Adsu Bot

Slack bot that logs ads to Notion when mentioned.

## Usage

Tag `@adsu` in any Slack message with a link:

```
@adsu ready to ship https://drive.google.com/file/d/abc123
```

The bot will:
1. Extract the link from your message
2. Create an entry in Notion with: link, your name, today's date
3. Reply in the thread to confirm

## Setup

### 1. Create Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps) → Create New App → From scratch
2. Name it "Adsu" and select your workspace
3. Go to **Socket Mode** → Enable Socket Mode → Generate an App-Level Token with `connections:write` scope → Copy the `xapp-` token
4. Go to **OAuth & Permissions** → Add these Bot Token Scopes:
   - `app_mentions:read`
   - `chat:write`
   - `users:read`
5. Go to **Event Subscriptions** → Enable Events → Subscribe to bot events → Add `app_mention`
6. Go to **Install App** → Install to Workspace → Copy the `xoxb-` Bot Token

### 2. Create Notion Integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) → New integration
2. Name it "Adsu Bot", select your workspace
3. Copy the Internal Integration Token (`secret_...`)

### 3. Create Notion Database

Create a database with these columns:
- **Ad Link** (URL type)
- **Submitter** (Text type)
- **Date Logged** (Date type)
- **Status** (Select type) - add options like "Not Shipped", "Shipped", etc.

Then share it with your integration:
1. Open the database page
2. Click ••• menu → Connections → Add connection → Select "Adsu Bot"
3. Copy the database ID from the URL: `notion.so/your-workspace/DATABASE_ID?v=...`

### 4. Configure Environment

```bash
cp .env.example .env
```

Fill in your `.env`:
```
SLACK_BOT_TOKEN=xoxb-...
SLACK_APP_TOKEN=xapp-...
NOTION_API_KEY=secret_...
NOTION_DATABASE_ID=abc123...
```

### 5. Run Locally

```bash
npm install
npm start
```

### 6. Deploy to Railway

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select this repo
4. Add your environment variables in Railway's Variables tab
5. Deploy!

## Adding Adsu to Channels

After installation, invite `@adsu` to any channel where you want to use it:
```
/invite @adsu
```


