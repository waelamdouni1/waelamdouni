"use client";

import { Copy, Mail } from "lucide-react";
import { useCallback } from "react";

import { useToast } from "@/components/ui/toast";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

interface CopyEmailButtonProps {
  className?: string;
  showLabel?: boolean;
}

export function CopyEmailButton({
  className,
  showLabel = true,
}: CopyEmailButtonProps) {
  const { showToast } = useToast();

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      showToast("Email copied");
    } catch {
      showToast("Could not copy email");
    }
  }, [showToast]);

  return (
    <button
      type="button"
      onClick={copyEmail}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-border/50 bg-white/10 px-3 text-sm font-medium backdrop-blur-sm transition-all duration-300",
        "hover:bg-white/20 hover:shadow-md active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        className
      )}
      aria-label={`Copy email ${siteConfig.email}`}
      data-cursor="pointer"
    >
      <Mail className="size-3.5 shrink-0 opacity-80" aria-hidden />
      {showLabel && (
        <span className="hidden max-w-[160px] truncate sm:inline lg:max-w-[200px]">
          {siteConfig.email}
        </span>
      )}
      <Copy className="size-3.5 shrink-0 opacity-70" aria-hidden />
    </button>
  );
}
