"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import React from "react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientVia?: string;
}

export function GradientButton({
  children,
  className,
  gradientFrom = "from-primary",
  gradientTo = "to-accent",
  gradientVia,
  variant,
  size,
  ...props
}: GradientButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-r",
        gradientFrom,
        gradientVia && `via-${gradientVia}`,
        gradientTo,
        "hover:shadow-lg hover:shadow-primary/20",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 1,
          transition: { duration: 0.3 },
        }}
      >
        <div className="absolute inset-0 w-full h-full glow-effect" />
      </motion.div>
      {children}
    </Button>
  );
}
