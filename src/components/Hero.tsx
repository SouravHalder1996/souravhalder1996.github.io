"use client";

import { motion } from "framer-motion";
import GridBackground from "./GridBackground";
import FlipWords from "./FlipWords";
import ShinyButton from "./ShinyButton";
import Image from "next/image";
import { FileText } from "lucide-react";

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

export default function Hero() {
  const words = [
    "I architect scalable cloud solutions.",
    "I build robust data pipelines.",
    "I train machine learning models.",
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center py-28 lg:py-36"
    >
      <GridBackground />

      <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left Column - Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col items-start gap-8 text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Available for opportunities
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-foreground">
            Hi, I'm <br />
            <span className="bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">
              Sourav Halder
            </span>
          </h1>

          {/* Rotating Role Text */}
          <div className="h-20 sm:h-16 flex items-center">
            <FlipWords 
              words={words} 
              className="text-xl sm:text-3xl text-muted-foreground font-medium"
              duration={3000}
            />
          </div>

          {/* CTA Buttons & Social Links */}
          <div className="flex flex-wrap items-center gap-6 mt-2">
            <div className="flex flex-wrap gap-4">
              <ShinyButton text="Let's Talk" href="#contact" />
              <a 
                href="#projects" 
                className="px-6 py-3 rounded-md border border-border bg-card/40 backdrop-blur-sm text-foreground font-semibold hover:bg-accent/80 transition-all active:scale-95 duration-200"
              >
                View Work
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-px bg-border hidden sm:block" /> {/* divider line */}
              
              <a
                href="https://linkedin.com/in/sourav--halder"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-card/40 hover:bg-accent hover:text-primary border border-border flex items-center justify-center text-muted-foreground hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="https://github.com/SouravHalder1996"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-card/40 hover:bg-accent hover:text-primary border border-border flex items-center justify-center text-muted-foreground hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="/Sourav_Halder_v5.pdf"
                download="Sourav_Halder_Resume.pdf"
                className="w-11 h-11 rounded-lg bg-card/40 hover:bg-accent hover:text-primary border border-border flex items-center justify-center text-muted-foreground hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title="Download Resume"
              >
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Avatar & Orbiting Skills */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center h-[540px] relative select-none"
        >
          {/* Center Avatar Container */}
          <div className="relative w-80 h-80 rounded-full border border-border bg-card/30 backdrop-blur-md shadow-2xl flex items-center justify-center p-2 group">
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
          </div>

          {/* Orbiting skill badges */}
          {orbitCards.map((card, index) => {
            // Calculate coordinates for circle positioning
            const radius = 220; // Distance from center in px (expanded for larger avatar)
            const rad = (card.angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <motion.div
                key={card.alt}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: 0.4 + index * 0.1, type: "spring", stiffness: 150 },
                  scale: { delay: 0.4 + index * 0.1, type: "spring", stiffness: 150 },
                  y: {
                    repeat: Infinity,
                    duration: 3 + index * 0.5,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }
                }}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px - 32px)`,
                  top: `calc(50% + ${y}px - 32px)`,
                }}
                className="w-16 h-16 rounded-xl border border-border bg-card/85 backdrop-blur-sm shadow-md flex items-center justify-center p-3 hover:border-primary/50 transition-colors"
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={card.icon}
                    alt={card.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
