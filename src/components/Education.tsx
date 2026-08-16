"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Power, ChevronDown, Cpu, Calendar, Shield, Database, GraduationCap } from "lucide-react";
import SectionHeaderDotGrid from "./SectionHeaderDotGrid";

interface BladeData {
  id: string;
  unit: string;
  degree: string;
  field: string;
  institution: string;
  timeline: string;
  grade: string;
  gradeLabel: string;
  gradeColor: string;
  ledColor: string;
  logs: string[];
  cpuLabel: string;
  temp: string;
  ramUsage: boolean[]; // 4 DIMM slot statuses
  description: string;
}

const serverBlades: BladeData[] = [
  {
    id: "mtech",
    unit: "02U // JU_ROBOTICS_NODE",
    degree: "M.Tech",
    field: "Intelligent Automation and Robotics",
    institution: "Jadavpur University",
    timeline: "2018 - 2021",
    grade: "90.36%",
    gradeLabel: "GRAD_SCORE",
    gradeColor: "text-amber-500 dark:text-amber-400 border-amber-500/30 text-shadow-amber",
    ledColor: "bg-emerald-500 shadow-emerald-500/50",
    cpuLabel: "JU-ROBOT-CORE V4",
    temp: "42°C",
    ramUsage: [true, true, false, false],
    logs: [
      "[OK] BOOT // JU_ROBOTICS_CORE_V4",
      "[OK] INTELLIGENT_AUTOMATION_CORE ACTIVE",
      "[OK] CONTROL_SYSTEMS_HOOKS ONLINE",
      "[OK] SYSTEM_RATING: 90.36% (FIRST CLASS WITH DISTINCTION)"
    ],
    description: "Specialized in Intelligent Automation, Robotics, Control Systems, and AI Engineering. Conducted post-graduate research and thesis with First Class Distinction (90.36%)."
  },
  {
    id: "btech",
    unit: "01U // BW_POWER_NODE",
    degree: "B.Tech",
    field: "Electrical Engineering",
    institution: "Brainware Group of Institutions",
    timeline: "2013 - 2017",
    grade: "8.49",
    gradeLabel: "FINAL_CGPA",
    gradeColor: "text-cyan-600 dark:text-cyan-400 border-cyan-500/30 text-shadow-cyan",
    ledColor: "bg-emerald-500 shadow-emerald-500/50",
    cpuLabel: "BW-POWER-GRID V1",
    temp: "37°C",
    ramUsage: [true, false, true, false],
    logs: [
      "[OK] BOOT // EE_POWER_GRID_CORE",
      "[OK] CIRCUIT_INTEGRATION_SOLVER ACTIVE",
      "[OK] WAVEFORM_SYNCHRONIZER STABLE",
      "[OK] TRANSFORMER_CDC_ENGINE STABLE",
      "[OK] SYSTEM_RATING: 8.49 CGPA (FIRST CLASS)"
    ],
    description: "Built foundational engineering principles in circuit analysis, signal structures, control instrumentation, and power distribution systems. Focused on grid automation simulation tools."
  }
];

// Rotating cooling fan widget
const CoolingFan = ({ active }: { active: boolean }) => (
  <div className="flex flex-col items-center justify-center select-none">
    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-950 rounded-full border border-slate-350 dark:border-slate-800 flex items-center justify-center relative overflow-hidden shadow-inner">
      <svg
        viewBox="0 0 100 100"
        className={`w-8 h-8 text-slate-400 dark:text-muted-foreground/45 transition-all ${
          active ? "animate-[spin_0.3s_linear_infinite] text-primary/70" : "animate-[spin_3s_linear_infinite] opacity-40"
        }`}
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="50" cy="50" r="10" fill="currentColor" />
        {/* Fan blades */}
        <path d="M50,10 C56,25 56,40 50,50 C44,40 44,25 50,10 Z" fill="currentColor" />
        <path d="M90,50 C75,56 60,56 50,50 C60,44 75,44 90,50 Z" fill="currentColor" />
        <path d="M50,90 C44,75 44,60 50,50 C56,60 56,75 50,90 Z" fill="currentColor" />
        <path d="M10,50 C25,44 40,44 50,50 C40,56 25,56 10,50 Z" fill="currentColor" />
      </svg>
      {/* Grill overlay */}
      <div className="absolute inset-0 bg-transparent rounded-full border-t border-slate-450/20 dark:border-slate-700/30 border-l border-slate-450/20 dark:border-slate-700/30" />
    </div>
    <span className="text-[8px] font-mono text-slate-500 dark:text-muted-foreground/60 mt-1 uppercase tracking-widest leading-none">
      {active ? "FAN_HIGH" : "FAN_IDLE"}
    </span>
  </div>
);

