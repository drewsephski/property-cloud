"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  rotateAmount?: number;
}

export function AnimatedCard({
  children,
  className,
  hoverScale = 1.05,
  rotateAmount = 5,
  ...props
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setMousePosition({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY,
    });
  };

  // Remove HTML attributes from props to avoid type conflict with motion.div
  const { onAnimationStart, onDrag, onDragStart, onDragEnd, ...htmlProps } =
    props;

  return (
    <motion.div
      className={cn(
        "glass overflow-hidden rounded-xl p-6 transition-all duration-300",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      animate={{
        scale: isHovered ? hoverScale : 1,
        rotateX: isHovered ? -mousePosition.y * rotateAmount : 0,
        rotateY: isHovered ? mousePosition.x * rotateAmount : 0,
        boxShadow: isHovered
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      {...htmlProps}
    >
      {children}
    </motion.div>
  );
}
