"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TextShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The text content to apply the shimmer effect to
   */
  children: React.ReactNode;
  
  /**
   * The primary color of the text
   * @default "transparent"
   */
  textColor?: string;
  
  /**
   * The gradient colors for the shimmer effect
   * @default "from-purple-600 via-pink-400 to-blue-500"
   */
  gradient?: string;
  
  /**
   * The duration of the shimmer animation in seconds
   * @default 3
   */
  duration?: number;
  
  /**
   * The delay before the animation starts in seconds
   * @default 0
   */
  delay?: number;
  
  /**
   * The direction of the shimmer animation
   * @default "right"
   */
  direction?: "left" | "right" | "up" | "down";
  
  /**
   * The font weight of the text
   * @default "bold"
   */
  fontWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  
  /**
   * Whether the animation should loop infinitely
   * @default true
   */
  infinite?: boolean;
  
  /**
   * The size of the text
   * @default "default"
   */
  size?: "sm" | "default" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

  /**
   * Whether to use a mask effect instead of background-clip
   * Some browsers have better performance with mask
   * @default false
   */
  useMask?: boolean;
}

export function TextShimmer({
  children,
  textColor = "transparent",
  gradient = "from-purple-600 via-pink-400 to-blue-500",
  duration = 3,
  delay = 0,
  direction = "right",
  fontWeight = "bold",
  infinite = true,
  size = "default",
  useMask = false,
  className,
  ...props
}: TextShimmerProps) {
  // Determine the animation direction
  const getAnimationDirection = () => {
    switch (direction) {
      case "left":
        return "to right, to left";
      case "up":
        return "to bottom, to top";
      case "down":
        return "to top, to bottom";
      case "right":
      default:
        return "to left, to right";
    }
  };

  // Determine the font size class
  const getFontSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      case "2xl":
        return "text-2xl";
      case "3xl":
        return "text-3xl";
      case "4xl":
        return "text-4xl";
      case "default":
      default:
        return "text-base";
    }
  };

  // Determine the font weight class
  const getFontWeightClass = () => {
    switch (fontWeight) {
      case "normal":
        return "font-normal";
      case "medium":
        return "font-medium";
      case "semibold":
        return "font-semibold";
      case "extrabold":
        return "font-extrabold";
      case "bold":
      default:
        return "font-bold";
    }
  };

  // Create a unique animation name based on the direction and duration
  const animationName = `shimmer-${direction}-${duration}`;

  // Define the keyframes style
  const keyframesStyle = {
    [`@keyframes ${animationName}`]: {
      "0%": {
        backgroundPosition: "0% 50%",
      },
      "100%": {
        backgroundPosition: "100% 50%",
      },
    },
  };

  return (
    <div
      className={cn(
        "inline-block relative",
        getFontSizeClass(),
        getFontWeightClass(),
        className
      )}
      {...props}
    >
      <style jsx>{`
        @keyframes ${animationName} {
          0% {
            background-position: ${direction === "right" || direction === "down" ? "100% 50%" : "0% 50%"};
          }
          100% {
            background-position: ${direction === "right" || direction === "down" ? "0% 50%" : "100% 50%"};
          }
        }
      `}</style>
      <span
        className={cn(
          "bg-gradient-to-r",
          gradient,
          "bg-clip-text text-transparent inline-block",
          "bg-[length:200%_auto]",
          useMask && "bg-white text-transparent [mask-image:linear-gradient(to_right,var(--tw-gradient-stops))]"
        )}
        style={{
          color: textColor,
          animation: `${animationName} ${duration}s ${
            infinite ? "infinite" : "1"
          } linear ${delay}s ${getAnimationDirection()}`,
        }}
        aria-label={typeof children === "string" ? children : undefined}
      >
        {children}
      </span>
    </div>
  );
}
