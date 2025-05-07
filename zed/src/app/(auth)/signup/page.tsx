import { SignupForm } from "@/components/signup-form";
import { CheckCircle } from "lucide-react";

const benefits = [
  "14-day free trial with full access to all features",
  "No credit card required to start",
  "5,000 words included in the free trial",
  "Cancel anytime with no obligations",
  "Dedicated support during your trial",
  "Access to all content types and templates",
];

export default function SignupPage() {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Start Your <span className="gradient-text">Free Trial</span> Today
            </h1>
            <p className="mb-12 text-xl text-muted-foreground">
              Experience the power of AIWriter with our 14-day free trial. No credit card required.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="glass rounded-xl p-8">
                <h2 className="mb-6 text-2xl font-bold">Free Trial Benefits</h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-3 h-6 w-6 flex-shrink-0 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 glass rounded-xl p-8">
                <h2 className="mb-6 text-2xl font-bold">Why Choose AIWriter?</h2>
                <p className="mb-4">
                  AIWriter is the leading AI-powered writing assistant that helps you create better content faster. Our advanced AI technology understands your brand voice and creates content that resonates with your audience.
                </p>
                <p>
                  With AIWriter, you can generate blog posts, social media content, email newsletters, and more in seconds. Join thousands of satisfied users who are saving time and creating better content with AIWriter.
                </p>
              </div>
            </div>

            <div>
              <SignupForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
