import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: `${portfolio.profile.name} | ${portfolio.profile.role}`,
  description: portfolio.profile.bio,
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