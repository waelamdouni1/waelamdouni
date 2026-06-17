"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollReveal(amount = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  return { ref, isInView };
}
