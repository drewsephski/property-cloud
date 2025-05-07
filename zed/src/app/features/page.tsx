import { FeaturesGrid } from "@/components/features-grid";
import { Sparkles, Zap, RefreshCw, Layers, Shield } from "lucide-react";

const detailedFeatures = [
  {
    icon: Sparkles,
    title: "AI-Powered Content Generation",
    description:
      "Create high-quality blog posts, articles, and social media content in seconds with our advanced AI technology.",
    details: [
      "Generate complete blog posts with proper structure",
      "Create engaging social media captions",
      "Write compelling email newsletters",
      "Develop product descriptions that convert",
    ],
  },
  {
    icon: Zap,
    title: "Lightning-Fast Results",
    description:
      "Get instant content suggestions and complete drafts in a fraction of the time it would take to write manually.",
    details: [
      "Generate 1,000+ words in under 30 seconds",
      "Receive multiple variations to choose from",
      "Edit and refine content in real-time",
      "Batch process multiple content pieces",
    ],
  },
  {
    icon: RefreshCw,
    title: "Smart Rewrites",
    description:
      "Transform existing content with intelligent rewrites that maintain your unique voice and style.",
    details: [
      "Rewrite content to improve readability",
      "Adjust tone and style to match your brand",
      "Simplify complex explanations",
      "Expand on brief points with relevant details",
    ],
  },
  {
    icon: Layers,
    title: "Multi-Format Support",
    description:
      "Generate content for blogs, social media, emails, ads, and more with format-specific optimization.",
    details: [
      "Blog posts optimized for SEO",
      "Social media posts tailored to each platform",
      "Email subject lines with high open rates",
      "Ad copy designed to convert",
    ],
  },
  {
    icon: Shield,
    title: "Plagiarism-Free Content",
    description:
      "Our AI creates 100% original content that passes plagiarism checks and maintains your brand voice.",
    details: [
      "Built-in plagiarism detection",
      "Original content generation",
      "Citation and reference management",
      "Brand voice consistency across all content",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Powerful <span className="gradient-text">Features</span>
            </h1>
            <p className="mb-12 text-xl text-muted-foreground">
              Discover how AIWriter can transform your content creation process with these powerful features.
            </p>
          </div>
        </div>
      </section>

      <FeaturesGrid />

      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Detailed <span className="gradient-text">Feature Breakdown</span>
            </h2>
            <p className="mb-12 text-xl text-muted-foreground">
              Learn more about each feature and how it can help you create better content faster.
            </p>
          </div>

          <div className="space-y-16">
            {detailedFeatures.map((feature, index) => (
              <div
                key={index}
                className="glass flex flex-col rounded-xl p-8 md:flex-row md:items-start md:gap-8"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 md:mb-0">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>
                  <p className="mb-6 text-lg text-muted-foreground">{feature.description}</p>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
