"use client";

import { ThemeProvider } from "next-themes";
import Navbar from "./Navbar";
import AiPortfolioAssistant from "./AiPortfolioAssistant";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <SmoothScrollProvider>
        <Navbar />
        {children}
        <AiPortfolioAssistant />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
