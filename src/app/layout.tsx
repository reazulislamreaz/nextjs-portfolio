import { type Metadata } from "next";
import { Instrument_Serif, Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import Providers from "./components/Providers";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ui/ScrollProgress";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
  adjustFontFallback: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
  preload: true,
  adjustFontFallback: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reazul-islam-reaz.vercel.app"),
  title: "Reazul Islam Reaz | Backend-Focused Full-Stack Engineer",
  description:
    "Backend-Focused Full-Stack Engineer — NestJS, Express, PostgreSQL, MongoDB, Redis, and BullMQ. Production systems including Elevate Apparel, J&K Cabinetry, and ConfAero.",
  keywords: [
    "Reazul Islam Reaz",
    "Backend-Focused Full-Stack Engineer",
    "backend engineer",
    "full stack engineer",
    "Node.js",
    "NestJS",
    "Express.js",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "BullMQ",
    "REST APIs",
    "Socket.IO",
    "API design",
    "Dhaka",
  ],
  authors: [{ name: "Reazul Islam Reaz" }],
  openGraph: {
    title: "Reazul Islam Reaz | Backend-Focused Full-Stack Engineer",
    description:
      "APIs, data models, auth, background jobs, and realtime systems — NestJS, PostgreSQL, MongoDB, Redis. Live work: Elevate, J&K Cabinetry, ConfAero.",
    url: "/",
    siteName: "Reazul Islam Reaz",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/reaz.png",
        width: 760,
        height: 783,
        alt: "Reazul Islam Reaz — Backend-Focused Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reazul Islam Reaz | Backend-Focused Full-Stack Engineer",
    description:
      "Backend-focused engineer building production APIs, data systems, and realtime features with NestJS, Node.js, and PostgreSQL.",
    images: ["/reaz.png"],
  },
  verification: {
    google: "R3xCKBJomUGl_i1gminkMaXYRPhDvhGgfV90n96YFqw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-w-0 overflow-x-hidden bg-zinc-950 font-sans antialiased">
        <JsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-emerald-400 focus:px-4 focus:py-2 focus:font-medium focus:text-zinc-950"
        >
          Skip to main content
        </a>
        <Providers>
          <ScrollProgress />
          <div className="site-atmosphere" aria-hidden />
          <div className="site-grain" aria-hidden />

          <div className="relative z-10 flex min-h-screen min-w-0 flex-col">
            <main id="main-content" className="min-w-0 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
