import type { MetadataRoute } from "next";
import { journal, studies } from "@/lib/content";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

/* When each part of the site last changed in a way a reader would notice. Search engines use this to decide what to
   re-read, so it is only moved forward when the content really changes (not on every deploy). Essays carry their own date. */
const UPDATED = {
  home: "2026-10-23",
  about: "2026-10-23",
  services: "2026-10-23",
  sample: "2026-10-23",
  journal: "2026-10-23",
  projects: "2026-10-22",
  work: "2026-10-21",
  process: "2026-10-15",
  contact: "2026-10-14",
  study: "2026-10-08",
  "study:bill-gates": "2026-10-21",
  project: "2026-10-22",
  service: "2026-10-23",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pageKey: Record<string, keyof typeof UPDATED> = {
    "": "home",
    "/sample": "sample",
    "/work": "work",
    "/projects": "projects",
    "/services": "services",
    "/process": "process",
    "/journal": "journal",
    "/about": "about",
    "/contact": "contact",
  };
  const pages = Object.keys(pageKey).map((p) => ({
    url: `${site.url}${p}`,
    lastModified: UPDATED[pageKey[p]],
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
    lastModified: UPDATED[`study:${s.slug}` as keyof typeof UPDATED] ?? UPDATED.study,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  const projectPages = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: UPDATED.project,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  const reviewPage = { url: `${site.url}/contact?type=audit`, lastModified: UPDATED.contact, changeFrequency: "monthly" as const, priority: 0.7 };
  const servicePages = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: UPDATED.service,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [...pages, reviewPage, ...servicePages, ...projectPages, ...essays, ...studyPages];
}
