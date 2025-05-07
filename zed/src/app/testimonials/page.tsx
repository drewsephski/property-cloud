import Image from "next/image";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { Quote, Star } from "lucide-react";

const additionalTestimonials = [
  {
    quote:
      "AIWriter has completely transformed our content creation process. We're producing twice as much content in half the time, and the quality is consistently excellent.",
    author: "Sarah Johnson",
    role: "Content Manager at TechCorp",
    avatar: "/images/avatar-1.svg",
    rating: 5,
  },
  {
    quote:
      "As a solo entrepreneur, AIWriter has been a game-changer for me. It's like having a professional copywriter on my team without the hefty price tag.",
    author: "Michael Chen",
    role: "Founder of GrowthHackers",
    avatar: "/images/avatar-2.svg",
    rating: 5,
  },
  {
    quote:
      "The smart rewrites feature is incredible. It maintains my brand voice while making my content more engaging and effective. My email open rates have increased by 35%!",
    author: "Emily Rodriguez",
    role: "Marketing Director at SaaS Solutions",
    avatar: "/images/avatar-3.svg",
    rating: 5,
  },
  {
    quote:
      "I was skeptical about AI writing tools, but AIWriter has exceeded all my expectations. It's intuitive, powerful, and produces content that genuinely connects with our audience.",
    author: "David Kim",
    role: "Digital Strategist at CreativeAgency",
    avatar: "/images/avatar-4.svg",
    rating: 4,
  },
  {
    quote:
      "We've integrated AIWriter into our content workflow, and it's been a massive productivity boost. Our team can focus on strategy while AIWriter handles the heavy lifting of content creation.",
    author: "Jessica Patel",
    role: "Content Lead at E-commerce Plus",
    avatar: "/images/avatar-5.svg",
    rating: 5,
  },
  {
    quote:
      "The quality of content AIWriter produces is remarkable. It's hard to believe it's AI-generated. Our readers love the content, and our engagement metrics have never been better.",
    author: "Robert Wilson",
    role: "Editor-in-Chief at Digital Daily",
    avatar: "/images/avatar-1.svg",
    rating: 5,
  },
  {
    quote:
      "AIWriter has helped us scale our content marketing efforts without sacrificing quality. We've been able to expand into new markets and reach new audiences with ease.",
    author: "Lisa Thompson",
    role: "Growth Manager at ScaleUp Inc",
    avatar: "/images/avatar-3.svg",
    rating: 4,
  },
  {
    quote:
      "The time savings alone make AIWriter worth every penny. What used to take days now takes hours, and the quality is even better than before.",
    author: "James Lee",
    role: "Content Creator at CreativeCo",
    avatar: "/images/avatar-2.svg",
    rating: 5,
  },
];

const caseStudies = [
  {
    company: "TechCorp",
    logo: "/images/techcorp-logo.svg",
    title: "How TechCorp Increased Content Output by 200%",
    description:
      "TechCorp was struggling to keep up with their content calendar. After implementing AIWriter, they were able to triple their content output while maintaining high quality.",
    results: [
      "200% increase in content production",
      "35% increase in organic traffic",
      "45% reduction in content creation costs",
    ],
  },
  {
    company: "E-commerce Plus",
    logo: "/images/ecommerce-logo.svg",
    title: "E-commerce Plus Boosts Conversion Rates with Better Product Descriptions",
    description:
      "E-commerce Plus used AIWriter to revamp their product descriptions, resulting in higher conversion rates and improved customer satisfaction.",
    results: [
      "28% increase in conversion rates",
      "40% reduction in product description creation time",
      "15% decrease in return rates due to clearer product information",
    ],
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              What Our <span className="gradient-text">Customers Say</span>
            </h1>
            <p className="mb-12 text-xl text-muted-foreground">
              Join thousands of satisfied users who are creating better content faster with AIWriter.
            </p>
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="mb-12 text-xl text-muted-foreground">
              Read how AIWriter has helped businesses achieve their content goals.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {caseStudies.map((caseStudy, index) => (
              <div
                key={index}
                className="glass rounded-xl p-8"
              >
                <div className="mb-6 h-12">
                  <Image
                    src={caseStudy.logo}
                    alt={caseStudy.company}
                    width={150}
                    height={50}
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
                <h3 className="mb-4 text-2xl font-bold">{caseStudy.title}</h3>
                <p className="mb-6 text-muted-foreground">{caseStudy.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium">Results:</h4>
                  <ul className="space-y-2">
                    {caseStudy.results.map((result, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              More <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="mb-12 text-xl text-muted-foreground">
              Hear from more of our satisfied customers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {additionalTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6"
              >
                <div className="mb-4 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div className="relative mb-6">
                  <Quote className="absolute -left-1 -top-1 h-6 w-6 text-primary/20" />
                  <p className="pl-4 italic">{testimonial.quote}</p>
                </div>
                <div className="flex items-center">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
