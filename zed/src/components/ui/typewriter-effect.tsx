"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface TypewriterEffectProps {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: TypewriterEffectProps) => {
  const textIndex = useMotionValue(0);
  const texts = words.map((word) => word.text);

  const baseText = useTransform(textIndex, (latest) => {
    return texts[latest] || "";
  });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => {
    return baseText.get().slice(0, latest);
  });
  const updatedThisRound = useMotionValue(false);

  useEffect(() => {
    animate(count, 60, {
      type: "tween",
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() === false && latest > 0) {
          updatedThisRound.set(true);
        }
      },
      onRepeat() {
        const next = (textIndex.get() + 1) % texts.length;
        textIndex.set(next);
        count.set(0);
        updatedThisRound.set(false);
      },
    });
  }, [count, textIndex, texts.length, updatedThisRound]);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <motion.div className="inline-block">
        {words.map((word, idx) => {
          return (
            <motion.span
              key={word.text}
              className={cn("inline-block", word.className)}
              initial={{ opacity: 0 }}
              animate={{ opacity: textIndex.get() === idx ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span className="inline-block whitespace-pre">
                {displayText}
              </motion.span>
            </motion.span>
          );
        })}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block h-4 w-[2px] rounded-full bg-blue-500",
          cursorClassName
        )}
      />
    </div>
  );
};
