"use client";

import { ThemeProvider } from "next-themes";
import Navbar from "./Navbar";
import DeferredAiAssistant from "./DeferredAiAssistant";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <SmoothScrollProvider>
        <Navbar />
        {children}
        <DeferredAiAssistant />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
