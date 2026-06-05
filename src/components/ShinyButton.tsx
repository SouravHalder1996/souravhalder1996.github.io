"use client";

import { motion } from "framer-motion";

export default function ShinyButton({
  text,
  href,
  className = "",
}: {
  text: string;
  href: string;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/10 overflow-hidden cursor-pointer group ${className}`}
    >
      {/* Animated Sweep Shine effect */}
      <motion.span
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2.2,
          ease: "linear",
          repeatDelay: 0.8
        }}
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
      />

      <span className="relative flex items-center gap-2">
        {text}
        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
      </span>
    </motion.a>
  );
}
