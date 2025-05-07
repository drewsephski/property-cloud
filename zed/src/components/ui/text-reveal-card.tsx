"use client";

import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface TextRevealCardProps {
  text: string;
  revealText: string;
  className?: string;
  children?: React.ReactNode;
  cardRole?: string;
  cardAriaLabel?: string;
}

export const TextRevealCard = ({
  text,
  revealText,
  className,
  children,
  cardRole = "region",
  cardAriaLabel,
}: TextRevealCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setPosition({ x, y });
  };

  useEffect(() => {
    controls.start({ 
      opacity: isHovered || isFocused ? 1 : 0,
      y: isHovered || isFocused ? 0 : 20,
    });
  }, [isHovered, isFocused, controls]);

  return (
    <div
      ref={containerRef}
      role={cardRole}
      aria-label={cardAriaLabel || text}
      tabIndex={0}
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-neutral-950 to-neutral-900 p-8 group transition-shadow hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsFocused(!isFocused);
          e.preventDefault();
        }
      }}
    >
      <div className="relative z-10">
        <div className="mb-4 text-lg font-medium text-neutral-200">{text}</div>
        {children}
      </div>
      
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-neutral-950/50 via-neutral-950/70 to-neutral-950/90"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered || isFocused ? 1 : 0,
          background: (isHovered || isFocused)
            ? `radial-gradient(800px circle at ${position.x * 100}% ${position.y * 100}%, rgba(14, 14, 14, 0.4), transparent 40%)`
            : ""
        }}
        transition={{ duration: 0.4 }}
        whileHover={{ 
          filter: "brightness(1.1)" 
        }}
      />
      
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-neutral-950 to-transparent py-6 px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.3 }}
        aria-hidden={!isHovered && !isFocused}
      >
        <div className="text-base text-neutral-300">{revealText}</div>
      </motion.div>
    </div>
  );
};
