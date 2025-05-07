"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Sparkles,
  Zap,
  RefreshCw,
  Layers,
  Shield,
  Brain,
  Lightbulb,
  Wand2,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/aceternity/animated-background";

// Define features with consistent structure
const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Content Generation",
    description: "Create high-quality blog posts, articles, and social media content in seconds with our advanced AI technology.",
    color: "blue",
  },
  {
    icon: Zap,
    title: "Lightning-Fast Results",
    description: "Get instant content suggestions and complete drafts in a fraction of the time it would take to write manually.",
    color: "yellow",
  },
  {
    icon: RefreshCw,
    title: "Smart Rewrites",
    description: "Transform existing content with intelligent rewrites that maintain your unique voice and style.",
    color: "green",
  },
  {
    icon: Layers,
    title: "Multi-Format Support",
    description: "Generate content for blogs, social media, emails, ads, and more with format-specific optimization.",
    color: "purple",
  },
  {
    icon: Shield,
    title: "Plagiarism-Free Content",
    description: "Our AI creates 100% original content that passes plagiarism checks and maintains your brand voice.",
    color: "red",
  },
  {
    icon: Lightbulb,
    title: "Creative Inspiration",
    description: "Get unstuck with AI-powered suggestions that spark new ideas and creative directions for your content.",
    color: "amber",
  },
];

// Helper function to get color styles
const getColorStyles = (color) => {
  const styles = {
    blue: { bg: "rgba(59, 130, 246, 0.1)", text: "text-blue-500" },
    yellow: { bg: "rgba(245, 158, 11, 0.1)", text: "text-yellow-500" },
    green: { bg: "rgba(34, 197, 94, 0.1)", text: "text-green-500" },
    purple: { bg: "rgba(168, 85, 247, 0.1)", text: "text-purple-500" },
    red: { bg: "rgba(239, 68, 68, 0.1)", text: "text-red-500" },
    amber: { bg: "rgba(251, 191, 36, 0.1)", text: "text-amber-500" },
  };
  return styles[color] || styles.blue;
};

export function BentoGridDemo() {
  return (
    <div>
      <AnimatedBackground
        className="absolute inset-0 z-0"
        particleCount={15}
        particleColor="rgba(120, 119, 198, 0.08)"
        particleSize={3}
      >
        <div />
      </AnimatedBackground>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="mb-6 heading-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">AI-Powered</span> Writing Features
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-muted-foreground mb-4">
              Discover how our platform can transform your content creation
              process
            </p>
            <p className="text-lg text-primary font-bold mx-auto tracking-wider">
              Faster. Smarter. Better.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="bento-grid mx-auto gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="glass-card h-full group overflow-hidden rounded-2xl p-6">
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                    style={{
                      background: `linear-gradient(to bottom right, ${getColorStyles(feature.color).bg}, transparent)`,
                    }}
                  />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className="flex h-12 w-12 items-center justify-center rounded-full"
                        style={{ backgroundColor: getColorStyles(feature.color).bg }}
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          boxShadow: `0 0 15px ${getColorStyles(feature.color).bg}`
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <feature.icon className={`h-6 w-6 ${getColorStyles(feature.color).text}`} />
                      </motion.div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
