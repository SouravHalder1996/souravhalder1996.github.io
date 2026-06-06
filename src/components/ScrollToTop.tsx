"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Safely clear trailing hashes from the URL path to reset state
    if (window.location.hash) {
      window.history.pushState(
        {},
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-[#090b0e]/70 backdrop-blur-md shadow-lg shadow-slate-100/50 dark:shadow-none hover:shadow-primary/20 dark:hover:shadow-primary/10 hover:border-primary/50 text-muted-foreground hover:text-primary flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95 group cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <div className="absolute inset-0 rounded-full border border-primary/0 group-hover:border-primary/20 transition-all duration-300 scale-105" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
