"use client";

import { motion } from "framer-motion";
import TerminalConsole from "./TerminalConsole";
import CountUp from "./CountUp";
import { Activity, ShieldAlert, Cpu, ArrowDownLeft } from "lucide-react";

export default function Metrics() {
  return (
    <section id="metrics" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-transparent">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-10 sm:mb-16 gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs font-semibold text-primary uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>Impact Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground font-heading">
            System Metrics & Operations
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            Telemetric ledger showing automated sync operations, pipeline efficiencies, and service level metrics.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Console / Boot Terminal Card */}
          <div className="lg:col-span-2 h-full">
            <TerminalConsole />
          </div>

          {/* Metric 1 - Production ETL Pipelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-slate-200/80 dark:border-border/60 bg-white/80 dark:bg-card/40 backdrop-blur-md hover:border-primary/20 transition-all duration-300 rounded-xl p-6 flex flex-col justify-between min-h-[180px] group shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Job Count
              </span>
              <Cpu className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="my-4">
              <h3 className="text-5xl font-black text-foreground tracking-tight font-sans">
                <CountUp end={50} suffix="+" />
              </h3>
              <p className="text-sm font-semibold text-primary mt-1">ETL Pipelines</p>
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Active production pipelines extracting SAP ERP, SQL Server, and REST API endpoints into a unified Redshift warehouse.
            </p>
          </motion.div>

          {/* Metric 2 - Pipeline SLA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-slate-200/80 dark:border-border/60 bg-white/80 dark:bg-card/40 backdrop-blur-md hover:border-primary/20 transition-all duration-300 rounded-xl p-6 flex flex-col justify-between min-h-[180px] group shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Service Level
              </span>
              <div className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
            </div>
            <div className="my-4">
              <h3 className="text-5xl font-black text-foreground tracking-tight font-sans">
                <CountUp end={99.5} decimals={1} suffix="%" />
              </h3>
              <p className="text-sm font-semibold text-primary mt-1">Operational SLA</p>
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Availability verified via automated event-driven checks, retry logic, and event alert routing.
            </p>
          </motion.div>

          {/* Metric 3 - Data Extraction Reduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border border-slate-200/80 dark:border-border/60 bg-white/80 dark:bg-card/40 backdrop-blur-md hover:border-primary/20 transition-all duration-300 rounded-xl p-6 flex flex-col justify-between min-h-[180px] group shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Replication Volume
              </span>
              <ArrowDownLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="my-4">
              <h3 className="text-5xl font-black text-foreground tracking-tight font-sans">
                <CountUp end={93.75} decimals={2} suffix="%" />
              </h3>
              <p className="text-sm font-semibold text-primary mt-1">Traffic Reduction</p>
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Migrating from legacy batch databases to a delta-load layer using Apache Iceberg, avoiding SAP database bottlenecks.
            </p>
          </motion.div>

          {/* Metric 4 - ServiceNow MTTR Alerting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border border-slate-200/80 dark:border-border/60 bg-white/80 dark:bg-card/40 backdrop-blur-md hover:border-primary/20 transition-all duration-300 rounded-xl p-6 flex flex-col justify-between min-h-[180px] group shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Alert Resolution
              </span>
              <ShieldAlert className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="my-4">
              <h3 className="text-5xl font-black text-foreground tracking-tight font-sans">
                <CountUp end={40} prefix="-" suffix="%" />
              </h3>
              <p className="text-sm font-semibold text-primary mt-1">MTTR Improvement</p>
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Automated integration linking pipeline alerts to ServiceNow API, replacing manual triaging and routing.
            </p>
          </motion.div>


        </div>
      </div>
    </section>
  );
}
