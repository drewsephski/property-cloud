"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MicroInteractionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "scale" | "glow" | "bounce" | "shake" | "rotate" | "none";
  clickEffect?: "ripple" | "pulse" | "confetti" | "none";
  hoverScale?: number;
  duration?: number;
}

export function MicroInteraction({
  children,
  className,
  hoverEffect = "scale",
  clickEffect = "ripple",
  hoverScale = 1.05,
  duration = 0.3,
  ...props
}: MicroInteractionProps) {
  const [, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  // Hover animation variants
  const getHoverVariants = () => {
    switch (hoverEffect) {
      case "scale":
        return {
          initial: { scale: 1 },
          hover: { scale: hoverScale },
        };
      case "glow":
        return {
          initial: { boxShadow: "0 0 0 rgba(101, 64, 240, 0)" },
          hover: { boxShadow: "0 0 20px rgba(101, 64, 240, 0.5)" },
        };
      case "bounce":
        return {
          initial: { y: 0 },
          hover: { y: -10, transition: { type: "spring", stiffness: 300 } },
        };
      case "shake":
        return {
          initial: { x: 0 },
          hover: {
            x: [0, -5, 5, -5, 5, 0],
            transition: { duration: 0.5 },
          },
        };
      case "rotate":
        return {
          initial: { rotate: 0 },
          hover: { rotate: 5 },
        };
      case "none":
      default:
        return {
          initial: {},
          hover: {},
        };
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickEffect === "none") return;

    const rect = e.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, duration * 1000);
  };

  const hoverVariants = getHoverVariants();

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial="initial"
      whileHover="hover"
      variants={hoverVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      transition={{ duration }}
      {...(props as any)}
    >
      {children}

      <AnimatePresence>
        {isClicked && clickEffect === "ripple" && (
          <motion.div
            className="absolute rounded-full bg-primary/20"
            style={{
              left: clickPosition.x,
              top: clickPosition.y,
              transformOrigin: "center center",
            }}
            initial={{ width: 0, height: 0, opacity: 0.7 }}
            animate={{ width: 500, height: 500, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration * 2 }}
          />
        )}

        {isClicked && clickEffect === "pulse" && (
          <motion.div
            className="absolute inset-0 bg-primary/20 rounded-inherit"
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration * 2 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
