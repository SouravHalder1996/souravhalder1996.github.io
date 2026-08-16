"use client";

import React, { useState, useEffect } from "react";
import { Award, ExternalLink, X, Calendar, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "./SafeImage";
import SectionHeaderDotGrid from "./SectionHeaderDotGrid";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: "databricks" | "aws" | "collibra" | "awards";
  date: string;
  description: string;
  verifyLink: string;
  image: string;
}

const allCerts: Certificate[] = [
  {
    id: "db-mla",
    title: "Databricks Certified Machine Learning Engineer Associate",
    issuer: "Databricks",
    category: "databricks",
    date: "June 5, 2026",
    description: "Validates the ability to leverage the Databricks platform and its ML capabilities—such as AutoML, Unity Catalog, and MLflow—to execute data exploration, feature engineering, model training, tuning, evaluation, and lifecycle deployment.",
    verifyLink: "https://credentials.databricks.com/0072a61b-ccc9-430e-bf9f-cbefb1fe0244",
    image: "/images/certifications/db-mla.png"
  },
  {
    id: "db-dep",
    title: "Databricks Certified Data Engineer Professional",
    issuer: "Databricks",
    category: "databricks",
    date: "February 7, 2026",
    description: "Assesses advanced data engineering capabilities on Databricks, including delta lake tuning, developer tools, optimization, security, and streaming data pipeline architecture.",
    verifyLink: "https://credentials.databricks.com/b9a49f1b-3636-44d7-8e35-3730dc727666#acc.4ZVNzTnr",
    image: "/images/certifications/db-dep.png"
  },
  {
    id: "db-dea",
    title: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    category: "databricks",
    date: "October 5, 2025",
    description: "Validates ability to use the Databricks Lakehouse Platform to complete introductory data engineering tasks. This includes an understanding of the Lakehouse Platform and its workspace, Apache Spark SQL, and Python in both batch and incrementally processed paradigms.",
    verifyLink: "https://credentials.databricks.com/2f587585-e4fa-43aa-beeb-a0781305e00f#acc.9Dzule8y",
    image: "/images/certifications/db-dea.png"
  },
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    category: "aws",
    date: "June 28, 2023",
    description: "Validates a comprehensive understanding of AWS services and technologies. Demonstrated the ability to build secure, robust, scalable, resilient, and fault-tolerant distributed solutions using design principles based on customer requirements.",
    verifyLink: "https://www.credly.com/badges/350f545b-bfe2-4b7b-87a2-070ec661074b/public_url",
    image: "/images/certifications/aws-saa.png"
  },
  {
    id: "aws-dva",
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    category: "aws",
    date: "October 6, 2023",
    description: "Demonstrates proficiency in writing cloud-native applications with AWS APIs, CLI, and SDKs; using containers; and deploying via secure CI/CD pipelines.",
    verifyLink: "https://www.credly.com/badges/dde45ac6-10f8-4689-a975-eea16699392f/public_url",
    image: "/images/certifications/aws-dva.png"
  },
  {
    id: "aws-aip",
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    category: "aws",
    date: "September 7, 2024",
    description: "Demonstrates understanding of AI, ML, and generative AI concepts, methods, and strategies on AWS, including responsible deployment patterns and model selection.",
    verifyLink: "https://www.credly.com/badges/e4bf7f8b-b205-47e7-946b-fcfd5681dbdf/public_url",
    image: "/images/certifications/aws-aip.png"
  },
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    category: "aws",
    date: "July 28, 2023",
    description: "Demonstrates a foundational understanding of IT services and their uses in the AWS Cloud. Validates cloud fluency and foundational AWS knowledge.",
    verifyLink: "https://www.credly.com/badges/89828c78-d29f-4374-aa61-b0ff77f2ddc3/public_url",
    image: "/images/certifications/aws-ccp.png"
  },
  {
    id: "col-sa",
    title: "Collibra Solution Architect Certification",
    issuer: "Collibra",
    category: "collibra",
    date: "December 20, 2024",
    description: "Validates technical leadership capabilities in operating model architecture, operating design, sizing, governance framework, and enterprise deployment of Collibra nodes.",
    verifyLink: "https://www.credly.com/badges/1e090003-3b2d-4353-949c-ea29125d3a74/public_url",
    image: "/images/certifications/col-sa.png"
  },
  {
    id: "col-we",
    title: "Collibra Workflow Engineer Certification",
    issuer: "Collibra",
    category: "collibra",
    date: "October 28, 2024",
    description: "Validates capabilities to design, develop, package, and deploy custom BPMN workflow automation processes on the Collibra platform.",
    verifyLink: "https://www.credly.com/badges/f0e31ad3-65b3-4bad-b1eb-14ac9efa1d10/public_url",
    image: "/images/certifications/col-we.png"
  },
  {
    id: "col-ie",
    title: "Collibra Integration Engineer Certification",
    issuer: "Collibra",
    category: "collibra",
    date: "October 28, 2024",
    description: "Demonstrates ability to design, build, test, and troubleshoot secure API integrations and middleware utilizing Collibra Java and REST APIs.",
    verifyLink: "https://www.credly.com/badges/d5e933bc-8006-4dd3-a12b-eddc6f412faf/public_url",
    image: "/images/certifications/col-ie.png"
  },
  {
    id: "col-ds",
    title: "Collibra Data Steward Certification",
    issuer: "Collibra",
    category: "collibra",
    date: "November 22, 2024",
    description: "Validates proficiency in documenting enterprise data assets, establishing common shared business glossaries, and collaborating across data steward domains.",
    verifyLink: "https://www.credly.com/badges/9f8f5b32-68b9-40f0-a7a3-a912e994af42/public_url",
    image: "/images/certifications/col-ds.png"
  },
  {
    id: "col-aigov",
    title: "Collibra AI Governance-Ready",
    issuer: "Collibra",
    category: "collibra",
    date: "October 15, 2024",
    description: "Verifies completion of AI Governance implementation patterns, regulatory frameworks, and governance compliance principles on the Collibra platform.",
    verifyLink: "https://www.credly.com/badges/e256d21d-27dc-434f-b6bc-dc76fffdcd70/public_url",
    image: "/images/certifications/col-aigov.png"
  },
  {
    id: "infosys-award",
    title: "Infosys RISE INSTA Awards",
    issuer: "Infosys Limited",
    category: "awards",
    date: "November, 2023",
    description: "Recognition for exceptional performance in handling product teams, resolving critical incidents during system migrations, and demonstrating team leadership.",
    verifyLink: "",
    image: "/images/certifications/infosys-award.png"
  }
];

