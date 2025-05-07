"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define testimonials outside the component to ensure they're consistent
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    content:
      "This platform has completely transformed our content strategy. We're producing twice the content in half the time, and the quality is consistently excellent.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Content Creator",
    company: "CreativeMinds",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    content:
      "As a solo content creator, this tool has been a game-changer. It helps me brainstorm ideas, overcome writer's block, and maintain a consistent publishing schedule.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "SEO Specialist",
    company: "GrowthHackers",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    content:
      "The SEO-optimized content this platform generates has helped us increase our organic traffic by 150% in just three months. Absolutely worth the investment.",
  },
];

// Pre-generate fixed particle positions to avoid hydration mismatches
const particlePositions = Array(20)
  .fill(0)
  .map((_, i) => ({
    top: `${Math.floor(i * 5)}%`,
    left: `${Math.floor(60 + (i % 4) * 10)}%`,
  }));

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(nextTestimonial, 5000);
  }, [nextTestimonial]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [startAutoPlay]);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {particlePositions.map((pos, index) => (
          <motion.div
            key={index}
            className="absolute h-1 w-1"
            style={{
              top: pos.top,
              left: pos.left,
            }}
            animate={{
              y: [0, 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + (index % 2),
              repeat: Infinity,
              delay: index * 0.1,
            }}
          >
            <div
              className="absolute h-1 w-1 rounded-full bg-primary/30"
              style={{
                top: pos.top,
                left: pos.left,
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            What Our <span className="gradient-text">Users</span> Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their content
            creation process
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="testimonial-slider overflow-hidden">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="glass p-8 rounded-xl"
              >
                <div className="flex items-start gap-6">
                  <div className="hidden md:block flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={testimonials[activeIndex].avatar}
                        alt={testimonials[activeIndex].name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-lg mb-6">
                      {testimonials[activeIndex].content}
                    </p>
                    <div className="flex items-center">
                      <div className="md:hidden mr-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={testimonials[activeIndex].avatar}
                            alt={testimonials[activeIndex].name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold">
                          {testimonials[activeIndex].name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[activeIndex].role},{" "}
                          {testimonials[activeIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center mt-8 gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === index ? "bg-primary w-6" : "bg-primary/30"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
