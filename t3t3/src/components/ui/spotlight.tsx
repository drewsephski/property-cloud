"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The fill color of the spotlight
   * @default "purple"
   */
  fill?: "purple" | "blue" | "cyan" | "green" | "orange" | "pink";
  
  /**
   * The size of the spotlight
   * @default "medium"
   */
  size?: "small" | "medium" | "large" | number;
  
  /**
   * Whether the spotlight should follow the mouse
   * @default true
   */
  followMouse?: boolean;
  
  /**
   * The x position of the spotlight (0-100)
   * Only used when followMouse is false
   */
  x?: number;
  
  /**
   * The y position of the spotlight (0-100)
   * Only used when followMouse is false
   */
  y?: number;
  
  /**
   * The blur amount of the spotlight
   * @default 80
   */
  blur?: number;
  
  /**
   * The opacity of the spotlight
   * @default 0.5
   */
  opacity?: number;
  
  /**
   * Whether to show the spotlight in dark mode
   * @default true
   */
  showInDarkMode?: boolean;
}

export function Spotlight({
  className,
  fill = "purple",
  size = "medium",
  followMouse = true,
  x = 50,
  y = 50,
  blur = 80,
  opacity = 0.5,
  showInDarkMode = true,
  children,
  ...props
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // Calculate the size in pixels
  const sizeValue = typeof size === "number" 
    ? size 
    : size === "small" 
      ? 600 
      : size === "medium" 
        ? 800 
        : 1000;

  // Set the color based on the fill prop
  const getGradientColor = () => {
    switch (fill) {
      case "purple":
        return "from-purple-500 to-indigo-700";
      case "blue":
        return "from-blue-500 to-cyan-700";
      case "cyan":
        return "from-cyan-400 to-teal-600";
      case "green":
        return "from-green-500 to-emerald-700";
      case "orange":
        return "from-orange-500 to-amber-700";
      case "pink":
        return "from-pink-500 to-rose-700";
      default:
        // If it's a custom string, assume it's a valid Tailwind class
        return fill;
    }
  };

  useEffect(() => {
    setMounted(true);
    
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      // Set initial position
      if (!followMouse) {
        setPosition({
          x: (width * x) / 100,
          y: (height * y) / 100,
        });
      }
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        
        // Update position on resize if not following mouse
        if (!followMouse) {
          setPosition({
            x: (width * x) / 100,
            y: (height * y) / 100,
          });
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [followMouse, x, y]);

  useEffect(() => {
    if (!followMouse || !mounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - left,
          y: e.clientY - top,
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followMouse, mounted]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        !showInDarkMode && "dark:hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute -z-10 transition-opacity",
          "bg-gradient-to-r animate-spotlight",
          getGradientColor()
        )}
        style={{
          width: `${sizeValue}px`,
          height: `${sizeValue}px`,
          borderRadius: "50%",
          left: `${position.x - sizeValue / 2}px`,
          top: `${position.y - sizeValue / 2}px`,
          opacity: opacity,
          filter: `blur(${blur}px)`,
          transition: followMouse ? "none" : "left 0.5s, top 0.5s",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
