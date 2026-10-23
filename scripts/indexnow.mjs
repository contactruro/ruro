/* Tells Bing (and the other IndexNow search engines) which URLs were added, changed or removed, so they re-read them
   quickly instead of waiting to find out. Run it AFTER a deploy is live, because the search engine checks the key file on the site:

     npm run indexnow                      sends every URL in https://ruro.in/sitemap.xml
     npm run indexnow -- /services /about  sends only these paths (use this when you change a page, add one, or delete one)

   The key is public by design: the same text is served at https://ruro.in/<key>.txt, which is how the engine knows the
   submission comes from the site's owner. */
import { readFileSync } from "node:fs";

const HOST = "ruro.in";
const { key } = JSON.parse(readFileSync(new URL("../lib/indexnow.json", import.meta.url), "utf8"));
const args = process.argv.slice(2);

let urls;
if (args.length) {
  urls = args.map((a) => (a.startsWith("http") ? a : `https://${HOST}${a.startsWith("/") ? a : "/" + a}`));
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: sent ${urls.length} URL(s). Response: ${res.status} ${res.statusText}`);
console.log(res.status === 200 || res.status === 202 ? "Accepted." : "Not accepted: check that the key file is live at https://" + HOST + "/" + key + ".txt");
