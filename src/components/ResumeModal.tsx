"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Printer,
  ExternalLink,
  X,
  CheckCircle2,
  Mail,
  Maximize2,
  Minimize2,
} from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export function openResumeModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-resume-modal"));
  }
}

export function closeResumeModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("close-resume-modal"));
  }
}

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsFullscreen(false);
  }, []);

  // Listen for custom events and Escape key
  useEffect(() => {
    window.addEventListener("open-resume-modal", handleOpen);
    window.addEventListener("close-resume-modal", handleClose);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-resume-modal", handleOpen);
      window.removeEventListener("close-resume-modal", handleClose);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleOpen, handleClose]);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.print();
      } catch {
        window.open("/Sourav_Halder_Resume.pdf", "_blank");
      }
    } else {
      window.open("/Sourav_Halder_Resume.pdf", "_blank");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 select-none overflow-hidden">
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container with Buttery-Smooth Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, opacity" }}
            className={`relative z-10 w-full flex flex-col bg-card/95 border border-border shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl ${
              isFullscreen
                ? "h-full max-w-full rounded-none"
                : "max-w-5xl h-[92vh] sm:h-[88vh]"
            }`}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/80 bg-muted/40 backdrop-blur-md">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary flex-shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-bold font-mono text-foreground truncate">
                      Sourav_Halder_Resume.pdf
                    </h2>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified CV
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground hidden sm:block truncate">
                    Data Scientist & AI/ML Engineer · AWS & Databricks Certified
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Print Button */}
                <button
                  onClick={handlePrint}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-accent text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Print Document"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                {/* Open in Tab */}
                <a
                  href="/Sourav_Halder_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-accent text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Tab</span>
                </a>

                {/* Direct Download Button */}
                <a
                  href="/Sourav_Halder_Resume.pdf"
                  download="Sourav_Halder_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-mono font-bold shadow-sm transition-transform hover:scale-105 active:scale-95"
                  title="Download Resume PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>

                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden sm:inline-flex w-8 h-8 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg border border-border bg-background hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 flex items-center justify-center text-muted-foreground transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body */}
            <div className="relative flex-1 w-full bg-slate-900/10 dark:bg-slate-950/40 overflow-hidden">
              {!isIframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/60 backdrop-blur-sm z-10 transition-opacity duration-300">
                  <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono text-muted-foreground">
                    Loading PDF preview...
                  </span>
                </div>
              )}

              <iframe
                ref={iframeRef}
                src="/Sourav_Halder_Resume.pdf#toolbar=1&navpanes=0&view=FitH"
                title="Sourav Halder Resume PDF"
                onLoad={() => setIsIframeLoaded(true)}
                className={`w-full h-full border-0 block transition-opacity duration-300 ${
                  isIframeLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Clean, Minimal Footer Without Highlights */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 border-t border-border/80 bg-muted/30 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-muted-foreground font-mono">
                  Curriculum Vitae · PDF Format
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-xs">
                <a
                  href="mailto:halder.sourav1996@gmail.com"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">halder.sourav1996@gmail.com</span>
                </a>
                <span className="text-border hidden md:inline">|</span>
                <a
                  href="https://linkedin.com/in/sourav--halder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">LinkedIn</span>
                </a>
                <span className="text-border hidden md:inline">|</span>
                <a
                  href="https://github.com/SouravHalder1996"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
