"use client";

import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";

import { CustomCursor } from "@/components/effects/custom-cursor";
import { GrainOverlay } from "@/components/effects/grain-overlay";
import { PageLoader } from "@/components/effects/page-loader";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { ToastProvider } from "@/components/ui/toast";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ToastProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <PageLoader />
        <SmoothScroll />
        <CustomCursor />
        <GrainOverlay />
        {children}
      </ThemeProvider>
    </ToastProvider>
  );
}
