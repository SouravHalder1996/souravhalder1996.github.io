"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Home, User, Briefcase, GraduationCap, Code, Folder, Award, Mail, Copy, FileText, Moon, Sun, ExternalLink, Download } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface CommandItem {
  id: string;
  name: string;
  category: "Navigation" | "Actions" | "Socials";
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar offset
      const targetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  const handleToggleTheme = () => {
    const themeBtn = document.querySelector('button[aria-label="Toggle theme"]') as HTMLButtonElement | null;
    if (themeBtn) {
      themeBtn.click();
    } else {
      const root = window.document.documentElement;
      if (root.classList.contains("dark")) {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    { id: "nav-home", name: "Go to Home", category: "Navigation", icon: <Home className="w-4 h-4" />, action: () => handleScrollTo("home") },
    { id: "nav-about", name: "Go to About", category: "Navigation", icon: <User className="w-4 h-4" />, action: () => handleScrollTo("about") },
    { id: "nav-experience", name: "Go to Experience", category: "Navigation", icon: <Briefcase className="w-4 h-4" />, action: () => handleScrollTo("experience") },
    { id: "nav-education", name: "Go to Education", category: "Navigation", icon: <GraduationCap className="w-4 h-4" />, action: () => handleScrollTo("education") },
    { id: "nav-skills", name: "Go to Skills", category: "Navigation", icon: <Code className="w-4 h-4" />, action: () => handleScrollTo("skills") },
    { id: "nav-projects", name: "Go to Projects", category: "Navigation", icon: <Folder className="w-4 h-4" />, action: () => handleScrollTo("projects") },
    { id: "nav-credentials", name: "Go to Credentials & Certifications", category: "Navigation", icon: <Award className="w-4 h-4" />, action: () => handleScrollTo("credentials") },
    { id: "nav-contact", name: "Go to Contact", category: "Navigation", icon: <Mail className="w-4 h-4" />, action: () => handleScrollTo("contact") },
    
    // Actions
    { id: "act-copy-email", name: "Copy Email Address", category: "Actions", icon: <Copy className="w-4 h-4" />, action: () => handleCopy("halder.sourav1996@gmail.com", "Email copied!") },
    { id: "act-copy-phone", name: "Copy Phone Number", category: "Actions", icon: <Copy className="w-4 h-4" />, action: () => handleCopy("+918777893442", "Phone copied!") },
    { id: "act-download-cv", name: "Download Resume PDF", category: "Actions", icon: <Download className="w-4 h-4" />, action: () => {
      const link = document.createElement("a");
      link.href = "/Sourav_Halder_v5.pdf";
      link.download = "Sourav_Halder_Resume.pdf";
      link.click();
    }},
    { id: "act-toggle-theme", name: "Toggle Theme (Light / Dark)", category: "Actions", icon: <Sun className="w-4 h-4 dark:hidden" />, action: handleToggleTheme },
    
    // Socials
    { id: "soc-linkedin", name: "Open LinkedIn Profile", category: "Socials", icon: <ExternalLink className="w-4 h-4" />, action: () => window.open("https://linkedin.com/in/sourav--halder", "_blank") },
    { id: "soc-github", name: "Open GitHub Profile", category: "Socials", icon: <ExternalLink className="w-4 h-4" />, action: () => window.open("https://github.com/SouravHalder1996", "_blank") }
  ];

  // Filter commands based on search query
  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Trigger keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen to custom open triggers
  useEffect(() => {
    const handleOpenTrigger = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-command-palette", handleOpenTrigger);
    return () => window.removeEventListener("open-command-palette", handleOpenTrigger);
  }, []);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Adjust selected index bounds when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Handle active command key actions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((idx) => (idx + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((idx) => (idx - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  // Keep active index visible in scrolling list
  useEffect(() => {
    const activeEl = listRef.current?.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4">
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"
          />

          {/* Palette Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-lg border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-card/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Top Search Bar */}
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or navigate..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-sm py-4 bg-transparent text-foreground placeholder-muted-foreground/60 outline-none border-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] font-mono border border-border bg-slate-50 dark:bg-slate-900 px-1.5 py-0.5 rounded text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* List items */}
            <div ref={listRef} className="max-h-[320px] overflow-y-auto p-2 space-y-1 select-none">
              {copiedText && (
                <div className="text-center py-2 px-3 mb-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-mono font-bold animate-pulse">
                  {copiedText}
                </div>
              )}

              {filteredCommands.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground font-mono">
                  No commands found.
                </div>
              ) : (
                // Grouping items manually for rendering
                ["Navigation", "Actions", "Socials"].map((cat) => {
                  const items = filteredCommands.filter((c) => c.category === cat);
                  if (items.length === 0) return null;

                  return (
                    <div key={cat} className="space-y-1">
                      <div className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest text-primary uppercase leading-none">
                        {cat}
                      </div>

                      {items.map((cmd) => {
                        // Find the index of this item in the global filtered list
                        const globalIndex = filteredCommands.findIndex((c) => c.id === cmd.id);
                        const isSelected = selectedIndex === globalIndex;

                        return (
                          <div
                            key={cmd.id}
                            data-active={isSelected}
                            onClick={cmd.action}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-150 ${
                              isSelected
                                ? "bg-slate-100 dark:bg-slate-900 text-foreground font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-1.5 rounded-lg border ${
                                isSelected ? "border-primary/30 text-primary" : "border-border"
                              }`}>
                                {cmd.icon}
                              </div>
                              <span className="text-sm">{cmd.name}</span>
                            </div>
                            <span className="text-[10px] font-mono opacity-50">
                              {isSelected ? "⏎ Enter" : ""}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom help indicator bar */}
            <div className="border-t border-border bg-slate-50/50 dark:bg-slate-900/30 px-4 py-2 flex items-center justify-between text-[9px] font-mono text-muted-foreground/60 select-none">
              <span>↑↓ to navigate · enter to select</span>
              <span>cmd+k or ctrl+k to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
