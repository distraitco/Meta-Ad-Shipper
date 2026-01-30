/**
 * Extract URLs from a message string
 * Handles Drive, Dropbox, Figma, and general URLs
 */
function extractLinks(text) {
  // Slack formats links as <url|display> or just <url>
  const slackLinkPattern = /<(https?:\/\/[^|>]+)(?:\|[^>]*)?>/g;
  const links = [];
  let match;

  while ((match = slackLinkPattern.exec(text)) !== null) {
    links.push(match[1]);
  }

  // Also catch plain URLs not wrapped by Slack
  const plainUrlPattern = /(?<![<|])https?:\/\/[^\s<>]+/g;
  const plainMatches = text.match(plainUrlPattern) || [];

  for (const url of plainMatches) {
    if (!links.includes(url)) {
      links.push(url);
    }
  }

  return links;
}

/**
 * Identify the source platform from a URL
 */
function identifyPlatform(url) {
  if (url.includes('drive.google.com')) return 'Google Drive';
  if (url.includes('dropbox.com')) return 'Dropbox';
  if (url.includes('figma.com')) return 'Figma';
  if (url.includes('canva.com')) return 'Canva';
  return 'Link';
}

module.exports = { extractLinks, identifyPlatform };