// Blinking RJ-45 Ethernet Port
const EthernetPort = () => {
  const [blinkLeft, setBlinkLeft] = useState(false);
  const [blinkRight, setBlinkRight] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkLeft(Math.random() > 0.4);
      setBlinkRight(Math.random() > 0.6);
    }, 150 + Math.random() * 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="w-8 h-5 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded relative flex items-center justify-center p-0.5">
        {/* Contact pins inside port */}
        <div className="absolute top-0 inset-x-1.5 h-1 flex justify-between">
          <span className="w-[1px] h-full bg-yellow-600 dark:bg-yellow-500/80" />
          <span className="w-[1px] h-full bg-yellow-600 dark:bg-yellow-500/80" />
          <span className="w-[1px] h-full bg-yellow-600 dark:bg-yellow-500/80" />
          <span className="w-[1px] h-full bg-yellow-600 dark:bg-yellow-500/80" />
        </div>
        {/* Release tab slot */}
        <div className="w-4 h-1.5 bg-slate-200 dark:bg-slate-950 border-t border-slate-300 dark:border-slate-800 rounded-b mt-1" />
      </div>
      <div className="flex gap-1.5 mt-1">
        {/* Link LED (Green) */}
        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-75 ${blinkLeft ? "bg-emerald-500 shadow-[0_0_4px_#10b981]" : "bg-emerald-800"}`} />
        {/* Activity LED (Amber) */}
        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-75 ${blinkRight ? "bg-amber-500 shadow-[0_0_4px_#f59e0b]" : "bg-amber-800"}`} />
      </div>
    </div>
  );
};

// Real-time scrolling sparkline graph
const LiveSparkline = () => {
  return (
    <div className="w-24 sm:w-28 h-6 flex items-center flex-shrink-0 select-none overflow-hidden relative">
      <svg viewBox="0 0 120 24" className="w-full h-full text-emerald-600 dark:text-emerald-500 overflow-hidden">
        {/* Sparkline grid line */}
        <line x1="0" y1="12" x2="120" y2="12" stroke="currentColor" strokeWidth="0.5" className="opacity-10" />
        
        {/* Wave 1: Primary scrolling wave */}
        <path
          d="M 0 12 Q 10 4 20 12 T 40 12 T 60 12 T 80 12 T 100 12 T 120 12 T 140 12 T 160 12 T 180 12 T 200 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-80"
          style={{
            animation: "waveScroll 1.6s linear infinite",
            transformBox: "view-box"
          }}
        />

        {/* Wave 2: Secondary overlapping wave for ripple interference */}
        <path
          d="M 0 12 Q 10 20 20 12 T 40 12 T 60 12 T 80 12 T 100 12 T 120 12 T 140 12 T 160 12 T 180 12 T 200 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="opacity-35"
          style={{
            animation: "waveScrollReverse 2.2s linear infinite",
            transformBox: "view-box"
          }}
        />
      </svg>
    </div>
  );
};