// 4 sets of items translated by -25% creates a 100% mathematically continuous, gap-free loop on all screen widths up to 4K
const marqueeList = [...allCerts, ...allCerts, ...allCerts, ...allCerts];

export default function Credentials() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Lock body scroll and listen for Escape key when modal is active
  useEffect(() => {
    if (selectedCert) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedCert(null);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedCert]);

  // Is marquee paused on hover OR when a modal is open
  const isPaused = isHovered || selectedCert !== null;

  return (
    <section id="credentials" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-transparent scroll-mt-20">
      {/* Anchor for backwards compatibility */}
      <div id="achievements" className="absolute -top-24 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/3 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Centered Page Content Container */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="relative z-10 flex flex-col items-start text-left gap-3 mb-8 sm:mb-10">
          <SectionHeaderDotGrid />
          <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/90 shadow-sm backdrop-blur-md text-xs font-semibold text-primary uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Recognition</span>
          </div>
          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground font-heading">
            Achievements & Certifications
          </h2>
          <p className="relative z-10 max-w-2xl text-muted-foreground text-sm sm:text-base">
            Professional certifications and recognition earned throughout my career. Click any badge to view credentials.
          </p>
        </div>

        {/* Infinite Horizontal Carousel strictly contained within the centered max-w-7xl container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full overflow-hidden py-3 marquee-container select-none"
        >
          {/* Left & Right Gradient Shadows contained within the container */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Single unified marquee track with -50% translateX translation */}
          <div
            className="animate-marquee flex flex-nowrap shrink-0"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {marqueeList.map((cert, index) => (
              <div
                key={`${cert.id}-${index}`}
                onClick={() => setSelectedCert(cert)}
                className="achievement-badge flex-shrink-0 mr-3 sm:mr-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl bg-white dark:bg-[#18181b] border border-slate-200/90 dark:border-white/10 p-2.5 sm:p-3.5 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md hover:border-primary/60 dark:hover:border-primary/60 transition-colors duration-200 relative"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
                  <SafeImage
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain filter drop-shadow-sm transition-none"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="relative w-full max-w-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#18181b] rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-border bg-slate-100 dark:bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center space-y-5">
                {/* Badge Frame */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center p-4 shadow-md">
                  <SafeImage
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="space-y-2 max-w-sm">
                  <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest leading-none block">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="text-xl font-bold text-foreground leading-snug">
                    {selectedCert.title}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-slate-50 dark:bg-slate-900 border border-border/40 px-2.5 py-1 rounded-lg">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>Earned: {selectedCert.date}</span>
                  </div>
                </div>

                <div className="w-full h-px bg-border/40" />

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedCert.description}
                </p>

                {/* Actions */}
                <div className="w-full pt-3 flex gap-3">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="flex-1 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-card font-mono text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-card/80 transition-all duration-200"
                  >
                    Close
                  </button>

                  {selectedCert.verifyLink && (
                    <a
                      href={selectedCert.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-bold hover:bg-primary/95 transition-all duration-200 shadow-sm hover:shadow"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
