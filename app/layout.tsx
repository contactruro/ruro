import type { Metadata, Viewport } from "next";
import { Caveat, Cinzel, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/ui/Providers";
import { Analytics } from "@/components/Analytics";
import Script from "next/script";
import { Preloader } from "@/components/ui/Preloader";
import { CinemaStage } from "@/components/cinema/CinemaStage";
import { site } from "@/lib/site";

/* Type: Instrument Serif for display (roman and italic), Inter for text and labels, and
   Cinzel (one weight) for the wordmark's big letters only. Caveat is used inside the showcase concepts. */
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
// The RURO wordmark: a classical roman capital, matched to the supplied logo.
const logo = Cinzel({ subsets: ["latin"], weight: ["500"], variable: "--font-logo", display: "swap" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "RURO · Your story, in one place",
    template: "%s · RURO",
  },
  description: site.description,
  applicationName: "RURO",
  keywords: [
    "RURO digital identity studio",
    "digital estate",
    "personal digital identity",
    "founder personal website",
    "executive personal website",
    "premium personal website",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "RURO",
    url: site.url,
    title: "RURO · Your story is scattered. We tell it in one place.",
    description: site.positioning,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "RURO · Your story is scattered. We tell it in one place.",
    description: site.positioning,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "RURO",
  alternateName: "RURO Digital Identity Studio",
  url: site.url,
  email: site.email,
  slogan: site.tagline,
  description: site.description,
  serviceType: ["Digital identity", "Personal website design", "Digital estate stewardship"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${logo.variable} ${hand.variable}`}>
      <head>
        <noscript>
          <style>{".preloader{display:none}"}</style>
        </noscript>
      </head>
      <body className="grain min-h-dvh">
        {/* Returning visits skip the opening screen with no flash. */}
        <Script id="pre-skip" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('ruro-pre')){document.documentElement.classList.add('pre-skip','pre-done')}}catch(e){}" }} />
        <Preloader />
        <CinemaStage />
        <a
          href="#main"
          className="sr-only z-[100] rounded-none bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
