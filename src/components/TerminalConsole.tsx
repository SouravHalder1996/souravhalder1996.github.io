"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal } from "lucide-react";

interface TerminalConsoleProps {
  onComplete?: () => void;
}

const bootLines = [
  { text: "sh sourav@dwh-orchestrator ~ % ./check_pipelines.sh", delay: 200 },
  { text: ">>> Loading connection parameters SAP_ERP...", delay: 600 },
  { text: ">>> Syncing Delta lake layers (Apache Iceberg)...", delay: 600 },
  { text: ">>> Status: 93.75% extraction traffic reduction [OK]", delay: 500 },
  { text: ">>> Validating Redshift clusters (14 active marts)...", delay: 500 },
  { text: ">>> Checking ServiceNow MTTR integration...", delay: 600 },
  { text: ">>> Status: MTTR reduced by 40% [OK]", delay: 400 },
  { text: ">>> EventBridge & AWS Lambda active. SLA: 99.5%", delay: 500 },
  { text: "--------------------------------------------------", delay: 300 },
  { text: "SYSTEM STATUS: SECURE & STABLE. METRICS SYNCED.", delay: 400 },
];

export default function TerminalConsole({ onComplete }: TerminalConsoleProps) {
  const [lines] = useState<string[]>(bootLines.map((l) => l.text));
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Notify parent immediately on mount if callback exists
  useEffect(() => {
    onComplete?.();
  }, [onComplete]);

  // Auto scroll terminal
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="flex flex-col h-full bg-[#090b0e] border border-border/80 rounded-xl overflow-hidden font-mono text-xs shadow-2xl">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#11141a] border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
          <Terminal className="w-3 h-3" />
          <span>telemetry_check.sh</span>
        </div>
        <div className="w-12" /> {/* spacer */}
      </div>

      {/* Console Body */}
      <div 
        ref={containerRef}
        className="flex-grow p-5 space-y-1.5 text-left leading-relaxed text-[#a9b1d6] overflow-hidden"
      >
        {lines.map((line, idx) => {
          let textClass = "";
          if (line.includes("SUCCESS") || line.includes("SYSTEM STATUS")) {
            textClass = "text-emerald-400 font-bold";
          } else if (line.includes("reduction") || line.includes("reduced")) {
            textClass = "text-teal-400 font-semibold";
          } else if (line.startsWith("sh sourav")) {
            textClass = "text-primary font-semibold";
          } else if (line.includes(">>>")) {
            textClass = "text-muted-foreground";
          }

          return (
            <div key={idx} className={textClass}>
              {line}
            </div>
          );
        })}
        <div className="inline-flex items-center">
          <span className="text-primary font-semibold mr-1.5">sh sourav@dwh-orchestrator ~ %</span>
          <span 
            className={`inline-block w-1.5 h-3.5 bg-primary ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
