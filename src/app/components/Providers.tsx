"use client";

import { ThemeProvider } from "next-themes";
import Navbar from "./Navbar";
import AiPortfolioAssistant from "./AiPortfolioAssistant";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <Navbar />
      {children}
      <AiPortfolioAssistant />
    </ThemeProvider>
  );
}
