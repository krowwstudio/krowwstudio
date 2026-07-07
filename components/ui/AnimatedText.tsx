"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: "words" | "chars";
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const containerVariants = (stagger: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: 0 },
  },
});

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: "100%", rotateX: -25 },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AnimatedText({
  text,
  className,
  delay = 0,
  mode = "words",
  once = true,
  as: Tag = "p",
}: AnimatedTextProps) {
  const tokens = mode === "words" ? text.split(" ") : text.split("");
  const stagger = mode === "words" ? 0.055 : 0.03;

  return (
    <motion.div
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{ delayChildren: delay }}
    >
      <Tag
        className={cn("flex flex-wrap", mode === "chars" && "overflow-hidden", className)}
        style={{ perspective: "800px" }}
      >
        {tokens.map((token, i) => (
          <motion.span
            key={i}
            variants={mode === "words" ? wordVariants : charVariants}
            className={cn(
              "inline-block",
              mode === "words" && "mr-[0.25em]",
              mode === "chars" && ""
            )}
          >
            {token}
            {mode === "chars" && token === " " ? " " : ""}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
