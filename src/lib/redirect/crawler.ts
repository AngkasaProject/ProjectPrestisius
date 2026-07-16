const CRAWLERS = [
  "facebookexternalhit",
  "Facebot",
  "WhatsApp",
  "Twitterbot",
  "Slackbot",
  "Discordbot",
  "TelegramBot",
  "LinkedInBot",
  "SkypeUriPreview",
  "Googlebot",
  "bingbot",
  "Applebot",
];

export function isCrawler(userAgent: string) {
  const ua = userAgent.toLowerCase();

  return CRAWLERS.some((bot) => ua.includes(bot.toLowerCase()));
}
