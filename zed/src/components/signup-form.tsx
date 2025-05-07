"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Lock, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { MicroInteraction } from "@/components/aceternity/micro-interaction";
import { GradientButton } from "@/components/aceternity/gradient-button";
import { AnimatedBackground } from "@/components/aceternity/animated-background";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    passwordConfirm?: string;
  }>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculate password strength
  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

    return strength;
  };

  // Update password strength when password changes
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const validateForm = (): boolean => {
    const errors: {
      email?: string;
      password?: string;
      passwordConfirm?: string;
    } = {};
    let isValid = true;

    // Email validation
    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Password confirmation validation
    if (password !== passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, always succeed
      setIsSuccess(true);
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setValidationErrors({});
    } catch (_error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signup" className="py-20 relative overflow-hidden">
      <AnimatedBackground
        className="absolute inset-0 z-0"
        particleCount={25}
        particleColor="rgba(101, 64, 240, 0.1)"
        particleSize={3}
      >
        <div />
      </AnimatedBackground>
      <Spotlight className="container relative z-10 mx-auto max-w-6xl px-4" spotlightColor="rgba(101, 64, 240, 0.1)">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Start Your <span className="gradient-text">Free Trial</span> Today
          </motion.h2>
          <motion.p
            className="mb-12 text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            No credit card required. Get full access to all features for 14 days.
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="glass rounded-xl p-8 relative overflow-hidden"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(101, 64, 240, 0.25)" }}
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6, times: [0, 0.6, 1] }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </motion.div>
                  </motion.div>
                  <motion.h3
                    className="mb-2 text-2xl font-bold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    Success!
                  </motion.h3>
                  <motion.p
                    className="mb-6 text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    Your free trial has been activated. Check your email for login instructions.
                  </motion.p>
                  <MicroInteraction hoverEffect="scale" clickEffect="ripple">
                    <GradientButton
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="w-full rounded-full px-6 py-3 font-medium text-primary-foreground"
                      gradientFrom="from-primary"
                      gradientTo="to-accent"
                    >
                      Start Another Trial
                    </GradientButton>
                  </MicroInteraction>
                </motion.div>
              ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationErrors.email) {
                        setValidationErrors({...validationErrors, email: undefined});
                      }
                    }}
                    className={`w-full rounded-lg border ${validationErrors.email ? 'border-destructive' : 'border-border'} bg-background/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
                    placeholder="you@example.com"
                    aria-invalid={validationErrors.email ? "true" : "false"}
                    aria-describedby={validationErrors.email ? "email-error" : undefined}
                    required
                  />
                  {validationErrors.email && (
                    <p id="email-error" className="mt-1 text-xs text-destructive">
                      {validationErrors.email}
                    </p>
                  )}
                </motion.div>
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label htmlFor="password" className="mb-2 block text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (validationErrors.password) {
                          setValidationErrors({...validationErrors, password: undefined});
                        }
                      }}
                      className={`w-full rounded-lg border ${validationErrors.password ? 'border-destructive' : 'border-border'} bg-background/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
                      placeholder="••••••••"
                      aria-invalid={validationErrors.password ? "true" : "false"}
                      aria-describedby={validationErrors.password ? "password-error" : "password-strength"}
                      required
                      minLength={8}
                    />
                  </div>
                  {validationErrors.password ? (
                    <p id="password-error" className="mt-1 text-xs text-destructive">
                      {validationErrors.password}
                    </p>
                  ) : (
                    <div id="password-strength" className="mt-2 flex items-center gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${
                            i < passwordStrength
                              ? i < 2
                                ? 'bg-orange-500'
                                : 'bg-primary'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {passwordStrength === 0 && "Enter password"}
                        {passwordStrength === 1 && "Weak"}
                        {passwordStrength === 2 && "Fair"}
                        {passwordStrength === 3 && "Good"}
                        {passwordStrength === 4 && "Strong"}
                      </span>
                    </div>
                  )}

                  <label htmlFor="passwordConfirm" className="mb-2 mt-4 block text-sm font-medium">
                    Confirm Password
                  </label>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                      if (validationErrors.passwordConfirm) {
                        setValidationErrors({...validationErrors, passwordConfirm: undefined});
                      }
                    }}
                    className={`w-full rounded-lg border ${validationErrors.passwordConfirm ? 'border-destructive' : 'border-border'} bg-background/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
                    placeholder="••••••••"
                    aria-invalid={validationErrors.passwordConfirm ? "true" : "false"}
                    aria-describedby={validationErrors.passwordConfirm ? "passwordConfirm-error" : undefined}
                    required
                  />
                  {validationErrors.passwordConfirm && (
                    <p id="passwordConfirm-error" className="mt-1 text-xs text-destructive">
                      {validationErrors.passwordConfirm}
                    </p>
                  )}
                </motion.div>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      className="mb-4 text-sm text-destructive"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
                <MicroInteraction hoverEffect="glow" clickEffect="ripple">
                  <GradientButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full px-6 py-3 font-medium text-primary-foreground disabled:opacity-70"
                    gradientFrom="from-primary"
                    gradientTo="to-accent"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        Creating Account...
                      </motion.div>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Start Free Trial
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </GradientButton>
                </MicroInteraction>
                <motion.div
                  className="mt-4 flex items-center justify-center text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Lock className="mr-1 h-3 w-3" />
                  <span>Your data is secure and will never be shared</span>
                </motion.div>
              </motion.form>
            )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="mt-8 grid grid-cols-2 gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <MicroInteraction hoverEffect="scale">
              <motion.div
                className="rounded-lg border border-border p-4 glass-hover"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(101, 64, 240, 0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <motion.p
                  className="text-2xl font-bold gradient-text"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                >
                  14 Days
                </motion.p>
                <p className="text-sm text-muted-foreground">Free Trial</p>
              </motion.div>
            </MicroInteraction>

            <MicroInteraction hoverEffect="scale">
              <motion.div
                className="rounded-lg border border-border p-4 glass-hover"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(101, 64, 240, 0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <motion.p
                  className="text-2xl font-bold gradient-text"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "mirror" }}
                >
                  No Credit Card
                </motion.p>
                <p className="text-sm text-muted-foreground">Required</p>
              </motion.div>
            </MicroInteraction>
          </motion.div>
        </motion.div>
      </Spotlight>
    </section>
  );
}
