"use client";

import { useState, useRef, useEffect } from "react";
import {
  Workflow,
  ArrowRight,
  ArrowLeft,
  PlayCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

interface ProjectDetails {
  problem: string;
  approach: string;
  architectureFlow: string[];
  outcomes: string[];
}

interface ProjectData {
  id: string;
  title: string;
  focus: string;
  description: string;
  metric: string;
  metricLabel: string;
  image: string;
  categories: string[];
  tech: string[];
  github?: string;
  details: ProjectDetails;
}

const projects: ProjectData[] = [
  {
    id: "delta-lakehouse",
    title: "Delta Lakehouse Pipeline",
    focus: "SAP ERP → Glue → Iceberg → Redshift",
    description: "Optimized a mission-critical financial ledger ETL pipeline by introducing partition-aware incremental delta-load extraction, slashing data processing workloads dramatically.",
    metric: "93.75%",
    metricLabel: "Data Volume Reduction",
    image: "/images/projects/delta_lakehouse.png",
    categories: ["data-engineering", "sql"],
    tech: ["AWS Glue", "Apache Iceberg", "Amazon Redshift", "S3", "Python", "SAP ERP"],
    github: "https://github.com/SouravHalder1996/SQL_Project",
    details: {
      problem: "Traditional batch extracts pulled 8.5GB of SAP financial ledgers daily, overloading network bandwidth and causing memory pressure on downstream Redshift databases during load peaks.",
      approach: "Built a partition-aware incremental ingestion pipeline utilizing AWS Glue, cataloging records to an Apache Iceberg table format on S3 with delta-load mechanics to avoid full-table scans.",
      architectureFlow: [
        "SAP ERP (CDC Logs)",
        "AWS Glue (PySpark Delta Job)",
        "Apache Iceberg (S3 Bronze/Silver)",
        "Amazon Redshift Spectrum (Gold)"
      ],
      outcomes: [
        "Reduced daily data extraction volume from 8.5GB to 530MB (93.75% reduction).",
        "Lowered AWS Glue orchestration costs by 76% due to shorter runtime.",
        "Reduced end-to-end data latency from 24 hours to under 15 minutes."
      ]
    }
  },
  {
    id: "anomaly-detection",
    title: "ML-Powered Anomaly Detection",
    focus: "Real-time anomaly pipeline on streaming data",
    description: "Designed and deployed a streaming telemetry ingest engine that processes high-frequency IoT readings to detect operational anomalies in real-time.",
    metric: "40%",
    metricLabel: "MTTR Improvement",
    image: "/images/projects/anomaly_detection.png",
    categories: ["data-science", "data-engineering"],
    tech: ["Apache Kafka", "Apache Spark", "Python", "Scikit-Learn", "AWS ECS", "Prometheus"],
    details: {
      problem: "Legacy monitoring systems relied on static threshold alerts, causing alert fatigue and delayed detection of multi-variable system failures, resulting in high Mean Time to Resolution (MTTR).",
      approach: "Orchestrated a Kafka streaming pipeline coupled with Apache Spark Streaming, feeding ingestion features into a lightweight ensemble ML model trained to flag anomalies.",
      architectureFlow: [
        "IoT Devices / Telemetry",
        "Apache Kafka (Ingestion Hub)",
        "Apache Spark Streaming (AWS ECS)",
        "Prometheus & Grafana (Alerting)"
      ],
      outcomes: [
        "Reduced Mean Time to Resolution (MTTR) by 40% (average recovery time dropped from 3h to 1.8h).",
        "Eliminated 91% of false-positive threshold alerts through ML classification.",
        "Maintained sub-second inference latency for real-time alerting."
      ]
    }
  },
  {
    id: "cloud-automation",
    title: "Cloud Infrastructure Automation",
    focus: "Terraform + ECS + CI/CD orchestration",
    description: "Standardized cloud operations across production clusters using declarative infrastructure definitions and secure automated deployment gates.",
    metric: "99.5%",
    metricLabel: "Uptime SLA Achieved",
    image: "/images/projects/cloud_automation.png",
    categories: ["cloud"],
    tech: ["Terraform", "GitHub Actions", "AWS ECS", "AWS VPC", "Docker", "AWS IAM"],
    details: {
      problem: "Manual staging deployments and ad-hoc infrastructure configurations caused environmental drifts, security vulnerabilities in VPC configurations, and unpredictable scaling.",
      approach: "Developed reusable Terraform module libraries to define secure Multi-AZ AWS network topologies, auto-scaled ECS Fargate services, and automated CI/CD validation.",
      architectureFlow: [
        "GitHub Actions (Vulnerability scan)",
        "Terraform Cloud (Plan validation)",
        "AWS ECS Fargate (Multi-AZ deploy)",
        "AWS CloudWatch (Health Check Gates)"
      ],
      outcomes: [
        "Reached and sustained a 99.5% uptime SLA by automating self-healing infrastructure.",
        "Reduced onboarding time for deploying new microservices from 2 weeks to 2 hours.",
        "Resolved environment configuration drifts entirely across production and staging."
      ]
    }
  },
  {
    id: "three-tier-arch",
    title: "AWS Three-Tier Web Architecture",
    focus: "Auto Scaled Load Balanced Infrastructure",
    description: "Utilized a public Application Load Balancer to route client traffic to auto-scaling Nginx web servers, communicating with internal application servers and RDS databases.",
    metric: "100%",
    metricLabel: "Infrastructure Code Setup",
    image: "/images/projects/three_tier_arch.png",
    categories: ["cloud"],
    tech: ["AWS", "EC2", "ELB", "VPC", "RDS", "Nginx", "React"],
    github: "https://github.com/SouravHalder1996/3tier-webapp-aws-project",
    details: {
      problem: "Ad-hoc manual configuration of multi-tier applications leads to server configuration drifts, security vulnerability exposures, and lack of automatic scaling.",
      approach: "Designed a secure AWS three-tier network with public/private subnets, setting up an Auto Scaling Group behind ALBs, using Amazon RDS for databases.",
      architectureFlow: [
        "Nginx Web Tier (EC2)",
        "Application Load Balancer",
        "Node.js App Tier (EC2)",
        "Amazon RDS Multi-AZ Database"
      ],
      outcomes: [
        "Isolated application tiers inside private subnets for enhanced security.",
        "Automated horizontal scaling of instances based on traffic triggers.",
        "Achieved high-availability database cluster setup using Multi-AZ RDS deployments."
      ]
    }
  },
  {
    id: "spotify-pipeline",
    title: "Spotify Big Data Analytics Pipeline",
    focus: "Serverless Ingest & Aggregation ETL",
    description: "Built a serverless data pipeline to extract, transform, and load Spotify top songs data into a visual analysis dashboard using AWS serverless analytics services.",
    metric: "Daily",
    metricLabel: "Automated ETL Sync",
    image: "/images/projects/spotify_pipeline.png",
    categories: ["data-engineering", "cloud"],
    tech: ["AWS Glue", "S3", "Athena", "Amazon QuickSight", "Python", "Spotify API"],
    github: "https://github.com/SouravHalder1996/spotify-data-analysis-aws-project",
    details: {
      problem: "Manual monitoring of audio streaming trends required downloading CSVs and hand-building dashboards, leading to high latency in analytical reporting.",
      approach: "Automated extraction from the Spotify API via AWS Lambda, storing raw data on S3, cataloging it with AWS Glue, and running SQL queries via Athena to power QuickSight.",
      architectureFlow: [
        "Spotify API",
        "AWS Lambda Ingestion",
        "S3 Data Lake (Raw)",
        "AWS Glue Crawler / ETL",
        "Amazon Athena (SQL Queries)",
        "QuickSight Dashboard"
      ],
      outcomes: [
        "Eliminated manual reporting entirely, establishing automated daily pipeline triggers.",
        "Reduced operational overhead by using serverless analytics architectures.",
        "Created scalable interactive analytics dashboards for trend tracking."
      ]
    }
  },
  {
    id: "audit-stream",
    title: "DynamoDB Real-Time Audit Table",
    focus: "NoSQL Database Mutation Capturing",
    description: "Designed an automated audit trail system for DynamoDB databases, tracking data mutations in real-time for compliance and operational analytics.",
    metric: "Real-time",
    metricLabel: "Data Audit Logging",
    image: "/images/projects/audit_stream.png",
    categories: ["cloud"],
    tech: ["AWS Lambda", "DynamoDB Streams", "S3", "Amazon Kinesis", "Amazon Athena"],
    github: "https://github.com/SouravHalder1996/audit-table-aws-project",
    details: {
      problem: "Lack of transaction log history on DynamoDB tables made it difficult to audit records, debug data states, and comply with strict data change tracking policies.",
      approach: "Enabled DynamoDB Streams to capture insertions, updates, and deletions, routing mutation logs through Kinesis Firehose directly into an S3 data lake.",
      architectureFlow: [
        "DynamoDB Table Mutations",
        "DynamoDB Streams",
        "Kinesis Firehose",
        "S3 Audit Lake",
        "Athena SQL Queries"
      ],
      outcomes: [
        "Created a durable, queryable record of database history with sub-minute latency.",
        "Met auditing compliance requirements without impacting production database read throughput.",
        "Reduced query latency for history scans by indexing S3 partitions via Athena."
      ]
    }
  },
  {
    id: "serverless-web",
    title: "WildRydes Serverless App",
    focus: "Complete Serverless App Ingestion",
    description: "Built an end-to-end serverless ride-sharing web application leveraging AWS serverless services to manage user authentication, ride requests, and backend processing.",
    metric: "Serverless",
    metricLabel: "Zero-Idle Architecture",
    image: "/images/projects/serverless_web.png",
    categories: ["cloud"],
    tech: ["AWS Amplify", "Amazon Cognito", "AWS Lambda", "API Gateway", "DynamoDB", "GitHub"],
    github: "https://github.com/SouravHalder1996/wild-ryde-serverless-aws-project",
    details: {
      problem: "Hosting a traditional app on virtual machines creates high idle server costs, server patching overhead, and scaling delays during rapid user spikes.",
      approach: "Designed a serverless web app hosting the frontend in Amplify, authenticating users via Cognito, and processing ride requests via API Gateway and Lambda.",
      architectureFlow: [
        "Amplify Static Hosting",
        "Cognito User Authentication",
        "Amazon API Gateway",
        "AWS Lambda Execution",
        "Amazon DynamoDB Storage"
      ],
      outcomes: [
        "Eliminated server administration and reduced maintenance cost to zero during idle times.",
        "Achieved scaling capability to handle thousands of requests per second dynamically.",
        "Implemented secure JSON Web Token (JWT) authorization on all API endpoints."
      ]
    }
  },
  {
    id: "medallion-dw",
    title: "Medallion Data Warehouse Schema",
    focus: "Layered Relational Database Design",
    description: "A comprehensive data warehousing solution, cataloging and exploring relational datasets using SQL scripts to structure Bronze, Silver, and Gold layers.",
    metric: "3-Layer",
    metricLabel: "Medallion Structure",
    image: "/images/projects/medallion_dw.png",
    categories: ["sql", "data-engineering"],
    tech: ["SQL", "PostgreSQL", "Data Modeling", "ETL", "DB Schema Design"],
    github: "https://github.com/SouravHalder1996/SQL_Project",
    details: {
      problem: "Raw transactional data models are highly normalized, causing slow analytical queries and messy analytics layers when queried directly.",
      approach: "Designed a Medallion architecture database schema, transforming raw inputs (Bronze), filtering and cleaning them (Silver), and aggregating them into analytical dimensions (Gold).",
      architectureFlow: [
        "Raw Relational Inputs (Bronze)",
        "Cleaned & Denormalized Views (Silver)",
        "Optimized Star-Schema Marts (Gold)",
        "SQL Business Reports"
      ],
      outcomes: [
        "Improved query performance by 45% for business dashboards.",
        "Established clean data quality checks and deduplication in the Silver layer.",
        "Delivered optimized aggregated datasets for regional sales planning."
      ]
    }
  }
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "cloud", label: "Cloud" },
  { id: "data-science", label: "Data Science" },
  { id: "data-engineering", label: "Data Engineering" },
  { id: "sql", label: "SQL" }
];

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter projects dynamically
  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter(p => p.categories.includes(selectedCategory));

  const checkScrollLimits = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    // Wait a brief moment for DOM layout updates
    const timer = setTimeout(() => {
      checkScrollLimits();
    }, 100);

    window.addEventListener("resize", checkScrollLimits);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScrollLimits);
    };
  }, [selectedCategory, filteredProjects]);

  const selectCategoryHandler = (catId: string) => {
    setSelectedCategory(catId);
  };

  // Horizontal Carousel scroll logic
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75; // Scroll 75% of current container width
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background scroll-mt-20">
      {/* Version safe CSS rule for hiding webkit scrollbars locally */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Decorative ambient light */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container max-w-7xl mx-auto px-6">
        
        {/* Section Header + Navigation controls */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-6">
          <div className="flex flex-col items-start gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs font-semibold text-primary uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground font-heading">
              Featured Projects
            </h2>
            <p className="max-w-2xl text-muted-foreground text-sm">
              Architecture-first implementations focused on cloud automation, data pipelines, and machine learning structures.
            </p>
          </div>

          {/* Carousel Arrows */}
          {filteredProjects.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-lg border border-border bg-card/45 hover:bg-muted/40 text-foreground flex items-center justify-center transition-colors active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-lg border border-border bg-card/45 hover:bg-muted/40 text-foreground flex items-center justify-center transition-colors active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => selectCategoryHandler(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold border transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/10"
                  : "bg-card/40 border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={checkScrollLimits}
            className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredProjects.length === 0 ? (
              <div className="w-full text-center py-20 border border-dashed border-border rounded-xl bg-card/10">
                <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm font-mono">No projects found in this domain.</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="w-[290px] sm:w-[360px] flex-shrink-0 snap-start border rounded-xl overflow-hidden bg-white/80 dark:bg-card/30 backdrop-blur-md transition-all duration-300 relative flex flex-col justify-between shadow-lg border-slate-200/80 dark:border-border/60 hover:border-primary/30 hover:-translate-y-1"
                >
                  <div>
                    {/* Top Image Banner */}
                    <div className="relative h-44 bg-slate-950/60 border-b border-border/60 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 290px, 360px"
                        className="object-cover opacity-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                      
                      {/* Ribbon Tag / Metric Badge */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[8px] font-mono text-muted-foreground/80 tracking-wider bg-slate-950/60 px-2 py-0.5 rounded border border-border/30 backdrop-blur-sm">
                          {project.categories.join(" // ").toUpperCase()}
                        </span>
                        
                        <div className="flex items-center gap-1 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded backdrop-blur-sm">
                          <span className="text-xs font-black text-primary font-heading leading-none">
                            {project.metric}
                          </span>
                          <span className="text-[7px] font-mono text-muted-foreground leading-none">
                            {project.metricLabel.split(" ")[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Body Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground mb-1 font-heading line-clamp-1">
                        {project.title}
                      </h3>
                      
                      <p className="text-[10px] font-mono text-primary/80 mb-3 flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" />
                        <span className="line-clamp-1">{project.focus}</span>
                      </p>

                      <p className="text-muted-foreground text-xs leading-relaxed mb-5 line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer tags & Buttons */}
                  <div className="px-5 pb-5 mt-auto">
                    <div className="flex flex-wrap gap-1 mb-5">
                      {project.tech.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded bg-secondary/50 text-secondary-foreground text-[8px] font-mono border border-border/40"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-[8px] font-mono text-muted-foreground/60 px-1 py-0.5">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="pt-3 border-t border-border/20 flex items-center justify-center">
                      <a
                        href={project.github || "https://github.com/SouravHalder1996"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>View in GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>


      </div>
    </section>
  );
}
