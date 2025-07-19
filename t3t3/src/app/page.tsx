/**
 * Modern SaaS landing page built with custom UI components
 */

"use client";

import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  // Navigation configuration
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    {
      label: "Resources",
      href: "#",
      children: [
        { label: "Docs", href: "/docs" },
        { label: "Blog", href: "/blog" },
      ],
    },
  ];

  const actions = (
    <>
      <Button variant="ghost" asChild>
        <a href="/login">Log in</a>
      </Button>
      <Button variant="gradient" asChild>
        <a href="/signup">Sign up</a>
      </Button>
    </>
  );

  return (
    <>
      {/* Navigation */}
      <Navbar items={navItems} actions={actions} sticky glassEffect />

      {/* Hero Section */}
      <HeroSection />

      {/* Pricing Section */}
      <PricingSection />
    </>
  );
}
