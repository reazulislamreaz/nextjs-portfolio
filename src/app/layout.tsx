import { type Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Footer from "./components/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reazul-islam-reaz.vercel.app"),
  title: "Reazul Islam Reaz | Full-Stack Backend-Focused Engineer",
  description:
    "Backend-focused full-stack engineer — scalable APIs, SaaS architectures, PostgreSQL, MongoDB, Redis, Node.js, NestJS, Go, and Next.js.",
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
      "Scalable backend systems, APIs, and SaaS-style architectures — with disciplined data modeling and Next.js when the surface needs to shine.",
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
      "Backend-focused full-stack engineer — APIs, SaaS architectures, PostgreSQL, MongoDB, Redis, Node.js, NestJS, Go.",
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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.className} min-w-0 overflow-x-hidden antialiased bg-black selection:bg-emerald-500/30 selection:text-emerald-200`}
      >
        <Providers>
          <div className="glass-gradient" />
          <div className="glass-pattern" />
          
          <div className="relative z-10 flex min-h-screen min-w-0 flex-col">
            <main className="min-w-0 flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
