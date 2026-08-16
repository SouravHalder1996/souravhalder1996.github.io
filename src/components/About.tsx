"use client";

import { motion, Variants } from "framer-motion";
import { Cloud, Brain, Bot, ChevronRight, Sparkles, Server } from "lucide-react";
import SectionHeaderDotGrid from "./SectionHeaderDotGrid";

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  features: string[];
  gradient: string;
  layer: string;
}

const services: ServiceCard[] = [
  {
    title: "Agentic AI & GenAI Systems",
    description: "Architecting autonomous multi-agent workflows, tool-calling agents, and AWS Bedrock Knowledge Bases. Specializing in LangChain, LangGraph state machines, n8n automations, Portkey AI gateway, and Confident AI evaluations.",
    icon: <Bot className="w-6 h-6 text-emerald-400" />,
    tags: ["LangChain", "LangGraph", "n8n", "Portkey AI", "AWS Bedrock", "Confident AI"],
    features: [
      "Multi-Agent Orchestration",
      "AWS Bedrock Knowledge Bases",
      "n8n Workflow Automation",
      "Portkey Gateway & Evals"
    ],
    gradient: "from-emerald-500/15 via-transparent to-transparent",
    layer: "AGENTIC & GENAI LAYER",
  },
  {
    title: "AI/ML & Data Science",
    description: "Training predictive models, deep neural networks, and anomaly detection pipelines. Transforming telemetry into actionable machine intelligence.",
    icon: <Brain className="w-6 h-6 text-violet-400" />,
    tags: ["Python", "TensorFlow", "Scikit-Learn", "MLflow", "DVC", "Matplotlib", "Seaborn", "NumPy", "Pandas"],
    features: [
      "Predictive Machine Learning",
      "Anomaly Detection Systems",
      "Neural Network Modeling",
      "Feature Engineering & MLflow"
    ],
    gradient: "from-violet-500/15 via-transparent to-transparent",
    layer: "INTELLIGENCE & ML LAYER",
  },
  {
    title: "AWS Cloud Architecture",
    description: "Designing enterprise-grade, cost-optimized cloud architectures on AWS and modern Lakehouses. 4x AWS Certified & 3x Databricks Certified.",
    icon: <Cloud className="w-6 h-6 text-blue-400" />,
    tags: ["AWS", "Lambda", "ECS Fargate", "S3", "Redshift", "RDS", "DynamoDB", "Databricks", "AWS Glue"],
    features: [
      "AWS Serverless & Containers",
      "Medallion Lakehouse (Delta / Iceberg)",
      "Multi-AZ Cloud Resiliency",
      "Managed RDS, DynamoDB & Redshift"
    ],
    gradient: "from-blue-500/15 via-transparent to-transparent",
    layer: "CLOUD ARCHITECTURE LAYER",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 16 },
  },
};

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-transparent scroll-mt-20">
      {/* Decorative light accent element */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="relative z-10 flex flex-col items-start text-left mb-10 sm:mb-16 gap-3">
          <SectionHeaderDotGrid />
          <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/90 shadow-sm backdrop-blur-md text-xs font-semibold text-primary uppercase tracking-wider">
            <Server className="w-3.5 h-3.5" />
            <span>What I Do</span>
          </div>
          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground font-heading">
            Expertise & Services
          </h2>
          <p className="relative z-10 max-w-2xl text-muted-foreground text-sm sm:text-base">
            Bridging the gap between raw data systems, machine learning models, and secure cloud orchestration.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="border border-slate-200/80 dark:border-border/60 bg-white/80 dark:bg-card/30 backdrop-blur-md rounded-xl p-6 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[440px] group relative overflow-hidden transition-colors duration-300 hover:border-primary/30 shadow-lg"
            >
              {/* Subtle card-wide ambient glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-border/80 bg-muted/40 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">
                    0{index + 1} // {service.layer}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 font-heading group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                  {service.description}
                </p>

                {/* Sub Features */}
                <ul className="space-y-2 mb-5 sm:mb-6">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground/80 font-mono">
                      <ChevronRight className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-border/40">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-secondary/50 text-secondary-foreground text-[10px] font-mono border border-border/40 transition-colors hover:border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
