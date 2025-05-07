"use client";

import { Spotlight } from "@/components/ui/spotlight";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { GlowingCard } from "@/components/ui/glowing-card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion } from "framer-motion";
import { IconBrain, IconPencil, IconRobot, IconSparkles } from "@tabler/icons-react";

export function AceternityShowcase() {
  return (
    <div className="relative overflow-hidden py-20">
      <BackgroundBeams className="absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Experience the Power of AI Writing
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Discover how our advanced AI tools can transform your writing process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<IconPencil className="h-8 w-8 text-blue-400" />}
            title="Smart Editor"
            description="Write faster with AI-powered suggestions and real-time grammar checking"
            delay={0.1}
            glowColor="rgba(59, 130, 246, 0.4)"
          />

          <FeatureCard
            icon={<IconRobot className="h-8 w-8 text-green-400" />}
            title="AI Assistant"
            description="Get personalized writing help from your AI writing companion"
            delay={0.2}
            glowColor="rgba(74, 222, 128, 0.4)"
          />

          <FeatureCard
            icon={<IconBrain className="h-8 w-8 text-purple-400" />}
            title="Content Generation"
            description="Generate high-quality content for any purpose with a few clicks"
            delay={0.3}
            glowColor="rgba(168, 85, 247, 0.4)"
          />

          <FeatureCard
            icon={<IconSparkles className="h-8 w-8 text-amber-400" />}
            title="Magic Rewrite"
            description="Transform your text with different tones, styles, and formats"
            delay={0.4}
            glowColor="rgba(251, 191, 36, 0.4)"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Spotlight className="rounded-xl border border-white/[0.08] bg-neutral-950/70 p-6 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium text-white">Advanced AI Technology</h3>
              <p className="text-gray-300">
                Our platform leverages state-of-the-art language models to provide you with the most accurate and helpful writing assistance available.
              </p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <IconSparkles className="h-5 w-5 text-blue-400" />
                  <span>GPT-4 powered writing suggestions</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconSparkles className="h-5 w-5 text-blue-400" />
                  <span>Context-aware content generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconSparkles className="h-5 w-5 text-blue-400" />
                  <span>Multilingual support for global writers</span>
                </li>
              </ul>
            </div>
          </Spotlight>

          <TextRevealCard
            text="Unlock Your Writing Potential"
            revealText="Join thousands of writers who have transformed their writing process with AIWriter. Start your journey today and experience the future of writing."
            className="h-full"
          >
            <p className="text-sm text-neutral-300">
              AIWriter helps you break through writer&apos;s block, refine your ideas, and produce polished content in a fraction of the time.
            </p>
          </TextRevealCard>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
  glowColor
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  glowColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <GlowingCard className="h-full" glowColor={glowColor}>
        <div className="flex flex-col gap-4">
          <div className="rounded-full bg-neutral-900 p-3 w-fit">
            {icon}
          </div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </GlowingCard>
    </motion.div>
  );
}
