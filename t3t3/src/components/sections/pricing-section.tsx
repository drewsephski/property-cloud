"use client";

import React, { useState } from "react";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FloatingCard } from "@/components/ui/floating-card";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { AnimatedGrid } from "@/components/ui/animated-grid";

interface PricingFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PricingFeature[];
  cta: {
    text: string;
    href: string;
  };
  popular?: boolean;
  highlighted?: boolean;
  badge?: string;
  color?: string;
}

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
  className?: string;
  yearlyDiscount?: number;
  showYearlyToggle?: boolean;
  showFeatureComparison?: boolean;
  darkBackground?: boolean;
}

export function PricingSection({
  title = "Simple, transparent pricing",
  subtitle = "Choose the plan that's right for you and start building better products today.",
  tiers = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for trying out our platform with basic features.",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { name: "Up to 3 projects", included: true },
        { name: "Basic analytics", included: true },
        { name: "24-hour support response time", included: true },
        { name: "Community access", included: true },
        { name: "Advanced integrations", included: false },
        { name: "API access", included: false },
        { name: "Custom branding", included: false },
        { name: "Priority support", included: false },
      ],
      cta: {
        text: "Get Started",
        href: "/signup?plan=free",
      },
      color: "gray",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Everything you need for a growing business.",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        { name: "Unlimited projects", included: true },
        { name: "Advanced analytics", included: true, highlight: true },
        { name: "12-hour support response time", included: true },
        { name: "Community access", included: true },
        { name: "Advanced integrations", included: true, highlight: true },
        { name: "API access", included: true },
        { name: "Custom branding", included: false },
        { name: "Priority support", included: false },
      ],
      cta: {
        text: "Upgrade to Pro",
        href: "/signup?plan=pro",
      },
      popular: true,
      badge: "Most Popular",
      color: "blue",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Advanced features for teams that need more power.",
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        { name: "Unlimited projects", included: true },
        { name: "Advanced analytics", included: true },
        { name: "4-hour support response time", included: true, highlight: true },
        { name: "Community access", included: true },
        { name: "Advanced integrations", included: true },
        { name: "API access", included: true },
        { name: "Custom branding", included: true, highlight: true },
        { name: "Priority support", included: true, highlight: true },
      ],
      cta: {
        text: "Contact Sales",
        href: "/contact-sales",
      },
      highlighted: true,
      color: "purple",
    },
  ],
  className,
  yearlyDiscount = 20,
  showYearlyToggle = true,
  showFeatureComparison = true,
  darkBackground = false,
}: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false);

  // Calculate the savings percentage for yearly plans
  const savingsPercentage = yearlyDiscount;

  // Helper function to get price based on billing period
  const getPrice = (tier: PricingTier) => {
    return isYearly ? tier.yearlyPrice : tier.monthlyPrice;
  };

  // Helper function to get card variant based on tier properties
  const getCardVariant = (tier: PricingTier) => {
    if (tier.highlighted) return "gradient";
    if (tier.popular) return "glass";
    return "default";
  };

  // Helper function to get card hover effect based on tier properties
  const getHoverEffect = (tier: PricingTier) => {
    if (tier.highlighted || tier.popular) return "float";
    return "subtle";
  };

  // Helper function to get glow color based on tier properties
  const getGlowColor = (tier: PricingTier) => {
    if (tier.color === "blue") return "blue";
    if (tier.color === "purple") return "purple";
    if (tier.color === "green") return "green";
    if (tier.color === "pink") return "pink";
    return undefined;
  };

  return (
    <section 
      className={cn(
        "relative overflow-hidden py-20 md:py-32",
        darkBackground && "bg-slate-900 text-white",
        className
      )}
    >
      {/* Background elements */}
      <AnimatedGrid 
        className="absolute inset-0 z-0" 
        gridSize="medium" 
        opacity={darkBackground ? 6 : 3} 
        fadeEdges={true}
        animate={true}
      />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Section heading */}
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h2>
          
          {/* Section subtitle */}
          <p className="mb-12 text-xl text-muted-foreground">
            {subtitle}
          </p>
          
          {/* Billing toggle */}
          {showYearlyToggle && (
            <div className="mb-12 flex flex-col items-center justify-center">
              <div className="relative mb-4 inline-flex items-center rounded-full border bg-background/50 p-1 backdrop-blur-sm">
                <button
                  type="button"
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    !isYearly ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground"
                  )}
                  onClick={() => setIsYearly(false)}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className={cn(
                    "relative ml-0.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isYearly ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground"
                  )}
                  onClick={() => setIsYearly(true)}
                >
                  Yearly
                </button>
              </div>
              
              {isYearly && (
                <div className="flex items-center text-sm text-green-500 dark:text-green-400">
                  <Sparkles className="mr-1 h-4 w-4" />
                  <span>Save {savingsPercentage}% with yearly billing</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Pricing tiers */}
        <div className="mx-auto mt-12 grid max-w-md gap-8 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <FloatingCard
              key={tier.id}
              variant={getCardVariant(tier)}
              hover={getHoverEffect(tier)}
              glowColor={getGlowColor(tier)}
              borderGlow={tier.popular ?? tier.highlighted}
              className={cn(
                "flex h-full flex-col justify-between",
                tier.popular && "relative z-10 scale-105 shadow-xl lg:-mt-4 lg:mb-4"
              )}
              gradientColors={
                tier.highlighted
                  ? "linear-gradient(to bottom right, rgba(124, 58, 237, 0.1), rgba(220, 38, 38, 0.1))"
                  : undefined
              }
            >
              {/* Popular badge */}
              {tier.badge && (
                <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm">
                  {tier.badge}
                </div>
              )}
              
              <div className="p-6 sm:p-8">
                {/* Tier name */}
                <h3 className="text-2xl font-bold tracking-tight">
                  {tier.highlighted || tier.popular ? (
                    <TextShimmer
                      gradient={
                        tier.color === "purple"
                          ? "from-purple-500 via-pink-500 to-indigo-500"
                          : tier.color === "blue"
                          ? "from-blue-500 via-cyan-500 to-sky-500"
                          : "from-indigo-500 via-purple-500 to-pink-500"
                      }
                    >
                      {tier.name}
                    </TextShimmer>
                  ) : (
                    tier.name
                  )}
                </h3>
                
                {/* Tier description */}
                <p className="mt-2 text-muted-foreground">
                  {tier.description}
                </p>
                
                {/* Tier price */}
                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold tracking-tight">
                      {formatCurrency(getPrice(tier))}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      {getPrice(tier) > 0 ? `/${isYearly ? "year" : "month"}` : ""}
                    </span>
                  </div>
                </div>
                
                {/* Feature list */}
                <ul className="mt-8 space-y-4">
                  {tier.features?.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start">
                      <div className={cn(
                        "mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        feature.included
                          ? feature.highlight
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {feature.included ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <X className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <span className={cn(
                        "text-sm",
                        feature.highlight && feature.included && "font-medium text-green-600 dark:text-green-400",
                        !feature.included && "text-muted-foreground line-through"
                      )}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA button */}
              <div className="mt-auto p-6 sm:p-8">
                <Button
                  variant={tier.highlighted ? "gradient" : tier.popular ? "default" : "outline"}
                  size="lg"
                  className={cn(
                    "w-full justify-center",
                    tier.popular && "group"
                  )}
                  rightIcon={tier.popular ? <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /> : undefined}
                  onClick={() => window.location.href = tier.cta.href}
                >
                  {tier.cta.text}
                </Button>
              </div>
            </FloatingCard>
          ))}
        </div>
        
        {/* Feature comparison table for mobile */}
        {showFeatureComparison && (
          <div className="mt-16 lg:hidden">
            <h3 className="mb-6 text-center text-xl font-bold">Feature Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                      Feature
                    </th>
                    {tiers.map((tier) => (
                      <th key={tier.id} className="px-6 py-3 text-center text-sm font-medium">
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tiers?.[0]?.features?.map((feature, featureIdx) => (
                    <tr key={featureIdx}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {feature.name}
                      </td>
                      {tiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center text-sm">
                          {tier.features?.[featureIdx]?.included ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-muted-foreground" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* FAQ or additional info section could go here */}
      </div>
    </section>
  );
}
