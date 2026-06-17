"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);
    document.body.classList.add("md:cursor-none");

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor='pointer'], .project-card"
      );
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.body.classList.remove("md:cursor-none");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden mix-blend-difference md:block"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: hovering ? 2.2 : 1,
      }}
      transition={{ scale: { duration: 0.2 } }}
    >
      <div
        className={`rounded-full border border-white bg-white transition-all duration-200 ${
          hovering ? "h-3 w-3 bg-transparent" : "h-4 w-4"
        }`}
      />
    </motion.div>
  );
}
