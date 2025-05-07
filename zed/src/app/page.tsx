import { HeroSection } from "@/components/hero-section";
import { FeaturesGrid } from "@/components/features-grid";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { SignupForm } from "@/components/signup-form";
import { AceternityShowcase } from "@/components/aceternity-showcase";
import { BentoGridDemo } from "@/components/bento-grid-demo";
import { Suspense } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { ParallaxEffect } from "@/components/aceternity/parallax-effect";
import { AnimatedBackground } from "@/components/aceternity/animated-background";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <div className="flex flex-col content-spacing">
        {/* Hero section */}
        <section className="section-gap border-b border-border">
          <HeroSection />
        </section>

        {/* Features section */}
        <section className="section-gap relative">
          <div className="absolute inset-0 -z-10 bg-grid-small-white bg-transparent opacity-20"></div>
          <ParallaxEffect direction="up" speed={0.5} className="w-full">
            <Spotlight className="w-full container mx-auto" spotlightColor="rgba(101, 64, 240, 0.15)">
              <BentoGridDemo />
            </Spotlight>
          </ParallaxEffect>
        </section>

        {/* Aceternity showcase section */}
        <section className="section-gap relative">
          <BackgroundBeams className="absolute inset-0 z-0" beamOpacity={0.15} />
          <div className="container mx-auto relative z-10">
            <AceternityShowcase />
          </div>
        </section>

        {/* Feature grid section */}
        <section className="section-gap relative">
          <AnimatedBackground
            className="absolute inset-0 -z-10"
            particleCount={20}
            particleColor="rgba(101, 64, 240, 0.08)"
          >
            <div />
          </AnimatedBackground>
          <ParallaxEffect direction="up" speed={0.4} className="w-full">
            <FeaturesGrid />
          </ParallaxEffect>
        </section>

        {/* Testimonials section */}
        <section className="section-gap relative">
          <div className="absolute top-0 left-0 -z-10 h-1/2 w-full bg-gradient-to-b from-primary to-transparent opacity-5"></div>
          <div className="container mx-auto">
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Signup section */}
        <section className="section-gap border-t border-border">
          <SignupForm />
        </section>
      </div>
    </Suspense>
  );
}
