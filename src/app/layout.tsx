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
  title: "Reazul Islam Reaz | Full-Stack Backend-Focused Engineer",
  description:
    "Backend-focused full-stack engineer — APIs, SaaS architecture, PostgreSQL, MongoDB, Redis, Node.js, NestJS, Go, Next.js.",
  keywords: [
    "Reazul Islam Reaz",
    "Reazul Islam",
    "Reazul Reaz",
    "Reaz Reaz",
    "Reaz",
    "full stack developer",
    "backend developer",
    "backend engineer",
    "MERN stack developer",
    "Node.js engineer",
    "NestJS developer",
    "PostgreSQL",
    "MongoDB",
    "System Design Engineer",
    "GraphQL",
    "Redis",
    "MySQL",
    "microservices",
    "TypeScript",
    "SaaS architecture",
    "API design",
    "Go developer",
  ],
  authors: [{ name: "Reazul Islam Reaz" }],
  openGraph: {
    title: "Reazul Islam Reaz | Full-Stack Backend-Focused Engineer",
    description:
      "Scalable backends, APIs, and SaaS architecture — PostgreSQL, MongoDB, Redis, Node.js, NestJS, Go, Next.js.",
    url: "/",
    siteName: "Reazul Islam Reaz",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/reaz.png",
        width: 1200,
        height: 630,
        alt: "Reazul Islam Reaz — portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reazul Islam Reaz | Full-Stack Backend-Focused Engineer",
    description:
      "Backend-focused engineer — APIs, SaaS, PostgreSQL, MongoDB, Redis, Node.js, NestJS, Go.",
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
