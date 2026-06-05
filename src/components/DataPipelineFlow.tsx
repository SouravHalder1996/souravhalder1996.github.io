"use client";

import React, { useState } from "react";
import { Database, HardDrive, Cpu, Layers, BarChart3, ArrowRight, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PipelineNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  metric: string;
  detailTitle: string;
  detailDesc: string;
  tech: string[];
}

const pipelineNodes: PipelineNode[] = [
  {
    id: "sap-ingest",
    label: "Ingestion APIs",
    icon: <Database className="w-5 h-5" />,
    metric: "93.75% Extraction Traffic Reduction",
    detailTitle: "SAP ERP & REST API Live Extraction Ingestion",
    detailDesc: "Re-architected query replication by migrating from database polling to Apache Iceberg incremental delta loads. This decoupled ERP transaction load, resolved processing bottlenecks, and eliminated extraction delays.",
    tech: ["Python", "SAP ERP", "REST APIs", "Apache Iceberg", "SQL Server"]
  },
  {
    id: "s3-lake",
    label: "S3 Data Lake",
    icon: <HardDrive className="w-5 h-5" />,
    metric: "Automated Bronze/Silver Storage",
    detailTitle: "Scalable S3 Object Partitioning & Lakehouse Lake",
    detailDesc: "Structured incoming raw streams into partitioned Parquet and Iceberg tables on AWS S3. Standardized file compaction, schemas, and retention configurations to enable fast analytics read-queries.",
    tech: ["AWS S3", "Apache Iceberg", "Parquet", "PySpark", "AWS IAM"]
  },
  {
    id: "glue-etl",
    label: "AWS Glue ETL",
    icon: <Cpu className="w-5 h-5" />,
    metric: "99.5% Run SLA Reliability",
    detailTitle: "Serverless Apache Spark ETL Processing",
    detailDesc: "Orchestrated 50+ concurrent production Glue ETL jobs utilizing EventBridge, Lambda triggers, and custom retry logic. Integrated ServiceNow API hooks to automatically alert teams on pipeline incident triggers.",
    tech: ["AWS Glue", "Apache Spark", "Python", "AWS Lambda", "ServiceNow API"]
  },
  {
    id: "redshift-dwh",
    label: "Redshift DWH",
    icon: <Layers className="w-5 h-5" />,
    metric: "14 Analytic Data Marts Powered",
    detailTitle: "Amazon Redshift Data Warehouse OLAP Storage",
    detailDesc: "Architected Redshift schemas with optimized sort and distribution keys. Aggregated multi-source operational records into 14 distinct data marts to power real-time dashboards with minimal latency.",
    tech: ["Amazon Redshift", "SQL Server", "Query Optimization", "Star Schema", "Redshift Spectrum"]
  },
  {
    id: "bi-sop",
    label: "Dashboards",
    icon: <BarChart3 className="w-5 h-5" />,
    metric: "60% Business Delay Reduction",
    detailTitle: "Leadership S&OP Planning & Forecasting Consumption",
    detailDesc: "Orchestrated data delivery cycles supporting monthly Sales & Operations Planning (S&OP) pipelines. Provided regional leaders with automated sales forecast telemetry and strategic inventory planning insights.",
    tech: ["Sales & Operations Forecasting", "BI Telemetry", "Data Marts", "Strategic Sales Planning"]
  }
];

export default function DataPipelineFlow() {
  const [activeNodeId, setActiveNodeId] = useState<string>("sap-ingest");
  const activeNode = pipelineNodes.find((n) => n.id === activeNodeId) || pipelineNodes[0];

  return (
    <div className="border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-card/25 backdrop-blur-md rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl shadow-slate-100/50 dark:shadow-none mt-8 w-full max-w-5xl mx-auto">
      
      {/* Title block */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest leading-none block">
          Interactive Architecture
        </span>
        <h3 className="text-xl font-bold text-foreground font-heading">
          Production ETL Pipeline Flow
        </h3>
        <p className="text-xs text-muted-foreground max-w-2xl">
          Hover or click on any pipeline node below to explore its data metrics, optimization telemetry, and technical stack details.
        </p>
      </div>

      {/* Nodes visual connector chain */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 py-4 select-none">
        
        {pipelineNodes.map((node, index) => {
          const isActive = node.id === activeNodeId;
          
          return (
            <React.Fragment key={node.id}>
              {/* Pipeline Node block */}
              <div
                onMouseEnter={() => setActiveNodeId(node.id)}
                onClick={() => setActiveNodeId(node.id)}
                className={`group relative flex flex-col items-center p-4 rounded-xl border cursor-pointer w-full md:w-36 transition-all duration-300 text-center ${
                  isActive
                    ? "border-primary bg-primary/5 dark:bg-primary/5 scale-105 shadow-md shadow-primary/5"
                    : "border-slate-200 dark:border-slate-800 hover:border-primary/40 bg-slate-50/50 dark:bg-card/10 hover:scale-[1.02]"
                }`}
              >
                {/* Node Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-colors duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-slate-100 dark:bg-slate-900 text-muted-foreground group-hover:text-primary"
                }`}>
                  {node.icon}
                </div>

                {/* Node Label */}
                <span className="text-xs font-bold text-foreground truncate max-w-full">
                  {node.label}
                </span>

                {/* Micro-glow pulse */}
                {isActive && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </div>

              {/* Connector Arrow (Skip for last node) */}
              {index < pipelineNodes.length - 1 && (
                <>
                  {/* Desktop horizontal arrow */}
                  <div className="hidden md:flex items-center justify-center text-muted-foreground/30 py-2">
                    <ArrowRight className="w-5 h-5 animate-pulse text-primary/50" />
                  </div>
                  {/* Mobile vertical arrow */}
                  <div className="flex md:hidden items-center justify-center text-muted-foreground/30 py-1">
                    <ArrowDown className="w-5 h-5 animate-pulse text-primary/50" />
                  </div>
                </>
              )}
            </React.Fragment>
          );
        })}

      </div>

      {/* Dynamically displayed Telemetry details panel */}
      <div className="relative min-h-[160px] border border-slate-100 dark:border-slate-900 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl p-5 overflow-hidden flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 flex flex-col justify-between h-full"
          >
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm sm:text-base font-bold text-foreground font-heading">
                  {activeNode.detailTitle}
                </h4>
                {/* Telemetry Metric pill */}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20 w-fit">
                  {activeNode.metric}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeNode.detailDesc}
              </p>
            </div>

            {/* Tech tag list */}
            <div className="pt-2 border-t border-border/40 flex flex-wrap gap-2 items-center">
              <span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest mr-2">
                Technology Stack:
              </span>
              {activeNode.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono bg-slate-100 dark:bg-slate-900 text-muted-foreground px-2 py-0.5 rounded-md border border-border/40"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
