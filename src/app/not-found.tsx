"use client";

import Link from "next/link";
import { Terminal, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0f1115] text-[#e2e8f0] flex flex-col items-center justify-center p-6 font-mono select-none overflow-y-auto">
      {/* Background grid accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15 pointer-events-none" />

      {/* Terminal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg border border-slate-800 bg-[#15181e] rounded-xl shadow-2xl overflow-hidden z-10"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f1115] border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ef4444] opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#f59e0b] opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#10b981] opacity-80" />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            error_404.sh
          </span>
          <div className="w-12" /> {/* spacer */}
        </div>

        {/* Terminal Body */}
        <div className="p-6 space-y-6 text-xs sm:text-sm leading-relaxed">
          
          {/* Logs */}
          <div className="space-y-2.5">
            <div className="flex gap-2">
              <span className="text-primary font-bold">&gt;</span>
              <span className="text-slate-400">locate_route --current-url</span>
            </div>
            <div className="text-amber-500 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>[WARNING] Target URL path not found in segment tables.</span>
            </div>

            <div className="flex gap-2 pt-2">
              <span className="text-primary font-bold">&gt;</span>
              <span className="text-slate-400">dump_diagnostics --verbose</span>
            </div>
            <div className="text-slate-500 space-y-1 pl-4">
              <div>HTTP_STATUS: 404 (Resource Not Found)</div>
              <div>REASON: Bad route partition / Link dereferenced</div>
              <div>TELEMETRY_LOG: terminated with code SIGSEGV</div>
            </div>

            <div className="flex gap-2 pt-2">
              <span className="text-primary font-bold">&gt;</span>
              <span className="text-slate-400">initiate_reroute_sequence</span>
            </div>
            <div className="text-emerald-500 font-bold animate-pulse">
              [INFO] Gateway operational. Main console accessible.
            </div>
          </div>

          {/* Interactive blink cursor */}
          <div className="flex items-center gap-1">
            <span className="text-primary font-bold">&gt;</span>
            <span className="w-2 h-4 bg-primary animate-pulse" />
          </div>

          {/* Reroute CTA Button */}
          <div className="pt-4 border-t border-slate-850">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/95 text-[#0f1115] font-bold text-xs sm:text-sm transition-all duration-200 shadow shadow-primary/20 hover:shadow-md hover:shadow-primary/30"
            >
              <span>Reroute to Main Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
