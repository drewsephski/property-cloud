"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const floatingCardVariants = cva(
  "relative overflow-hidden rounded-lg border transition-all duration-300 ease-out will-change-transform",
  {
    variants: {
      variant: {
        default: "bg-background/70 backdrop-blur-sm border-border/50 shadow-sm",
        glass: "bg-background/40 backdrop-blur-md border-white/10 shadow-md",
        solid: "bg-background border-border shadow-md",
        gradient: "bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border-white/10 shadow-md",
        dark: "bg-black/80 backdrop-blur-sm border-white/10 text-white shadow-md",
        colored: "backdrop-blur-sm border-white/10 shadow-md", // Use with bgColor prop
      },
      size: {
        sm: "p-3",
        default: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      hover: {
        none: "",
        subtle: "hover:translate-y-[-4px] hover:shadow-lg",
        float: "hover:translate-y-[-8px] hover:shadow-xl transition-all duration-300",
        scale: "hover:scale-[1.02] hover:shadow-lg",
        glow: "hover:shadow-[0_0_15px_rgba(120,120,255,0.5)] hover:border-blue-300/50",
        pulse: "hover:shadow-lg hover:scale-[1.01] hover:border-opacity-80",
      },
      glowColor: {
        blue: "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:border-blue-300/50",
        purple: "hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:border-purple-300/50",
        green: "hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:border-green-300/50",
        pink: "hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:border-pink-300/50",
        amber: "hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:border-amber-300/50",
      },
      borderGlow: {
        true: "before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
      },
      clickEffect: {
        true: "active:scale-[0.98] active:shadow-sm transition-all duration-200",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "subtle",
      borderGlow: false,
      clickEffect: true,
    },
  }
);

export interface FloatingCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof floatingCardVariants> {
  /**
   * Optional custom background color (works best with 'colored' variant)
   */
  bgColor?: string;
  
  /**
   * Optional custom border color
   */
  borderColor?: string;
  
  /**
   * Optional custom glow color (CSS color value)
   * Only used when hover is set to 'glow' and glowColor is not specified
   */
  customGlowColor?: string;
  
  /**
   * Optional custom glow intensity (0-100)
   */
  glowIntensity?: number;
  
  /**
   * Whether the card should have a glassmorphism effect
   */
  glass?: boolean;
  
  /**
   * Whether the card content should be centered
   */
  centered?: boolean;
  
  /**
   * Whether the card should take full height of its container
   */
  fullHeight?: boolean;
  
  /**
   * Whether the card should have a gradient background
   * Only applies when variant is 'gradient'
   */
  gradientColors?: string;
  
  /**
   * Whether the card should have a border
   */
  hasBorder?: boolean;
  
  /**
   * Whether the card should have a shadow
   */
  hasShadow?: boolean;
  
  /**
   * The elevation level of the card (1-5)
   */
  elevation?: 1 | 2 | 3 | 4 | 5;
  
  /**
   * Whether to use a container inside the card
   */
  withContainer?: boolean;
  
  /**
   * Whether the card is interactive (adds hover and focus styles)
   */
  interactive?: boolean;
  
  /**
   * Whether the card is disabled
   */
  disabled?: boolean;
  
  /**
   * The component used for the root node
   * @default div
   */
  as?: React.ElementType;
}

export const FloatingCard = React.forwardRef<HTMLDivElement, FloatingCardProps>(
  (
    {
      className,
      children,
      variant,
      size,
      hover,
      glowColor,
      borderGlow,
      clickEffect,
      bgColor,
      borderColor,
      customGlowColor,
      glowIntensity = 50,
      glass = false,
      centered = false,
      fullHeight = false,
      gradientColors,
      hasBorder = true,
      hasShadow = true,
      elevation = 1,
      withContainer = false,
      interactive = true,
      disabled = false,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    // Calculate custom styles based on props
    const customStyles: React.CSSProperties = {};
    
    // Apply custom background color if provided
    if (bgColor) {
      customStyles.backgroundColor = bgColor;
    }
    
    // Apply custom border color if provided
    if (borderColor) {
      customStyles.borderColor = borderColor;
    }
    
    // Apply custom glow color if provided and hover is 'glow'
    if (hover === "glow" && customGlowColor && !glowColor) {
      const glowOpacity = glowIntensity ? glowIntensity / 100 : 0.5;
      customStyles.boxShadow = `0 0 15px ${customGlowColor}${Math.round(glowOpacity * 255).toString(16).padStart(2, '0')}`;
    }
    
    // Apply gradient colors if provided and variant is 'gradient'
    if (variant === "gradient" && gradientColors) {
      customStyles.backgroundImage = gradientColors;
    }
    
    // Apply elevation shadow
    if (hasShadow && !customStyles.boxShadow) {
      const elevationMap = {
        1: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        2: "0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)",
        3: "0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)",
        4: "0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)",
        5: "0 20px 40px rgba(0,0,0,0.2)"
      };
      customStyles.boxShadow = elevationMap[elevation];
    }
    
    // Apply glass effect if requested and not already applied by variant
    if (glass && variant !== "glass") {
      customStyles.backdropFilter = "blur(12px)";
      customStyles.backgroundColor = "rgba(255, 255, 255, 0.1)";
    }
    
    // Remove border if not needed
    if (!hasBorder) {
      customStyles.borderWidth = "0";
    }
    
    return (
      <Component
        ref={ref}
        className={cn(
          floatingCardVariants({
            variant,
            size,
            hover: disabled ? "none" : hover,
            glowColor: disabled ? undefined : glowColor,
            borderGlow: disabled ? false : borderGlow,
            clickEffect: disabled || !interactive ? false : clickEffect,
          }),
          centered && "flex flex-col items-center justify-center text-center",
          fullHeight && "h-full",
          interactive && !disabled && "cursor-pointer",
          disabled && "opacity-60 cursor-not-allowed",
          className
        )}
        style={customStyles}
        tabIndex={interactive && !disabled ? 0 : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {withContainer ? (
          <div className="relative z-10 h-full">
            {children}
          </div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

FloatingCard.displayName = "FloatingCard";
