"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the grid cells
   * @default "medium"
   */
  gridSize?: "small" | "medium" | "large" | number;
  
  /**
   * The color of the grid lines in light mode
   * @default "slate"
   */
  lightColor?: "slate" | "gray" | "zinc" | "neutral" | "blue" | string;
  
  /**
   * The color of the grid lines in dark mode
   * @default "slate"
   */
  darkColor?: "slate" | "gray" | "zinc" | "neutral" | "blue" | string;
  
  /**
   * The opacity of the grid lines (0-100)
   * @default 4
   */
  opacity?: number;
  
  /**
   * The animation duration in seconds
   * @default 20
   */
  animationDuration?: number;
  
  /**
   * Whether to show a radial gradient overlay
   * @default false
   */
  showRadialGradient?: boolean;
  
  /**
   * Whether to fade the grid at the edges
   * @default true
   */
  fadeEdges?: boolean;
  
  /**
   * Whether to animate the grid
   * @default true
   */
  animate?: boolean;
  
  /**
   * Whether to show the grid in light mode
   * @default true
   */
  showInLightMode?: boolean;
  
  /**
   * Whether to show the grid in dark mode
   * @default true
   */
  showInDarkMode?: boolean;
}

export function AnimatedGrid({
  className,
  gridSize = "medium",
  lightColor = "slate",
  darkColor = "slate",
  opacity = 4,
  animationDuration = 20,
  showRadialGradient = false,
  fadeEdges = true,
  animate = true,
  showInLightMode = true,
  showInDarkMode = true,
  children,
  ...props
}: AnimatedGridProps) {
  // Calculate the grid size in pixels
  const getGridSizeValue = () => {
    if (typeof gridSize === "number") return `${gridSize}px`;
    
    switch (gridSize) {
      case "small":
        return "24px";
      case "large":
        return "48px";
      case "medium":
      default:
        return "32px";
    }
  };
  
  // Get color values for light and dark modes
  const getLightColorValue = () => {
    switch (lightColor) {
      case "gray":
        return `rgb(15 23 42 / ${opacity}%)`;
      case "zinc":
        return `rgb(24 24 27 / ${opacity}%)`;
      case "neutral":
        return `rgb(23 23 23 / ${opacity}%)`;
      case "blue":
        return `rgb(30 58 138 / ${opacity}%)`;
      case "slate":
      default:
        return `rgb(15 23 42 / ${opacity}%)`;
    }
  };
  
  const getDarkColorValue = () => {
    switch (darkColor) {
      case "gray":
        return `rgb(249 250 251 / ${opacity}%)`;
      case "zinc":
        return `rgb(244 244 245 / ${opacity}%)`;
      case "neutral":
        return `rgb(245 245 245 / ${opacity}%)`;
      case "blue":
        return `rgb(191 219 254 / ${opacity}%)`;
      case "slate":
      default:
        return `rgb(248 250 252 / ${opacity}%)`;
    }
  };
  
  // Create CSS for the grid background
  const gridSizeValue = getGridSizeValue();
  const lightColorValue = getLightColorValue();
  const darkColorValue = getDarkColorValue();
  
  // Create the SVG background for light mode
  const lightModeSvg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${gridSizeValue}" height="${gridSizeValue}" viewBox="0 0 32 32" fill="none" stroke="${lightColorValue.replace(/ /g, '%20')}"><path d="M0 .5H31.5V32"></path></svg>`);
  
  // Create the SVG background for dark mode
  const darkModeSvg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${gridSizeValue}" height="${gridSizeValue}" viewBox="0 0 32 32" fill="none" stroke="${darkColorValue.replace(/ /g, '%20')}"><path d="M0 .5H31.5V32"></path></svg>`);
  
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        !showInLightMode && "hidden dark:block",
        !showInDarkMode && "block dark:hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 z-0",
          animate && "animate-grid-fade",
          fadeEdges && "mask-fade-edges"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,${lightModeSvg}")`,
          backgroundSize: gridSizeValue,
          animationDuration: `${animationDuration}s`,
        }}
        aria-hidden="true"
      />
      
      <div
        className={cn(
          "absolute inset-0 z-0 dark:block hidden",
          animate && "animate-grid-fade",
          fadeEdges && "mask-fade-edges"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,${darkModeSvg}")`,
          backgroundSize: gridSizeValue,
          animationDuration: `${animationDuration}s`,
        }}
        aria-hidden="true"
      />
      
      {showRadialGradient && (
        <div 
          className="absolute inset-0 z-10 bg-radial-gradient opacity-80 pointer-events-none"
          aria-hidden="true"
        />
      )}
      
      <div className="relative z-20">
        {children}
      </div>
      
      <style jsx global>{`
        @keyframes gridFade {
          0% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.4;
          }
        }
        
        .animate-grid-fade {
          animation: gridFade var(--duration, 20s) ease-in-out infinite;
        }
        
        .mask-fade-edges {
          mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
        }
        
        .bg-radial-gradient {
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0) 70%
          );
        }
        
        .dark .bg-radial-gradient {
          background: radial-gradient(
            circle at center,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0) 70%
          );
        }
      `}</style>
    </div>
  );
}
