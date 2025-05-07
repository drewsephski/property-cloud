import { PricingTable } from "@/components/pricing-table";
import { Check, X, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "You can sign up for any plan and get full access to all features for 14 days. No credit card is required, and you can cancel anytime during the trial period with no charges.",
  },
  {
    question: "What happens when I reach my monthly word limit?",
    answer:
      "When you reach your monthly word limit, you can either upgrade to a higher plan or wait until your next billing cycle when your limit resets. We'll notify you when you're approaching your limit.",
  },
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, the change takes effect immediately. If you downgrade, the change takes effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a limit to how many projects I can create?",
    answer:
      "No, there's no limit to the number of projects you can create on any plan. You're only limited by the total number of words you can generate per month.",
  },
  {
    question: "Do unused words roll over to the next month?",
    answer:
      "No, unused words do not roll over to the next month. Your word limit resets at the beginning of each billing cycle.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with AIWriter for any reason, you can request a full refund within 30 days of your purchase.",
  },
];

const comparisonFeatures = [
  {
    name: "Word limit",
    starter: "5,000 words/month",
    professional: "25,000 words/month",
    enterprise: "Unlimited",
  },
  {
    name: "Content types",
    starter: "Basic",
    professional: "All types",
    enterprise: "All types",
  },
  {
    name: "Response time",
    starter: "Standard",
    professional: "Faster",
    enterprise: "Fastest",
  },
  {
    name: "Users",
    starter: "1",
    professional: "3",
    enterprise: "Unlimited",
  },
  {
    name: "MDX Blog Integration",
    starter: "❌",
    professional: "✅",
    enterprise: "✅",
  },
  {
    name: "Simple Navbar Configuration",
    starter: "✅",
    professional: "✅",
    enterprise: "✅",
  },
  {
    name: "Admonition/Callout Components",
    starter: "❌",
    professional: "✅",
    enterprise: "✅",
  },
  {
    name: "Blog Posts Pagination & Categories",
    starter: "❌",
    professional: "✅",
    enterprise: "✅",
  },
  {
    name: "Custom templates",
    starter: "❌",
    professional: "✅",
    enterprise: "✅",
  },
  {
    name: "API access",
    starter: "❌",
    professional: "❌",
    enterprise: "✅",
  },
  {
    name: "Custom integrations",
    starter: "❌",
    professional: "❌",
    enterprise: "✅",
  },
  {
    name: "Priority support",
    starter: "❌",
    professional: "✅",
    enterprise: "✅",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="section-gap relative">
        <div className="absolute inset-0 -z-10 bg-grid-small-white bg-transparent opacity-20" />
        <div
          className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px] -z-10"
        />
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 heading-xl">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className="mb-12 body-lg text-muted-foreground">
              Choose the plan that works best for your needs. All plans include
              a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      <PricingTable />

      <section className="section-gap relative">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 heading-lg">
              Feature <span className="gradient-text">Comparison</span>
            </h2>
            <p className="mb-12 body-lg text-muted-foreground">
              Compare features across our different plans to find the one
              that&apos;s right for you.
            </p>
          </div>

          <div className="glass overflow-hidden rounded-[var(--radius-card)] shadow-lg backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/15">
                    <th className="p-4 text-left">Feature</th>
                    <th className="p-4 text-center">Starter</th>
                    <th className="p-4 text-center">Professional</th>
                    <th className="p-4 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-primary" : ""}
                    >
                      <td className="p-4 font-medium">{feature.name}</td>
                      <td className="p-4 text-center">
                        {feature.starter === "✅" ? (
                          <Check className="mx-auto h-5 w-5 text-primary" />
                        ) : feature.starter === "❌" ? (
                          <X className="mx-auto h-5 w-5 text-muted-foreground" />
                        ) : (
                          feature.starter
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {feature.professional === "✅" ? (
                          <Check className="mx-auto h-5 w-5 text-primary" />
                        ) : feature.professional === "❌" ? (
                          <X className="mx-auto h-5 w-5 text-muted-foreground" />
                        ) : (
                          feature.professional
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {feature.enterprise === "✅" ? (
                          <Check className="mx-auto h-5 w-5 text-primary" />
                        ) : feature.enterprise === "❌" ? (
                          <X className="mx-auto h-5 w-5 text-muted-foreground" />
                        ) : (
                          feature.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap relative">
        <div
          className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[100px] -z-10"
        />
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 heading-lg">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="mb-12 body-lg text-muted-foreground">
              Find answers to common questions about our pricing and plans.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-card group">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h3 className="mb-3 text-xl font-bold tracking-tight">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
