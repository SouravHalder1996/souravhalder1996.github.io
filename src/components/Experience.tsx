"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Briefcase, ArrowLeft, ArrowRight } from "lucide-react";
import SafeImage from "./SafeImage";
import SectionHeaderDotGrid from "./SectionHeaderDotGrid";

interface RoleExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  overview: string;
  logoUrl?: string;
  logoText: string;
  logoBg: string;
  bullets: string[];
}

const experiencesData: RoleExperience[] = [
  {
    id: "infosys-sac",
    company: "Infosys Limited",
    role: "Senior Associate Consultant",
    period: "Oct 2021 - Present",
    overview: "Serving as a Senior Associate Consultant at Infosys Limited, specializing in enterprise data engineering pipeline architecture, serverless cloud orchestration, data lakehouse migrations, and automated systems telemetry.",
    logoUrl: "/images/infosys.png",
    logoText: "INF",
    logoBg: "from-blue-600/10 to-indigo-650/5 text-blue-500",
    bullets: [
      "Engineered and maintained 50+ production ETL pipelines using Python, SQL, and AWS Glue, orchestrating data extraction from multi-source SAP ERP, SQL Server, and REST APIs into Redshift data warehouse supporting 14 data marts, ensuring timely data availability for business dashboards and analytics teams.",
      "Implemented robust pipeline orchestration with event-driven and schedule-based triggers (Lambda, EventBridge, S3), incorporating programmatic retry logic and data validation checks that eliminated synchronization failures by 85%, resolved data mismatches, and achieved 99.5% pipeline reliability.",
      "Optimized data delivery cycles to support monthly Sales & Operations Planning (S&OP) processes for leadership and regional sales heads, cutting data delays by 60% and ensuring accurate, timely insights for strategic sales planning and forecasting.",
      "Re-architected data extraction pipeline by migrating from direct SQL database to Apache Iceberg-based live layer with incremental delta loads, achieving 93.75% reduction in data extraction and eliminating performance bottlenecks caused by high-volume ERP replication traffic.",
      "Streamlined incident management by integrating ServiceNow API for pipeline monitoring, enabling automatic ticket creation and intelligent team assignment for job failures; decreased mean time to resolution (MTTR) by 40% and eliminated manual triaging overhead.",
      "Architected a Generative AI PaaS integrating Portkey AI LLM Gateway (routing, rate limiting, serving, usage tracking) and AWS Bedrock for centralized RAG capabilities; secured multi-tenant access via Active Directory (AD) and SailPoint to allow teams to securely ingest and query proprietary data.",
      "Implemented custom n8n workflows, engineering a Jira ticketing agent that queries Bedrock Knowledge Bases to auto-suggest resolutions; designed LLM-generated stakeholder reports and a sync workflow from SharePoint to Confluence/Web."
    ]
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 150 : -150,
    opacity: 0
  })
};

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToIndex = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  const nextExperience = () => {
    if (activeIndex < experiencesData.length - 1) {
      setDirection(1);
      setActiveIndex((prev) => prev + 1);
    }
  };

  const prevExperience = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex((prev) => prev - 1);
    }
  };

  const currentRole = experiencesData[activeIndex] || experiencesData[0];

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-transparent scroll-mt-20">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-16 gap-6">
          <div className="relative z-10 flex flex-col items-start text-left gap-3">
            <SectionHeaderDotGrid />
            <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/90 shadow-sm backdrop-blur-md text-xs font-semibold text-primary uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional Career</span>
            </div>
            <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground font-heading">
              Professional Experience
            </h2>
            <p className="relative z-10 max-w-2xl text-muted-foreground text-sm sm:text-base">
              Detailed operational domains and systems implemented during my consulting career.
            </p>
          </div>

          {/* Navigation controls */}
          {experiencesData.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevExperience}
                disabled={activeIndex === 0}
                aria-label="Previous experience"
                className="w-10 h-10 rounded-lg border border-border bg-card/45 hover:bg-muted/40 disabled:opacity-40 disabled:hover:bg-card/45 text-foreground flex items-center justify-center transition-colors active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextExperience}
                disabled={activeIndex === experiencesData.length - 1}
                aria-label="Next experience"
                className="w-10 h-10 rounded-lg border border-border bg-card/45 hover:bg-muted/40 disabled:opacity-40 disabled:hover:bg-card/45 text-foreground flex items-center justify-center transition-colors active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Horizontal Segment-based Timeline Connector Bar */}
        {experiencesData.length > 1 && (
          <div className="relative max-w-3xl mx-auto mb-16 px-4 sm:px-8 z-0">
            <div className="flex items-center justify-between relative w-full">
              {experiencesData.map((role, idx) => {
                const isActive = idx === activeIndex;
                const isPassed = idx < activeIndex;

                return (
                  <React.Fragment key={role.id}>
                    {/* Timeline Node Button */}
                    <button
                      onClick={() => goToIndex(idx)}
                      className="flex flex-col items-center group cursor-pointer focus:outline-none relative z-10 flex-shrink-0"
                      style={{ width: "80px" }}
                    >
                      {/* Glowing Node circle indicator */}
                      <div className={`w-8 h-8 rounded-full border-2 bg-white dark:bg-[#090b0e] flex items-center justify-center transition-all duration-300 relative z-10 ${isActive
                          ? "border-primary bg-primary/5 shadow-[0_0_12px_rgba(var(--primary-rgb),0.35)] scale-110"
                          : "border-slate-200 dark:border-border/60 hover:border-primary/50"
                        }`}>
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive
                            ? "bg-primary scale-110"
                            : "bg-transparent group-hover:bg-primary/25"
                          }`} />
                      </div>

                      {/* Company text label (absolute positioned underneath) */}
                      <div className="flex flex-col items-center w-32 absolute top-10 pointer-events-none">
                        <span className={`text-[10px] font-mono font-bold tracking-widest uppercase transition-colors duration-200 text-center ${isActive
                            ? "text-primary font-black"
                            : "text-muted-foreground/60 group-hover:text-foreground"
                          }`}>
                          {role.company}
                        </span>
                        <span className="text-[9px] font-mono text-muted-foreground/40 mt-0.5 text-center">
                          {role.period.split(" - ")[0]}
                        </span>
                      </div>
                    </button>

                    {/* Connecting Line Segment (rendered between nodes) */}
                    {idx < experiencesData.length - 1 && (
                      <div className="flex-grow h-0.5 mx-2 relative z-0">
                        {/* Inactive line segment */}
                        <div className="absolute inset-0 bg-slate-200 dark:bg-border/60 rounded" />
                        {/* Active progress segment */}
                        <div className={`absolute inset-0 bg-primary rounded transition-all duration-500 ease-out ${isPassed ? "w-full" : "w-0"
                          }`} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {/* Spacer to make room for absolute positioned text labels below buttons */}
            <div className="h-10" />
          </div>
        )}

        {/* Carousel Slider Container */}
        <div className="relative w-full overflow-hidden max-w-7xl mx-auto min-h-[450px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.15 }
              }}
              className="w-full"
            >
              {/* Full Width Grid Card (identical structure to approved visual layout) */}
              <div className="border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-card/25 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl shadow-slate-100/50 dark:shadow-none grid grid-cols-1 md:grid-cols-12 gap-0 text-left">
                {/* Left Column: Role Details & Metadata (col-span-4) */}
                <div className="md:col-span-4 p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5 border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-slate-800/80 bg-slate-50/30 dark:bg-card/5">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    {currentRole.logoUrl ? (
                      <div className="h-9 sm:h-10 px-3 bg-white border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center select-none w-fit shadow-sm">
                        <SafeImage
                          src={currentRole.logoUrl}
                          alt={currentRole.company}
                          className="h-5 sm:h-6 w-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm bg-gradient-to-br ${currentRole.logoBg} w-fit shadow-sm`}>
                        {currentRole.logoText}
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground bg-slate-100 dark:bg-slate-900/60 px-2.5 py-1 rounded-lg border border-border/40 w-fit">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{currentRole.period}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground font-heading leading-tight">
                      {currentRole.role}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest block">
                      {currentRole.company}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed pt-1 sm:pt-2">
                    {currentRole.overview}
                  </p>
                </div>

                {/* Right Column: Key Contributions Bullet Points (col-span-8) */}
                <div className="md:col-span-8 p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-6 flex flex-col justify-center">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-widest leading-none block">
                      Contributions Ledger
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-foreground font-heading">
                      Key Contributions & Achievements
                    </h4>
                  </div>

                  <ul className="space-y-3 sm:space-y-4">
                    {currentRole.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex items-start gap-2.5 sm:gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 sm:mt-2 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
