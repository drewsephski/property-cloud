"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  overflow?: boolean;
}

export function ParallaxEffect({
  children,
  className,
  speed = 0.5,
  direction = "up",
  overflow = false,
  ...props
}: ParallaxEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const { scrollY } = useScroll();

  // Calculate the element's position and the window height on mount and resize
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updatePosition = () => {
      const rect = element.getBoundingClientRect();
      setElementTop(rect.top + window.scrollY);
      setClientHeight(window.innerHeight);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  // Create a range based on the element's position and the client height
  const range = [elementTop - clientHeight, elementTop + clientHeight];

  // Transform the scroll position into a value for the direction
  let transformValue;
  switch (direction) {
    case "up":
      transformValue = useTransform(scrollY, range, ["0%", `${-speed * 100}%`]);
      break;
    case "down":
      transformValue = useTransform(scrollY, range, ["0%", `${speed * 100}%`]);
      break;
    case "left":
      transformValue = useTransform(scrollY, range, ["0%", `${-speed * 100}%`]);
      break;
    case "right":
      transformValue = useTransform(scrollY, range, ["0%", `${speed * 100}%`]);
      break;
    default:
      transformValue = useTransform(scrollY, range, ["0%", `${-speed * 100}%`]);
  }

  // Apply the transform to the appropriate axis
  const isHorizontal = direction === "left" || direction === "right";
  const motionStyle = isHorizontal
    ? { x: transformValue }
    : { y: transformValue };

  return (
    <div
      ref={ref}
      className={cn(
        "relative",
        overflow ? "overflow-hidden" : "",
        className
      )}
      {...props}
    >
      <motion.div style={motionStyle} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
