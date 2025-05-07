"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { MicroInteraction } from "@/components/aceternity/micro-interaction";
import { AnimatedCard } from "@/components/aceternity/animated-card";
import { GradientButton } from "@/components/aceternity/gradient-button";

type PricingPeriod = "monthly" | "annual";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    price: {
      monthly: 9.99,
      annual: 99.99,
    },
    features: [
      "5,000 words per month",
      "Basic content types",
      "Standard response time",
      "Email support",
      "1 user",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    description: "Ideal for professionals and growing businesses",
    price: {
      monthly: 19.99,
      annual: 199.99,
    },
    features: [
      "25,000 words per month",
      "All content types",
      "Faster response time",
      "Priority support",
      "3 users",
      "Custom templates",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For teams and organizations with advanced needs",
    price: {
      monthly: 49.99,
      annual: 499.99,
    },
    features: [
      "Unlimited words",
      "All content types",
      "Fastest response time",
      "24/7 dedicated support",
      "Unlimited users",
      "Custom templates",
      "API access",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingTable() {
  const [period, setPeriod] = useState<PricingPeriod>("monthly");

  const discount = 16.7; // Percentage discount for annual billing

  return (
    <section className="section-gap">
      <Spotlight className="container mx-auto max-w-6xl px-4" spotlightColor="rgba(101, 64, 240, 0.15)">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="mb-6 heading-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </motion.h2>
          <motion.p
            className="mb-8 body-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Choose the plan that works best for your needs. All plans include a 14-day free trial.
          </motion.p>

          <motion.div
            className="mb-12 inline-flex items-center rounded-[var(--radius-button)] border border-border p-1 overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ boxShadow: "0 0 20px 2px rgba(101, 64, 240, 0.2)" }}
          >
            <motion.button
              type="button"
              onClick={() => setPeriod("monthly")}
              className={`relative z-10 rounded-[var(--radius-button)] px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                period === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Switch to monthly billing"
              whileHover={{ scale: period === "monthly" ? 1 : 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Monthly
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setPeriod("annual")}
              className={`relative z-10 rounded-[var(--radius-button)] px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                period === "annual"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Switch to annual billing"
              whileHover={{ scale: period === "annual" ? 1 : 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Annual <motion.span
                className="text-xs inline-block"
                animate={period === "annual" ?
                  { scale: [1, 1.2, 1], opacity: [1, 1, 1] } :
                  { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.4, repeat: period === "annual" ? 1 : 0 }}
              >({discount}% off)</motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3 mx-auto max-w-6xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {plans.map((plan, index) => {
            const price = period === "monthly" ? plan.price[period] : plan.price[period] / 12;

            return (
              <motion.div
                key={plan.name}
                variants={item}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <AnimatedCard
                  className={`relative overflow-hidden rounded-[var(--radius-card)] p-8 h-full ${
                    plan.popular
                      ? "border-primary/50 ring-1 ring-primary/50 shadow-lg shadow-primary/20"
                      : "border-border/50"
                  }`}
                  hoverScale={1.02}
                  rotateAmount={1.5}
                >
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-4 right-4 rounded-[var(--radius-button)] bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground shadow-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                    >
                      <Sparkles className="mr-1 h-3 w-3 inline-block" /> Most Popular
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                  >
                    <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                    <p className="mt-3 text-muted-foreground">{plan.description}</p>
                  </motion.div>
                  <motion.div
                    className="my-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  >
                    <span className="text-4xl font-bold tracking-tight">
                      {formatCurrency(price)}
                    </span>
                    <span className="text-muted-foreground ml-1">/{period === "monthly" ? "month" : "year"}</span>
                  </motion.div>
                  <motion.ul
                    className="mb-6 space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                  >
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) + (i * 0.05) }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        </motion.div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <div className="mt-auto">
                    {plan.popular ? (
                      <Link href="/signup">
                        <MicroInteraction hoverEffect="glow" clickEffect="ripple">
                          <GradientButton
                            className="w-full items-center justify-center rounded-[var(--radius-button)] px-7 py-4 text-center font-medium text-lg"
                            gradientFrom="from-primary"
                            gradientTo="to-accent"
                            variant="default"
                          >
                            {plan.cta}
                          </GradientButton>
                        </MicroInteraction>
                      </Link>
                    ) : (
                      <Link href="/signup">
                        <MicroInteraction hoverEffect="scale" clickEffect="ripple">
                          <div className="inline-flex w-full items-center justify-center rounded-[var(--radius-button)] bg-secondary px-7 py-4 text-center font-medium text-lg text-secondary-foreground hover:bg-secondary/90 hover:shadow-lg transition-all duration-300">
                            {plan.cta}
                          </div>
                        </MicroInteraction>
                      </Link>
                    )}
                  </div>
                </AnimatedCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Spotlight>
    </section>
  );
}
