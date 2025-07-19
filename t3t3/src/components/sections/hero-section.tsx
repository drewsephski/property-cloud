"use client";

import React from "react";
import { ArrowRight, Check, Zap, LineChart, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { FloatingCard } from "@/components/ui/floating-card";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  features?: FeatureItem[];
  className?: string;
}

export function HeroSection({
  title = "Transform Your Workflow with Our SaaS Platform",
  subtitle = "Streamline your operations, boost productivity, and scale your business with our all-in-one solution.",
  primaryCta = {
    text: "Get Started",
    href: "/signup",
  },
  secondaryCta = {
    text: "See Demo",
    href: "/demo",
  },
  features = [
    {
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      title: "Lightning Fast",
      description: "Optimized performance that keeps your workflow smooth and efficient.",
    },
    {
      icon: <Shield className="h-5 w-5 text-green-500" />,
      title: "Enterprise Security",
      description: "Bank-level security to keep your data safe and compliant.",
    },
    {
      icon: <LineChart className="h-5 w-5 text-purple-500" />,
      title: "Advanced Analytics",
      description: "Gain insights with powerful reporting and visualization tools.",
    },
  ],
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("relative overflow-hidden py-20 md:py-32", className)}>
      {/* Animated background grid */}
      <AnimatedGrid 
        className="absolute inset-0 z-0" 
        gridSize="medium" 
        opacity={3} 
        fadeEdges={true}
        animate={true}
      />
      
      {/* Spotlight effect */}
      <Spotlight
        className="absolute inset-0 z-10"
        fill="purple"
        size="large"
        opacity={0.15}
        blur={100}
      />
      
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Main heading with shimmer effect */}
          <div className="mb-6 max-w-4xl">
            <TextShimmer
              gradient="from-indigo-600 via-purple-600 to-blue-600"
              size="4xl"
              duration={4}
              className="font-extrabold tracking-tight md:text-5xl lg:text-6xl"
            >
              {title}
            </TextShimmer>
          </div>
          
          {/* Subtitle */}
          <p className="mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button 
              size="xl" 
              variant="gradient" 
              className="group font-semibold"
              rightIcon={
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              }
              onClick={() => window.location.href = primaryCta.href}
            >
              {primaryCta.text}
            </Button>
            
            <Button 
              size="xl" 
              variant="outline" 
              className="font-semibold"
              onClick={() => window.location.href = secondaryCta.href}
            >
              {secondaryCta.text}
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FloatingCard
                key={index}
                variant="glass"
                hover="float"
                borderGlow={true}
                className="flex flex-col items-center p-6 text-center"
                glowColor="blue"
              >
                <div className="mb-4 rounded-full bg-primary/10 p-3 dark:bg-primary/5">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </FloatingCard>
            ))}
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 flex flex-col items-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Trusted by innovative teams worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
              {/* Company logos would go here */}
              <div className="h-8 w-24 rounded-md bg-foreground/10"></div>
              <div className="h-8 w-24 rounded-md bg-foreground/10"></div>
              <div className="h-8 w-24 rounded-md bg-foreground/10"></div>
              <div className="h-8 w-24 rounded-md bg-foreground/10"></div>
              <div className="h-8 w-24 rounded-md bg-foreground/10"></div>
            </div>
          </div>
          
          {/* Additional feature highlights */}
          <div className="mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "Seamless Integration",
              "24/7 Support",
              "Regular Updates",
              "Custom Workflows"
            ].map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="mr-2 rounded-full bg-green-500/10 p-1">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>
      
      {/* Small spotlight in the bottom corner for added visual interest */}
      <Spotlight
        className="absolute bottom-0 right-0 z-10 h-[200px] w-[200px]"
        fill="blue"
        size="small"
        opacity={0.2}
        blur={40}
      />
    </section>
  );
}
