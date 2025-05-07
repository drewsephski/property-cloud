"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  hoverEffect?: "scale" | "glow" | "border" | "none";
  glowColor?: string;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  hoverEffect = "scale",
  glowColor = "rgba(120, 119, 198, 0.4)",
}: BentoGridItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect || hoverEffect === "none") return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setPosition({ x, y });
  };

  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case "scale":
        return { scale: isHovered ? 1.02 : 1 };
      case "border":
        return { borderColor: isHovered ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.05)" };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={cn(
        "row-span-1 rounded-xl border border-white/[0.08] bg-neutral-950 p-4 overflow-hidden",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      animate={getHoverAnimation()}
    >
      {header && <div className="mb-4 overflow-hidden rounded-lg">{header}</div>}
      
      <div className="flex items-center gap-2">
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-medium text-white">{title}</h3>
      </div>
      
      <p className="mt-2 text-sm text-neutral-300">{description}</p>
      
      {hoverEffect === "glow" && isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px"
          style={{
            background: `radial-gradient(600px circle at ${position.x * 100}% ${position.y * 100}%, ${glowColor}, transparent 40%)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};
