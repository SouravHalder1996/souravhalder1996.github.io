"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import NeuralBackground from "./NeuralBackground";
import FlipWords from "./FlipWords";
import ShinyButton from "./ShinyButton";
import Image from "next/image";
import { FileText, Bot, Sparkles, ArrowRight, ImageIcon } from "lucide-react";

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

const orbitCards = [
  { icon: "/images/icons/aws.png", alt: "AWS Certified", angle: -90 },
  { icon: "/images/icons/brain.png", alt: "Data Science", angle: -18 },
  { icon: "/images/icons/deep-learning.png", alt: "Deep Learning", angle: 54 },
  { icon: "/images/icons/code.png", alt: "Development", angle: 126 },
  { icon: "/images/icons/api.png", alt: "API Development", angle: 198 },
];

function OrbitCard({ card, index }: { card: typeof orbitCards[0]; index: number }) {
  const [hasError, setHasError] = useState(false);
  const [radius, setRadius] = useState(220);

  useEffect(() => {
    const updateRadius = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 400) {
          setRadius(118);
        } else if (window.innerWidth < 640) {
          setRadius(135);
        } else if (window.innerWidth < 1024) {
          setRadius(175);
        } else {
          setRadius(220);
        }
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const rad = (card.angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
      className="-translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
    >
      <motion.div
        key={card.alt}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 0.1 + index * 0.05, duration: 0.3, ease: "easeOut" },
          scale: { delay: 0.1 + index * 0.05, type: "spring", stiffness: 350, damping: 20 },
          y: {
            repeat: Infinity,
            duration: 3 + index * 0.4,
            ease: "easeInOut",
            delay: index * 0.2,
          },
        }}
        className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl border border-border/80 bg-card/90 backdrop-blur-md shadow-lg flex items-center justify-center p-2 xs:p-2.5 sm:p-3 hover:border-primary/60 hover:scale-110 transition-all cursor-pointer group"
        title={card.alt}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {!hasError ? (
            <Image
              src={card.icon}
              alt={card.alt}
              fill
              loading="lazy"
              className="object-contain transition-transform duration-300 group-hover:scale-110"
              onError={() => setHasError(true)}
            />
          ) : (
            <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const words = [
    "I build Agentic AI & n8n automations.",
    "I train Machine Learning models.",
    "I build RAG-based chatbots.",
    "I architect scalable cloud infrastructure.",
  ];

  // 3D Avatar Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), { stiffness: 200, damping: 25 });

  const handleAvatarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleAvatarMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const triggerAiCopilot = () => {
    window.dispatchEvent(new CustomEvent("open-ai-copilot"));
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      <NeuralBackground />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-24 items-center">
        {/* Left Column - Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col items-start gap-6 sm:gap-8 text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-card/70 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Available for opportunities
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-foreground">
            Hi, I&apos;m <br />
            <span className="bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">
              Sourav Halder
            </span>
          </h1>

          {/* Rotating Role Text */}
          <div className="h-16 sm:h-14 flex items-center w-full">
            <FlipWords 
              words={words} 
              className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium"
              duration={3000}
            />
          </div>

          {/* CTA Buttons & Social Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <ShinyButton text="Let's Talk" href="#contact" />
              <a 
                href="#projects" 
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-md border border-border bg-card/40 backdrop-blur-sm text-foreground font-semibold text-sm sm:text-base hover:bg-accent/80 transition-all active:scale-95 duration-200"
              >
                View Work
              </a>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="h-8 w-px bg-border hidden sm:block" /> {/* divider line */}
              
              <a
                href="https://linkedin.com/in/sourav--halder"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-card/40 hover:bg-accent hover:text-primary border border-border flex items-center justify-center text-muted-foreground hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <a
                href="https://github.com/SouravHalder1996"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-card/40 hover:bg-accent hover:text-primary border border-border flex items-center justify-center text-muted-foreground hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title="GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-resume-modal"))}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-card/40 hover:bg-accent hover:text-primary border border-border flex items-center justify-center text-muted-foreground hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title="View & Download Resume"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column - 3D Tilt Avatar & Orbiting Skills */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseMove={handleAvatarMouseMove}
          onMouseLeave={handleAvatarMouseLeave}
          style={{
            perspective: 1000,
          }}
          className="lg:col-span-5 flex justify-center items-center h-[340px] xs:h-[370px] sm:h-[440px] md:h-[480px] lg:h-[540px] relative select-none mb-6 sm:mb-0"
        >
          {/* 3D Tilting Center Container */}
          <motion.div 
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-80 lg:h-80 rounded-full border border-border/80 bg-card/40 backdrop-blur-md shadow-2xl flex items-center justify-center p-1.5 sm:p-2 group transition-shadow duration-300 hover:shadow-teal-500/10"
          >
            {/* Outer Accent Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/10 to-sky-500/10 opacity-70 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            
            {/* Inner avatar circle */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-muted">
              <Image 
                src="/images/avatar.png"
                alt="Sourav Halder"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Orbiting skill badges with spring float */}
          {orbitCards.map((card, index) => (
            <OrbitCard key={card.alt} card={card} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Interactive AI Prompt Trigger Pill at Bottom of Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-8 sm:mt-12 z-20 px-4 max-w-full"
      >
        <button
          onClick={triggerAiCopilot}
          className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-teal-500/30 bg-card/70 hover:bg-card hover:border-teal-500/60 shadow-lg shadow-teal-500/5 backdrop-blur-md transition-all duration-300 text-xs sm:text-sm text-foreground cursor-pointer hover:scale-[1.02] active:scale-[0.98] max-w-full"
        >
          <div className="flex items-center gap-1.5 text-teal-400 font-bold flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400 animate-pulse" />
            <span>Ask AI:</span>
          </div>
          <span className="text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-[190px] xs:max-w-[280px] sm:max-w-none text-left">
            Ask about AI/ML, Data Science, Agentic AI, RAG & Cloud Architecture
          </span>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
        </button>
      </motion.div>
    </section>
  );
}

