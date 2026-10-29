import type { Metadata } from "next";
import { HeroGreek } from "@/components/sections/HeroGreek";

/* Local preview of the video-switching hero, before it replaces the home page's opening. Not indexed. */
export const metadata: Metadata = { title: "Hero lab", robots: { index: false, follow: false } };

export default function HeroLab() {
  return <HeroGreek />;
}
