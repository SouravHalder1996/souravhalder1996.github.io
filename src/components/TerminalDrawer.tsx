"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ChevronUp,
  ChevronDown,
  X,
  Maximize2,
  Minimize2,
  Sparkles,
  CornerDownLeft,
} from "lucide-react";

interface CommandOutput {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export default function TerminalDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      command: "init",
      output: (
        <div className="space-y-1 text-slate-200">
          <p className="text-emerald-400 font-bold">
            🚀 Sourav Halder Interactive Telemetry CLI [Version 2.4.0]
          </p>
          <p className="text-slate-400 text-[11px]">
            Type <span className="text-teal-400 font-bold">help</span> to view available commands, or <span className="text-teal-400 font-bold">skills</span>, <span className="text-teal-400 font-bold">experience</span>, <span className="text-teal-400 font-bold">certs</span>, <span className="text-teal-400 font-bold">sudo hire</span>.
          </p>
        </div>
      ),
      timestamp: "00:00:01",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Global keydown shortcut ('~' or '`') to toggle terminal, and Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Isolate scroll within the terminal drawer to prevent background page scrolling
  useEffect(() => {
    const win = windowRef.current;
    const body = bodyRef.current;
    if (!isOpen || !win) return;

    const handleWheel = (e: WheelEvent) => {
      if (!body) {
        e.preventDefault();
        return;
      }

      const isScrollable = body.scrollHeight > body.clientHeight;
      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const isAtTop = body.scrollTop <= 0 && e.deltaY < 0;
      const isAtBottom = body.scrollTop + body.clientHeight >= body.scrollHeight - 1 && e.deltaY > 0;

      if (isAtTop || isAtBottom) {
        e.preventDefault();
      }
    };

    win.addEventListener("wheel", handleWheel, { passive: false });
    return () => win.removeEventListener("wheel", handleWheel);
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [outputs, isOpen]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let resultNode: React.ReactNode = null;
    const now = new Date().toLocaleTimeString();

    switch (cmd) {
      case "help":
        resultNode = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1 text-slate-300">
            <div className="flex items-center gap-1.5"><span className="text-teal-400 font-bold w-20 shrink-0">whoami</span> <span className="text-slate-500">-</span> <span className="text-slate-300">About Sourav Halder</span></div>
            <div className="flex items-center gap-1.5"><span className="text-teal-400 font-bold w-20 shrink-0">skills</span> <span className="text-slate-500">-</span> <span className="text-slate-300">List technical expertise</span></div>
            <div className="flex items-center gap-1.5"><span className="text-teal-400 font-bold w-20 shrink-0">experience</span> <span className="text-slate-500">-</span> <span className="text-slate-300">Career summary & metrics</span></div>
            <div className="flex items-center gap-1.5"><span className="text-teal-400 font-bold w-20 shrink-0">projects</span> <span className="text-slate-500">-</span> <span className="text-slate-300">Production project showcase</span></div>
            <div className="flex items-center gap-1.5"><span className="text-teal-400 font-bold w-20 shrink-0">certs</span> <span className="text-slate-500">-</span> <span className="text-slate-300">Verified credentials</span></div>
            <div className="flex items-center gap-1.5"><span className="text-teal-400 font-bold w-20 shrink-0">ai / ask-ai</span> <span className="text-slate-500">-</span> <span className="text-slate-300">Launch Sourav AI Assistant</span></div>
            <div className="flex items-center gap-1.5"><span className="text-teal-400 font-bold w-20 shrink-0">contact</span> <span className="text-slate-500">-</span> <span className="text-slate-300">Email & phone info</span></div>
            <div className="flex items-center gap-1.5"><span className="text-teal-400 font-bold w-20 shrink-0">theme</span> <span className="text-slate-500">-</span> <span className="text-slate-300">Toggle light/dark mode</span></div>
            <div className="flex items-center gap-1.5"><span className="text-teal-400 font-bold w-20 shrink-0">clear</span> <span className="text-slate-500">-</span> <span className="text-slate-300">Clear terminal buffer</span></div>
            <div className="flex items-center gap-1.5"><span className="text-amber-400 font-bold w-20 shrink-0">sudo hire</span> <span className="text-slate-500">-</span> <span className="text-slate-300">Direct talent invitation</span></div>
          </div>
        );
        break;

      case "whoami":
        resultNode = (
          <div className="space-y-1 text-slate-300">
            <p><span className="text-teal-400 font-bold">Name:</span> Sourav Halder</p>
            <p><span className="text-teal-400 font-bold">Role:</span> AI/ML Engineer · Data Scientist · GenAI & Agentic AI Developer · Cloud Architect</p>
            <p><span className="text-teal-400 font-bold">Education:</span> M.Tech (Robotics & AI, 90.36%) · Jadavpur University</p>
            <p><span className="text-teal-400 font-bold">Focus:</span> Machine Learning, AWS Bedrock RAG, Agentic & n8n Workflows, Portkey AI Gateway, AWS Cloud Architecture.</p>
          </div>
        );
        break;

      case "skills":
        resultNode = (
          <div className="space-y-2 text-slate-300 text-xs">
            <div><span className="text-sky-400 font-bold">[AI/ML & Data Science]:</span> <span className="text-slate-300">TensorFlow, Scikit-Learn, MLflow, DVC, Matplotlib, Seaborn, Anomaly Detection, Pandas, NumPy.</span></div>
            <div><span className="text-teal-400 font-bold">[Agentic AI & GenAI]:</span> <span className="text-slate-300">LangChain, LangGraph, n8n AI Automations, Portkey AI Gateway, AWS Bedrock Knowledge Bases, Confident AI.</span></div>
            <div><span className="text-amber-400 font-bold">[Cloud Architecture]:</span> <span className="text-slate-300">AWS (4x Certified), Lambda, ECS, S3, API Gateway, Amazon RDS, DynamoDB, Redshift, Databricks (3x), Docker.</span></div>
            <div><span className="text-emerald-400 font-bold">[Languages & APIs]:</span> <span className="text-slate-300">Python, SQL, TypeScript, FastAPI, REST, C.</span></div>
          </div>
        );
        break;

      case "experience":
        resultNode = (
          <div className="space-y-1.5 text-slate-300 text-xs">
            <p className="text-teal-400 font-bold">Infosys Limited — Senior Associate Consultant (Oct 2021 - Present)</p>
            <p className="text-slate-300">• Architected production data & ML pipelines using AWS serverless, S3, and Redshift.</p>
            <p className="text-slate-300">• Reduced replication extraction traffic by <span className="text-emerald-400 font-bold">93.75%</span> with incremental ingestion.</p>
            <p className="text-slate-300">• Reduced compute runtime costs by <span className="text-emerald-400 font-bold">76%</span> and incident MTTR by <span className="text-emerald-400 font-bold">40%</span>.</p>
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="space-y-2 text-slate-300 text-xs">
            <div>
              <p className="text-teal-400 font-bold">1. Autonomous Multi-Agent Orchestrator & LLM Gateway (LangGraph + LangChain + n8n + AWS Bedrock RAG)</p>
              <p className="text-slate-400">Multi-agent task routing, semantic caching, vector retrieval, and automated webhook execution.</p>
            </div>
            <div>
              <p className="text-sky-400 font-bold">2. ML-Powered Streaming Anomaly Detection (Ensemble ML & Real-Time Telemetry)</p>
              <p className="text-slate-400">Real-time IoT failure detection cutting MTTR by 40% with sub-second inference latency.</p>
            </div>
            <div>
              <p className="text-amber-400 font-bold">3. Cloud Infrastructure Automation (Multi-AZ ECS & Cloud Architecture on AWS)</p>
              <p className="text-slate-400">Standardized multi-environment cloud deployments with 99.5% uptime SLA.</p>
            </div>
          </div>
        );
        break;

      case "certs":
        resultNode = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p>• <span className="text-amber-400 font-bold">Databricks</span> Certified Machine Learning Engineer Associate (2026)</p>
            <p>• <span className="text-amber-400 font-bold">Databricks</span> Certified Data Engineer Professional (2026)</p>
            <p>• <span className="text-amber-400 font-bold">Databricks</span> Certified Data Engineer Associate (2025)</p>
            <p>• <span className="text-sky-400 font-bold">AWS</span> Solutions Architect – Associate (2023)</p>
            <p>• <span className="text-sky-400 font-bold">AWS</span> Developer – Associate (2023)</p>
            <p>• <span className="text-sky-400 font-bold">AWS</span> AI Practitioner (2024)</p>
            <p>• <span className="text-teal-400 font-bold">Collibra</span> Solution Architect, Workflow Engineer & Integration Engineer (2024)</p>
          </div>
        );
        break;

      case "ai":
      case "ask-ai":
      case "copilot":
        window.dispatchEvent(new CustomEvent("open-ai-copilot"));
        resultNode = <p className="text-emerald-400">✨ Launching Sourav AI Assistant...</p>;
        break;

      case "contact":
        resultNode = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p>Email: <a href="mailto:halder.sourav1996@gmail.com" className="text-teal-400 hover:underline">halder.sourav1996@gmail.com</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/sourav--halder" target="_blank" className="text-teal-400 hover:underline">linkedin.com/in/sourav--halder</a></p>
            <p>GitHub: <a href="https://github.com/SouravHalder1996" target="_blank" className="text-teal-400 hover:underline">github.com/SouravHalder1996</a></p>
          </div>
        );
        break;

