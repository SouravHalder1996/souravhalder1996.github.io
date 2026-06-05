"use client";

import { Calendar, Briefcase } from "lucide-react";
import DataPipelineFlow from "@/components/DataPipelineFlow";

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
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/500px-Infosys_logo.svg.png",
    logoText: "INF",
    logoBg: "from-blue-600/10 to-indigo-650/5 text-blue-500",
    bullets: [
      "Developed and maintained 50+ production ETL pipelines using Python, SQL, and AWS Glue, orchestrating data extraction from multi source SAP ERP, SQL Server, and REST APIs into Redshift data warehouse supporting 14 data marts, ensuring timely data availability for business dashboards and analytics teams.",
      "Implemented robust pipeline orchestration with event-driven and schedule-based triggers (Lambda, EventBridge, S3), incorporating automated retry logic, data validation checks, eliminated synchronization failures by 85%, resolved data mismatches, and achieved 99.5% pipeline reliability.",
      "Optimized data delivery cycles to support monthly Sales & Operations Planning (S&OP) processes for leadership and regional sales heads, cutting data delays by 60% and ensuring accurate, timely insights for strategic sales planning and forecasting.",
      "Re-architected data extraction pipeline by migrating from direct SQL database to Apache Iceberg-based live layer with incremental delta loads, achieving 93.75% reduction in data extraction and eliminating performance bottlenecks caused by high-volume ERP replication traffic.",
      "Automated incident management by integrating ServiceNow API for pipeline monitoring, enabling automatic ticket creation and intelligent team assignment for job failures—decreased mean time to resolution (MTTR) by 40% and eliminated manual triaging overhead."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-background">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16 gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs font-semibold text-primary uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground font-heading">
            Professional Experience
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            Detailed operational domains and systems implemented during my consulting career.
          </p>
        </div>

        {/* Scalable Unified Card Stack */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {experiencesData.map((role) => (
            <div
              key={role.id}
              className="border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-card/25 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl shadow-slate-100/50 dark:shadow-none grid grid-cols-1 md:grid-cols-12 gap-0 animate-in fade-in duration-500"
            >
              {/* Left Column: Role Details & Metadata (col-span-4) */}
              <div className="md:col-span-4 p-6 md:p-8 space-y-5 border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-slate-800/80 bg-slate-50/30 dark:bg-card/5">
                {/* Smart Logo Capsule */}
                <div className="flex flex-col gap-4">
                  {role.logoUrl ? (
                    <div className="h-10 px-3 bg-white border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center select-none w-fit shadow-sm">
                      <img src={role.logoUrl} alt={role.company} className="h-6 w-auto object-contain" />
                    </div>
                  ) : (
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm bg-gradient-to-br ${role.logoBg} w-fit`}>
                      {role.logoText}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground bg-slate-100 dark:bg-slate-900/60 px-2.5 py-1 rounded-lg border border-border/40 w-fit">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{role.period}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-foreground font-heading leading-tight">
                    {role.role}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest block">
                    {role.company}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                  {role.overview}
                </p>
              </div>

              {/* Right Column: Key Contributions Bullet Points (col-span-8) */}
              <div className="md:col-span-8 p-6 md:p-8 space-y-6 flex flex-col justify-center">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-widest leading-none block">
                    Contributions Ledger
                  </span>
                  <h4 className="text-lg font-bold text-foreground font-heading">
                    Key Contributions & Achievements
                  </h4>
                </div>
                
                <ul className="space-y-4">
                  {role.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
          <DataPipelineFlow />
        </div>

      </div>
    </section>
  );
}