export default function Education() {
  const [activeBladeId, setActiveBladeId] = useState<string | null>(null);
  const [livePower, setLivePower] = useState<number>(342);
  const [liveTemp, setLiveTemp] = useState<number>(38);

  // Live telemetry subtle fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setLivePower(338 + Math.floor(Math.random() * 8));
      setLiveTemp(37 + Math.floor(Math.random() * 3));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const toggleBlade = (id: string) => {
    setActiveBladeId(activeBladeId === id ? null : id);
  };

  return (
    <section id="education" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-transparent scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Retro matrix glow styles */}
      <style>{`
        .text-shadow-amber {
          text-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
        }
        .text-shadow-cyan {
          text-shadow: 0 0 8px rgba(34, 211, 238, 0.5);
        }
        .led-blink {
          animation: blink 2.5s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .circuit-bg {
          background-image: radial-gradient(var(--border) 1px, transparent 1px);
          background-size: 16px 16px;
        }
        @keyframes circuitFlow {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        .circuit-line {
          animation: circuitFlow 1.8s linear infinite;
        }
        @keyframes ledBlinkFast {
          0%, 100% { opacity: 1; }
          45% { opacity: 0.15; }
        }
        @keyframes ledBlinkMedium {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes ledBlinkSlow {
          0%, 100% { opacity: 1; }
          60% { opacity: 0.3; }
        }
        .led-hdd { animation: ledBlinkFast 0.4s infinite; }
        .led-sys { animation: ledBlinkSlow 2s infinite; }
        .led-net { animation: ledBlinkMedium 0.8s infinite; }
        
        @keyframes waveScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-40px, 0, 0);
          }
        }
        @keyframes waveScrollReverse {
          0% {
            transform: translate3d(-40px, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="relative z-10 flex flex-col items-start text-left mb-10 sm:mb-16 gap-3">
          <SectionHeaderDotGrid />
          <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200/80 dark:border-border bg-white/90 dark:bg-card/90 shadow-sm backdrop-blur-md text-xs font-semibold text-primary uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground font-heading">
            Education Records
          </h2>
          <p className="relative z-10 max-w-2xl text-muted-foreground text-sm sm:text-base">
            Academic qualifications, specialized engineering domains, and formal credentials.
          </p>
        </div>

        {/* ── Outer Server Rack Enclosure ── */}
        <div className="w-full max-w-4xl mx-auto border-2 sm:border-4 border-slate-350 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 rounded-2xl shadow-[inset_0_4px_12px_rgba(0,0,0,0.15),0_12px_24px_-4px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_4px_12px_rgba(0,0,0,0.65),0_12px_24px_-4px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col p-1 sm:p-2 transition-all duration-300">
          
          {/* 1. Cabinet Ventilation Grill (Top) */}
          <div className="h-5 sm:h-6 w-full bg-slate-200 dark:bg-slate-950 rounded-t-xl border-b border-slate-300 dark:border-slate-850 px-2 sm:px-4 flex items-center justify-around gap-1 sm:gap-1.5 transition-colors duration-300">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-2 sm:w-2.5 h-1.5 sm:h-2 bg-slate-300 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-950 rounded-sm flex-grow shadow-inner transition-colors duration-300" />
            ))}
          </div>

          {/* Cabinet Main Frame (Rails + Slots) */}
          <div className="flex w-full min-h-[300px] border-y border-slate-300 dark:border-slate-950 relative">
            
            {/* Left Rack Mounting Rail */}
            <div className="w-6 sm:w-8 md:w-10 flex-shrink-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 border-r border-slate-300 dark:border-slate-650 flex flex-col justify-around items-center py-4 sm:py-6 select-none border-l border-slate-250 dark:border-slate-900 transition-all duration-300">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1 sm:gap-1.5">
                  <span className="text-[6px] sm:text-[7px] font-mono text-slate-500 dark:text-slate-400 leading-none">U{4 - i}</span>
                  {/* Screw Hole */}
                  <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-slate-350 dark:bg-slate-950 border border-slate-450 dark:border-slate-600/80 relative flex items-center justify-center shadow-inner transition-colors duration-300">
                    {/* Metal Screw Slot */}
                    <div className="w-2 sm:w-2.5 h-0.5 bg-slate-600 dark:bg-slate-400 rotate-45 rounded transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Container: Server Blade Chassis Modules */}
            <div className="flex-grow p-2 sm:p-3 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col gap-3 sm:gap-5 relative transition-colors duration-300">
              
              {/* Telemetry Dashboard Banner (Cabinet Status Info) */}
              <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-855 rounded-xl p-2.5 sm:p-3 font-mono text-[9px] sm:text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-between gap-3 sm:gap-4 shadow-inner relative overflow-hidden select-none transition-colors duration-300">
                
                <div className="flex items-center gap-2 z-10">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">RACK_CABINET_JU-BW // NODE_ONLINE</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 z-10">
                  <div>
                    <span className="text-slate-550 dark:text-slate-600 font-bold uppercase font-mono">Uptime:</span>{" "}
                    <span className="text-slate-900 dark:text-slate-400 font-mono">14,285.4h</span>
                  </div>
                  <div>
                    <span className="text-slate-555 dark:text-slate-600 font-bold uppercase font-mono">Sys_Load:</span>{" "}
                    <span className="text-slate-900 dark:text-slate-400 font-mono">24.5%</span>
                  </div>
                  <div>
                    <span className="text-slate-555 dark:text-slate-600 font-bold uppercase font-mono">Temp:</span>{" "}
                    <span className="text-slate-900 dark:text-slate-400 font-mono">{liveTemp}°C</span>
                  </div>
                  <div>
                    <span className="text-slate-555 dark:text-slate-600 font-bold uppercase font-mono">Power:</span>{" "}
                    <span className="text-emerald-650 dark:text-emerald-500 font-bold font-mono transition-all">{livePower}W</span>
                  </div>
                </div>
              </div>

              {/* Server Blades with slide pullout physics */}
              {serverBlades.map((blade) => {
                const isOpen = activeBladeId === blade.id;
                return (
                  <div
                    key={blade.id}
                    className={`border rounded-lg overflow-hidden transition-all duration-300 relative shadow-inner ${
                      isOpen
                        ? "border-primary bg-white/95 dark:bg-slate-900/40 shadow-lg shadow-primary/10 sm:translate-x-1"
                        : "border-slate-300 dark:border-border/60 bg-white/70 dark:bg-slate-900/10 hover:bg-white/80 dark:hover:bg-slate-900/20 hover:border-primary/30"
                    }`}
                  >
                    {/* Blade Chassis Header faceplate - Grid-aligned for vertical parallel spacing */}
                    <div
                      onClick={() => toggleBlade(blade.id)}
                      className="flex flex-col md:grid md:grid-cols-12 md:items-center p-4 gap-4 cursor-pointer select-none font-mono relative md:min-h-20 md:h-auto md:py-0"
                    >
                      {/* Left side Grab-Handle (chassis ear) */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 border-r border-slate-500 rounded-l hidden md:block" />

                      {/* Column 1: Power, LEDs, Info Text (col-span-6) */}
                      <div className="flex items-center gap-4 z-10 col-span-6 w-full py-1">
                        {/* Pull Latches (Metal grab handles with thumb screws) */}
                        <div className="flex flex-col items-center justify-between py-1 h-14 flex-shrink-0 relative">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-slate-455 via-slate-300 to-slate-500 border border-slate-500 shadow-sm flex items-center justify-center relative">
                            <div className="w-2 h-0.5 bg-slate-600 absolute rounded" />
                            <div className="w-0.5 h-2 bg-slate-600 absolute rounded" />
                          </div>
                          
                          <div className="w-2.5 h-7 rounded bg-gradient-to-b from-slate-400 via-slate-300 to-slate-550 border border-slate-500 shadow flex items-center justify-center flex-shrink-0">
                            <span className="w-0.5 h-4 bg-slate-600 rounded-full" />
                          </div>

                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-slate-455 via-slate-300 to-slate-500 border border-slate-500 shadow-sm flex items-center justify-center relative">
                            <div className="w-2 h-0.5 bg-slate-600 absolute rounded" />
                            <div className="w-0.5 h-2 bg-slate-600 absolute rounded" />
                          </div>
                        </div>

                        {/* Power Switch Switch */}
                        <button
                          aria-label="Chassis Power Indicator"
                          className={`w-7.5 h-7.5 rounded-lg border flex items-center justify-center transition-all flex-shrink-0 ${
                            isOpen
                              ? "border-primary bg-primary/25 text-primary shadow-[0_0_6px_var(--primary)]"
                              : "border-slate-300 dark:border-border/80 bg-slate-100 dark:bg-muted/40 text-muted-foreground"
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* Status blinking indicator array */}
                        <div className="flex gap-1.5 bg-slate-150 dark:bg-black/60 px-2 py-1 rounded border border-slate-300 dark:border-slate-800/40 select-none flex-shrink-0">
                          <div className="flex flex-col items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_4px_#f59e0b] led-hdd" />
                            <span className="text-[5px] text-slate-500 font-bold uppercase mt-0.5 leading-none">HDD</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_#10b981] led-sys" />
                            <span className="text-[5px] text-slate-500 font-bold uppercase mt-0.5 leading-none">SYS</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_4px_#22d3ee] led-net" />
                            <span className="text-[5px] text-slate-500 font-bold uppercase mt-0.5 leading-none">NET</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_#10b981]" />
                            <span className="text-[5px] text-slate-500 font-bold uppercase mt-0.5 leading-none">TMP</span>
                          </div>
                        </div>

                        {/* Node Unit Tags - non-truncating wrapped layout */}
                        <div className="whitespace-normal">
                          <div className="text-[8px] font-bold text-primary tracking-widest leading-none">{blade.unit}</div>
                          <div className="text-xs sm:text-sm font-black text-foreground mt-1 whitespace-normal leading-tight">
                            {blade.degree} // {blade.field}
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5 font-bold leading-normal whitespace-normal">
                            {blade.institution}
                          </div>
                        </div>
                      </div>

                      {/* Hardware faceplate controls grouped on mobile, expanded via md:contents on desktop */}
                      <div className="flex flex-row flex-wrap items-center justify-between gap-3 w-full md:contents border-t border-dashed border-slate-200/60 dark:border-slate-800/40 pt-4 md:pt-0 md:border-none">
                        {/* Column 2: Ethernet Port (col-span-1) */}
                        <div className="flex justify-center md:col-span-1 z-10">
                          <EthernetPort />
                        </div>

                        {/* Column 3: Cooling Fan (col-span-1) */}
                        <div className="flex justify-center md:col-span-1 z-10">
                          <CoolingFan active={isOpen} />
                        </div>

                        {/* Column 4: Retro LCD Grade display - identical fixed size across all racks & slightly shifted right */}
                        <div className="flex justify-center md:col-span-3 md:translate-x-3 z-10">
                          <div className="flex items-center justify-center gap-2 bg-black border border-slate-800 rounded px-2.5 py-1.5 relative shadow-inner flex-shrink-0 select-none h-[34px] w-[148px]">
                            <span className="text-[7.5px] sm:text-[8px] text-slate-400 font-bold uppercase tracking-wider select-none shrink-0">
                              {blade.gradeLabel}:
                            </span>
                            <span className={`text-[10.5px] sm:text-xs font-black tracking-wide leading-none whitespace-nowrap ${blade.gradeColor}`}>
                              [ {blade.grade} ]
                            </span>
                          </div>
                        </div>

                        {/* Column 5: Chevron Arrow (col-span-1) */}
                        <div className="flex justify-center md:col-span-1 md:justify-end z-10 pr-2">
                          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                        </div>
                      </div>

                      {/* Right side Grab-Handle (chassis ear) */}
                      <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 border-l border-slate-500 rounded-r hidden md:block" />
                    </div>

                    {/* ── Pulled-Out Motherboard Tray (Expanded content drawer) ── */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="border-t border-slate-250 dark:border-border/40 overflow-hidden font-mono bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-300 relative select-none"
                        >
                          {/* Drawer Telescoping slide rails (left/right) */}
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 dark:from-slate-700 dark:via-slate-500 dark:to-slate-700 border-r border-slate-350 dark:border-slate-660 hidden sm:block shadow-inner" />
                          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-l from-slate-400 via-slate-300 to-slate-400 dark:from-slate-700 dark:via-slate-500 dark:to-slate-700 border-l border-slate-350 dark:border-slate-660 hidden sm:block shadow-inner" />
                          
                          {/* PCB circuit grid background */}
                          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-emerald-600 dark:bg-emerald-500 circuit-bg pointer-events-none" />

                          <div className="p-5 sm:p-6 lg:p-8 space-y-6 relative max-w-[94%] mx-auto">
                            
                            {/* Header label: Internal Schematic schematic */}
                            <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-950 pb-2 mb-2">
                              <span className="text-[9px] text-emerald-650 dark:text-emerald-500 uppercase tracking-widest font-black flex items-center gap-1.5">
                                <Database className="w-3.5 h-3.5" />
                                NODE_INTERNAL_BOARD_LAYOUT_DIAGNOSTICS
                              </span>
                              <span className="text-[8px] text-slate-500 uppercase">UNIT_VOLTAGE: 1.2V</span>
                            </div>

                            {/* visual board grid (chips setup) */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                          {/* Left Board area: Motherboard components visual */}
                              <div className="md:col-span-6 h-[230px] border border-slate-200 dark:border-emerald-950/80 rounded bg-white dark:bg-slate-950/40 relative shadow-inner overflow-hidden flex-shrink-0">
                                
                                {/* Animated SVG copper traces (absolute behind components) */}
                                <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-60 text-emerald-500/20 dark:text-emerald-500/10">
                                  {/* Trace 1 (CPU to RAM Array) */}
                                  <path d="M 110 50 L 160 50 L 180 35 L 210 35" fill="none" stroke="currentColor" strokeWidth="2" />
                                  <path d="M 110 50 L 160 50 L 180 35 L 210 35" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="6 12" className="circuit-line" />
                                  
                                  {/* Trace 2 (CPU to NVMe Storage) */}
                                  <path d="M 64 100 L 64 125 L 105 160 L 125 160" fill="none" stroke="currentColor" strokeWidth="2" />
                                  <path d="M 64 100 L 64 125 L 105 160 L 125 160" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="6 12" className="circuit-line" />
                                </svg>

                                {/* 1. CPU socket with heat-sink fins */}
                                <div className="absolute left-[6%] top-[10%] w-24 h-24 sm:w-26 sm:h-26 border border-slate-300 dark:border-emerald-500/30 bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center p-1.5 sm:p-2 shadow-md z-10 flex-shrink-0">
                                  {/* Pin Grid Outlines */}
                                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-slate-400 dark:border-emerald-500/60" />
                                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-slate-400 dark:border-emerald-500/60" />
                                  
                                  {/* Heat Sink Fins */}
                                  <div className="flex justify-between w-[85%] h-6 sm:h-8 px-1.5 absolute top-1.5 sm:top-2 opacity-60">
                                    {Array.from({ length: 6 }).map((_, idx) => (
                                      <div key={idx} className="w-[1.5px] sm:w-[2px] h-full bg-slate-400 dark:bg-slate-700 rounded-sm" />
                                    ))}
                                  </div>

                                  <div className="mt-5 sm:mt-6 flex flex-col items-center z-10">
                                    <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-500/80 animate-pulse" />
                                    <span className="text-[6.5px] sm:text-[7px] text-slate-700 dark:text-slate-400 uppercase tracking-wide text-center font-bold mt-1 leading-none">
                                      {blade.cpuLabel}
                                    </span>
                                    <span className="text-[5.5px] sm:text-[6px] text-emerald-655 dark:text-emerald-400 font-mono mt-0.5">TEMP: {blade.temp}</span>
                                  </div>
                                </div>

                                {/* 2. DRAM Slot Array (RAM Sticks) */}
                                <div className="absolute right-[6%] top-[10%] w-[110px] sm:w-[125px] h-[70px] sm:h-[80px] flex flex-col justify-between z-10">
                                  {blade.ramUsage.map((occupied, idx) => (
                                    <div key={idx} className="w-full h-2 sm:h-2.5 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-sm relative flex items-center px-1 shadow-inner">
                                      {occupied ? (
                                        <div className="w-[85%] h-0.5 sm:h-1 bg-emerald-500 rounded-sm flex items-center justify-around shadow-[0_0_6px_#10b981] px-[2px]">
                                          {/* Tiny DRAM silicon chips */}
                                          <div className="w-1 sm:w-1.5 h-px sm:h-0.5 bg-slate-950 rounded-sm" />
                                          <div className="w-1 sm:w-1.5 h-px sm:h-0.5 bg-slate-950 rounded-sm" />
                                          <div className="w-1 sm:w-1.5 h-px sm:h-0.5 bg-slate-950 rounded-sm" />
                                        </div>
                                      ) : (
                                        <span className="text-[4px] text-slate-400 dark:text-slate-650 font-mono pl-1 leading-none">EMPTY</span>
                                      )}
                                    </div>
                                  ))}
                                  <span className="text-[4.5px] sm:text-[5px] text-slate-500 font-mono text-right uppercase tracking-wider mt-0.5 leading-none">32GB DDR4 ECC</span>
                                </div>

                                {/* 3. NVMe SSD Drive */}
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-28 sm:w-32 h-8 sm:h-10 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-emerald-500/20 rounded p-1 sm:p-1.5 flex items-center justify-between shadow-md z-10">
                                  {/* Connector contacts */}
                                  <div className="w-0.5 sm:w-1 h-[70%] bg-amber-500/80 rounded-r absolute left-0" />
                                  <div className="ml-1 sm:ml-2">
                                    <div className="text-[5px] sm:text-[6px] text-slate-700 dark:text-slate-400 uppercase font-black tracking-wider leading-none">FLASH_NVME_01</div>
                                    <div className="text-[5px] sm:text-[6px] text-slate-550 dark:text-slate-500 font-mono mt-0.5 leading-none">{blade.timeline}</div>
                                  </div>
                                  {/* Flash Controller chip */}
                                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-slate-950 rounded border border-slate-800 flex items-center justify-center shadow-inner flex-shrink-0">
                                    <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-zinc-800 rounded-sm" />
                                  </div>
                                </div>

                              </div>

                              {/* Right Board area: Tech specs diagnostic terminal screen */}
                              <div className="md:col-span-6 space-y-4">
                                
                                {/* Diagnostic log monitor */}
                                <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-xl relative shadow-inner overflow-hidden flex flex-col justify-between min-h-[170px]">
                                  
                                  <div>
                                    <span className="text-[7px] text-emerald-655 dark:text-emerald-500 font-bold uppercase tracking-wider block mb-2 leading-none">
                                      SYSTEM_DIAGNOSTIC_SHELL_LOGS:
                                    </span>

                                    <div className="space-y-1 text-[10px] leading-relaxed font-mono">
                                      {blade.logs.map((log, index) => (
                                        <div key={index} className="text-slate-700 dark:text-slate-350 flex items-center gap-1.5">
                                          <span className="text-emerald-655 dark:text-emerald-500 select-none">&gt;</span>
                                          <span>{log}</span>
                                        </div>
                                      ))}
                                      <div className="text-[10px] text-slate-500 dark:text-muted-foreground flex items-center gap-1.5">
                                        <span className="text-emerald-655 dark:text-emerald-500 select-none">&gt;</span>
                                        <span>SPECIALIZATION: {blade.field}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Interactive network/bandwidth graph */}
                                  <div className="flex items-center justify-between border-t border-slate-200/50 dark:border-slate-900 pt-3 mt-3 select-none">
                                    <div className="flex flex-col font-mono">
                                      <span className="text-[7px] text-slate-500 font-bold uppercase leading-none">Uptime Monitoring</span>
                                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-black mt-1">STABLE // 100.0%</span>
                                    </div>
                                    <LiveSparkline />
                                  </div>

                                </div>

                                {/* Academic Description */}
                                <div className="space-y-1">
                                  <span className="text-[8px] text-slate-500 uppercase tracking-widest font-black">
                                    MODULES_DIAGNOSTIC_SUMMARY:
                                  </span>
                                  <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed bg-slate-200/40 dark:bg-slate-900/40 p-3 rounded border border-slate-350 dark:border-slate-950">
                                    {blade.description}
                                  </p>
                                </div>

                              </div>

                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>

            {/* Right Rack Mounting Rail */}
            <div className="w-8 sm:w-10 flex-shrink-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 border-l border-slate-300 dark:border-slate-650 flex flex-col justify-around items-center py-6 select-none border-r border-slate-250 dark:border-slate-900 transition-all duration-300">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-[7px] font-mono text-slate-500 dark:text-slate-400 leading-none">U{4 - i}</span>
                  {/* Screw Hole */}
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-350 dark:bg-slate-950 border border-slate-450 dark:border-slate-600/80 relative flex items-center justify-center shadow-inner transition-colors duration-300">
                    {/* Metal Screw Slot */}
                    <div className="w-2.5 h-0.5 bg-slate-600 dark:bg-slate-400 rotate-45 rounded transition-colors" />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* 3. Cabinet Ventilation Grill (Bottom) */}
          <div className="h-6 w-full bg-slate-200 dark:bg-slate-950 rounded-b-xl border-t border-slate-300 dark:border-slate-850 px-4 flex items-center justify-around gap-1.5 transition-colors duration-300">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-2.5 h-2 bg-slate-300 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-950 rounded-sm flex-grow shadow-inner transition-colors duration-300" />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
