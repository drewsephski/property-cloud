"use client";

import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowingCard({
  children,
  className = "",
  glowColor = "rgba(120, 119, 198, 0.4)",
}: GlowingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setPosition({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/[0.08] bg-neutral-950 p-6 transition-all duration-300",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative z-10">{children}</div>
      
      <motion.div
        className="pointer-events-none absolute -inset-px"
        style={{
          background: `radial-gradient(600px circle at ${position.x * 100}% ${position.y * 100}%, ${glowColor}, transparent 40%)`,
          opacity,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
