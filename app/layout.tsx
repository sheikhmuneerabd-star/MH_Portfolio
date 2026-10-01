import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/site";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { portfolio } from "@/data/portfolio";
import Cursor from "@/components/Cursor";
import ScrollTopButton from "@/components/ScrollTopButton";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const { profile, socials } = portfolio;
const title = `${profile.name} | ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: profile.bio,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: profile.name,
    title,
    description: profile.bio,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: profile.bio },
  robots: { index: true, follow: true },
};

// Browser ki bar ka rang theme ke hisab se
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070d" },
    { media: "(prefers-color-scheme: light)", color: "#eef5ff" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-sky focus:px-5 focus:py-3 focus:font-semibold focus:text-night"
        >
          Skip to content
        </a>

        {/* Google ke liye: ye insaan kaun hai */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              url: siteUrl,
              sameAs: socials.filter((s) => s.type !== "email").map((s) => s.href),
            }),
          }}
        />

        <SmoothScroll>
          <PageTransition>
            <Header />
            {children}
            <Footer />
          </PageTransition>
        </SmoothScroll>
        <Cursor />
        <ScrollTopButton />
      </body>
    </html>
  );
}