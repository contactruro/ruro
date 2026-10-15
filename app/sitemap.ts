import type { MetadataRoute } from "next";
import { journal, studies } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/sample", "/work", "/process", "/journal", "/about", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const essays = journal.map((e) => ({
    url: `${site.url}/journal/${e.slug}`,
    lastModified: e.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  const studyPages = studies.map((s) => ({
    url: `${site.url}/work/${s.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...essays, ...studyPages];
}