      case "theme":
        const themeBtn = document.querySelector('button[aria-label="Toggle theme"]') as HTMLButtonElement | null;
        themeBtn?.click();
        resultNode = <p className="text-teal-400">🎨 Theme toggled successfully.</p>;
        break;

      case "clear":
        setOutputs([]);
        setInput("");
        return;

      case "sudo":
        if (args[0] === "hire") {
          resultNode = (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 space-y-1">
              <p className="font-bold text-sm">🎉 Excellent choice! Priority contact route granted.</p>
              <p className="text-xs text-slate-300">Direct Email: <a href="mailto:halder.sourav1996@gmail.com?subject=Senior%20Role%20Inquiry%20for%20Sourav" className="underline font-bold text-teal-400 hover:text-teal-300">halder.sourav1996@gmail.com</a></p>
              <p className="text-xs text-slate-300">LinkedIn: <a href="https://linkedin.com/in/sourav--halder" target="_blank" className="underline font-bold text-teal-400 hover:text-teal-300">linkedin.com/in/sourav--halder</a></p>
            </div>
          );
        } else {
          resultNode = <p className="text-rose-400">Permission denied: user is not in sudoers file. Try &apos;sudo hire&apos;.</p>;
        }
        break;

      default:
        resultNode = (
          <p className="text-rose-400">
            command not found: {cmd}. Type <span className="text-teal-400 font-bold">help</span> to view available commands.
          </p>
        );
        break;
    }

    setOutputs((prev) => [
      ...prev,
      {
        command: trimmed,
        output: resultNode,
        timestamp: now,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx + 1 < history.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || "");
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center pointer-events-none select-none">
      <AnimatePresence mode="wait">
        {/* Minimized Dock Bar */}
        {!isOpen ? (
          <motion.button
            key="minimized-cli-bar"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto mb-2 sm:mb-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#0a0e17]/95 hover:bg-[#111726] border border-slate-800/80 text-slate-200 text-xs font-mono shadow-xl backdrop-blur-md flex items-center gap-2 sm:gap-2.5 cursor-pointer group transition-colors max-w-[92vw] truncate"
          >
            <div className="flex items-center gap-1.5 text-teal-400 flex-shrink-0">
              <Terminal className="w-3.5 h-3.5" />
              <span className="font-bold">~ sourav: $</span>
            </div>
            <span className="text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors hidden sm:inline">
              (click or press ` to expand CLI)
            </span>
            <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-400 transition-transform flex-shrink-0" />
          </motion.button>
        ) : (
          /* Expanded Terminal Window */
          <motion.div
            ref={windowRef}
            key="expanded-cli-window"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className={`pointer-events-auto w-full ${
              isMaximized ? "max-w-7xl h-[65vh]" : "max-w-4xl h-[340px]"
            } bg-[#080b11] border-t sm:border border-slate-800 sm:rounded-t-2xl shadow-2xl flex flex-col overflow-hidden`}
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f141f] border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer transition-colors" 
                  onClick={() => setIsOpen(false)} 
                  title="Close (or press Esc)"
                />
                <span 
                  className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer transition-colors" 
                  onClick={() => setIsMaximized((m) => !m)} 
                  title={isMaximized ? "Restore" : "Maximize"}
                />
                <span 
                  className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer transition-colors" 
                  onClick={() => setOutputs([])} 
                  title="Clear Buffer"
                />
                <span className="text-xs font-mono font-bold text-slate-200 ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  <span>sourav@portfolio:~</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <button
                  onClick={() => setIsMaximized((m) => !m)}
                  className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title={isMaximized ? "Restore" : "Maximize"}
                >
                  {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title="Close (or press Esc)"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              ref={bodyRef}
              onClick={() => inputRef.current?.focus()}
              className="flex-1 p-4 overflow-y-auto overscroll-contain no-scrollbar font-mono text-xs text-left space-y-3 cursor-text select-text bg-[#080b11] text-slate-200"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {outputs.map((out, idx) => (
                <div key={idx} className="space-y-1">
                  {out.command !== "init" && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-teal-400 font-bold">sourav@portfolio:~$</span>
                      <span className="text-white font-semibold">{out.command}</span>
                      <span className="text-[10px] text-slate-500 ml-auto">{out.timestamp}</span>
                    </div>
                  )}
                  <div className="pl-2 border-l border-slate-800 text-slate-300">{out.output}</div>
                </div>
              ))}

              {/* Active Prompt Line */}
              <div className="flex items-center gap-2 text-slate-300 pt-1">
                <span className="text-teal-400 font-bold flex-shrink-0">sourav@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs focus:ring-0 p-0 placeholder:text-slate-500"
                  autoFocus
                  placeholder="Type a command (e.g. 'help', 'skills', 'sudo hire')..."
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
