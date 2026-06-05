"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Credentials", href: "#credentials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active section detection
      const sections = navItems.map((item) =>
        document.getElementById(item.href.replace("#", ""))
      );

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].href.replace("#", ""));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-50 origin-[0%] pointer-events-none"
        style={{ scaleX }}
      />
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center py-4 px-6`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className={`flex items-center justify-between border border-slate-200/80 dark:border-border bg-white/80 dark:bg-card/40 backdrop-blur-md transition-all duration-300 ${
            isScrolled
              ? "w-full max-w-6xl rounded-full px-6 py-1.5 shadow-lg shadow-black/10 border-primary/20"
              : "w-full rounded-none border-x-0 border-t-0 bg-transparent backdrop-blur-none px-6 py-3"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            className="text-xl font-black tracking-wider text-foreground hover:text-primary transition-colors"
          >
            SH
          </a>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center transition-all duration-300 ${
            isScrolled ? "gap-2 xl:gap-4" : "gap-4 xl:gap-6"
          }`}>
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative font-medium transition-all duration-300 rounded-full hover:text-foreground whitespace-nowrap ${
                    isScrolled ? "text-xs px-2.5 py-1" : "text-sm px-3.5 py-1.5"
                  } ${
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-secondary rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Utilities (Theme + Cmd+K + Mobile Menu Icon) */}
          <div className="flex items-center gap-3">
            {/* Quick Command Palette visual pill */}
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-command-palette"));
              }}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-muted/50 text-[10px] text-muted-foreground font-mono hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
              title="Open Command Palette"
            >
              <Command className="w-3.5 h-3.5" />
              <span>K</span>
            </button>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden items-center justify-center w-9 h-9 rounded-md border border-border bg-card text-foreground hover:bg-accent transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </motion.header>
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[76px] z-40 lg:hidden p-4 bg-card/95 backdrop-blur-lg border-b border-border flex flex-col gap-2 shadow-xl"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full py-2.5 px-4 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-foreground ${
                  activeSection === item.href.replace("#", "")
                    ? "bg-secondary text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
