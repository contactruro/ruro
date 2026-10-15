import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/* Crawling rules. Everything public is open to every crawler. The enquiry endpoint is not a page, so it is kept out.

   The search and answer-engine crawlers are named on purpose, so it is plain that they are welcome and nothing
   written later for "all other bots" can shut them out by accident:
   - Googlebot and Bingbot: the two search indexes (ChatGPT's search draws on Bing's).
   - OAI-SearchBot and ChatGPT-User: ChatGPT's search and its fetches on a person's behalf.
   - PerplexityBot: Perplexity's search.
   - Claude-SearchBot and Claude-User: Claude's search and its fetches on a person's behalf.
   Crawlers that collect text to train models (GPTBot, ClaudeBot, Google-Extended, CCBot) are not named, so they follow
   the general rule below. To stop training use, add each of them with `disallow: "/"`. */
const open = { allow: "/", disallow: "/api/" };

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-SearchBot", "Claude-User"], ...open },
      { userAgent: "*", ...open },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
