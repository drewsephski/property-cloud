"use client";

import { Sparkles, Zap, RefreshCw, Layers, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimatedCard } from "@/components/aceternity/animated-card";
import { MicroInteraction } from "@/components/aceternity/micro-interaction";
import { ParallaxEffect } from "@/components/aceternity/parallax-effect";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Content Generation",
    description:
      "Create high-quality blog posts, articles, and social media content in seconds with our advanced AI technology.",
    color: "text-blue-500",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  {
    icon: Zap,
    title: "Lightning-Fast Results",
    description:
      "Get instant content suggestions and complete drafts in a fraction of the time it would take to write manually.",
    color: "text-amber-500",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
  {
    icon: RefreshCw,
    title: "Smart Rewrites",
    description:
      "Transform existing content with intelligent rewrites that maintain your unique voice and style.",
    color: "text-green-500",
    glowColor: "rgba(34, 197, 94, 0.5)",
  },
  {
    icon: Layers,
    title: "Multi-Format Support",
    description:
      "Generate content for blogs, social media, emails, ads, and more with format-specific optimization.",
    color: "text-purple-500",
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
  {
    icon: Shield,
    title: "Plagiarism-Free Content",
    description:
      "Our AI creates 100% original content that passes plagiarism checks and maintains your brand voice.",
    color: "text-red-500",
    glowColor: "rgba(239, 68, 68, 0.5)",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesGrid() {
  return (
    <div>
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px] -z-10" />
      <div className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px] -z-10" />

      <Spotlight
        className="container mx-auto max-w-6xl px-4"
        spotlightColor="rgba(101, 64, 240, 0.15)"
      >
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="mb-2 heading-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Powerful Features for{" "}
            <span className="gradient-text">Modern Content Creators</span>
          </motion.h2>
          <motion.p
            className="mb-28 body-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            AIWriter combines cutting-edge AI with intuitive design to help you
            create better content faster.
          </motion.p>
        </motion.div>

        <ParallaxEffect speed={0.3} direction="up">
          <motion.div
            className="feature-grid"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                custom={index}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2, type: "tween" },
                }}
              >
                <MicroInteraction hoverEffect="glow" clickEffect="pulse">
                  <div className="glass-card group relative h-full overflow-hidden rounded-2xl p-6">
                    <div
                      className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                      style={{
                        background: `linear-gradient(to bottom right, ${feature.glowColor}20, transparent)`,
                      }}
                    ></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <motion.div
                        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${feature.glowColor}20` }}
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          boxShadow: `0 0 15px ${feature.glowColor}`,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <feature.icon className={`h-8 w-8 ${feature.color}`} />
                      </motion.div>
                      <h3 className="mb-4 text-xl font-bold tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </MicroInteraction>
              </motion.div>
            ))}
          </motion.div>
        </ParallaxEffect>
      </Spotlight>
    </div>
  );
}
