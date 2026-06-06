"use client";

import { useState } from "react";
import { Award, ExternalLink, X, Calendar, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  verifyLink: string;
  image: string;
}

const allCerts: Certificate[] = [
  {
    id: "db-dep",
    title: "Databricks Certified Data Engineer Professional",
    issuer: "Databricks",
    date: "February 7, 2026",
    description: "Assesses advanced data engineering capabilities on Databricks, including delta lake tuning, developer tools, optimization, security, and streaming data pipeline architecture.",
    verifyLink: "https://credentials.databricks.com/b9a49f1b-3636-44d7-8e35-3730dc727666#acc.4ZVNzTnr",
    image: "/images/certifications/db-dep.png"
  },
  {
    id: "db-dea",
    title: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    date: "October 5, 2025",
    description: "Validates ability to use the Databricks Lakehouse Platform to complete introductory data engineering tasks. This includes an understanding of the Lakehouse Platform and its workspace, Apache Spark SQL, and Python in both batch and incrementally processed paradigms.",
    verifyLink: "https://credentials.databricks.com/2f587585-e4fa-43aa-beeb-a0781305e00f#acc.9Dzule8y",
    image: "/images/certifications/db-dea.png"
  },
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "June 28, 2023",
    description: "Validates a comprehensive understanding of AWS services and technologies. Demonstrated the ability to build secure, robust, scalable, resilient, and fault-tolerant distributed solutions using design principles based on customer requirements.",
    verifyLink: "https://www.credly.com/badges/350f545b-bfe2-4b7b-87a2-070ec661074b/public_url",
    image: "/images/certifications/aws-saa.png"
  },
  {
    id: "aws-dva",
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "October 6, 2023",
    description: "Demonstrates proficiency in writing cloud-native applications with AWS APIs, CLI, and SDKs; using containers; and deploying via secure CI/CD pipelines.",
    verifyLink: "https://www.credly.com/badges/dde45ac6-10f8-4689-a975-eea16699392f/public_url",
    image: "/images/certifications/aws-dva.png"
  },
  {
    id: "aws-aip",
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    date: "September 7, 2024",
    description: "Demonstrates understanding of AI, ML, and generative AI concepts, methods, and strategies on AWS, including responsible deployment patterns and model selection.",
    verifyLink: "https://www.credly.com/badges/e4bf7f8b-b205-47e7-946b-fcfd5681dbdf/public_url",
    image: "/images/certifications/aws-aip.png"
  },
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "July 28, 2023",
    description: "Demonstrates a foundational understanding of IT services and their uses in the AWS Cloud. Validates cloud fluency and foundational AWS knowledge.",
    verifyLink: "https://www.credly.com/badges/89828c78-d29f-4374-aa61-b0ff77f2ddc3/public_url",
    image: "/images/certifications/aws-ccp.png"
  },
  {
    id: "col-sa",
    title: "Collibra Solution Architect Certification",
    issuer: "Collibra",
    date: "December 20, 2024",
    description: "Validates technical leadership capabilities in operating model architecture, operating design, sizing, governance framework, and enterprise deployment of Collibra nodes.",
    verifyLink: "https://www.credly.com/badges/1e090003-3b2d-4353-949c-ea29125d3a74/public_url",
    image: "/images/certifications/col-sa.png"
  },
  {
    id: "col-we",
    title: "Collibra Workflow Engineer Certification",
    issuer: "Collibra",
    date: "October 28, 2024",
    description: "Validates capabilities to design, develop, package, and deploy custom BPMN workflow automation processes on the Collibra platform.",
    verifyLink: "https://www.credly.com/badges/f0e31ad3-65b3-4bad-b1eb-14ac9efa1d10/public_url",
    image: "/images/certifications/col-we.png"
  },
  {
    id: "col-ie",
    title: "Collibra Integration Engineer Certification",
    issuer: "Collibra",
    date: "October 28, 2024",
    description: "Demonstrates ability to design, build, test, and troubleshoot secure API integrations and middleware utilizing Collibra Java and REST APIs.",
    verifyLink: "https://www.credly.com/badges/d5e933bc-8006-4dd3-a12b-eddc6f412faf/public_url",
    image: "/images/certifications/col-ie.png"
  },
  {
    id: "col-ds",
    title: "Collibra Data Steward Certification",
    issuer: "Collibra",
    date: "November 22, 2024",
    description: "Validates proficiency in documenting enterprise data assets, establishing common shared business glossaries, and collaborating across data steward domains.",
    verifyLink: "https://www.credly.com/badges/9f8f5b32-68b9-40f0-a7a3-a912e994af42/public_url",
    image: "/images/certifications/col-ds.png"
  },
  {
    id: "col-aigov",
    title: "Collibra AI Governance-Ready",
    issuer: "Collibra",
    date: "October 15, 2024",
    description: "Verifies completion of AI Governance implementation patterns, regulatory frameworks, and governance compliance principles on the Collibra platform.",
    verifyLink: "https://www.credly.com/badges/e256d21d-27dc-434f-b6bc-dc76fffdcd70/public_url",
    image: "/images/certifications/col-aigov.png"
  },
  {
    id: "infosys-award",
    title: "Infosys RISE INSTA Awards",
    issuer: "Infosys Limited",
    date: "November, 2023",
    description: "Recognition for exceptional performance in handling product teams, resolving critical incidents during system migrations, and demonstrating team leadership.",
    verifyLink: "",
    image: "/images/certifications/infosys-award.png"
  }
];

export default function Credentials() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const renderMarqueeTrack = (certs: Certificate[], speedClass: string) => {
    // Quadruple the array to guarantee cover on 2K, 4K, and ultra-wide displays
    const repeatedCerts = [...certs, ...certs, ...certs, ...certs];
    return (
      <div className="flex overflow-hidden relative w-full py-4">
        <div
          className={`flex gap-16 sm:gap-24 items-center ${speedClass}`}
          style={{ animationPlayState: selectedCert ? "paused" : undefined }}
        >
          {repeatedCerts.map((cert, idx) => (
            <img
              key={`${cert.id}-${idx}`}
              src={cert.image}
              alt={cert.title}
              onClick={() => setSelectedCert(cert)}
              className="h-20 sm:h-24 md:h-28 w-auto object-contain cursor-pointer transition-all duration-300 hover:scale-112 filter drop-shadow-md dark:drop-shadow-[0_4px_16px_rgba(255,255,255,0.06)] hover:drop-shadow-xl dark:hover:drop-shadow-[0_6px_24px_rgba(255,255,255,0.12)] flex-shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="credentials" className="py-24 relative overflow-hidden bg-background scroll-mt-20">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left gap-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs font-semibold text-primary uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground font-heading">
            Certifications & Recognition
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            Professional cloud architecture, data engineering, and governance credentials. Click any badge to verify.
          </p>
        </div>

        {/* Marquee Wrapper with soft edge gradients (seamless transparent container) */}
        <div className="relative w-full overflow-hidden marquee-container py-4 flex flex-col gap-6 select-none bg-transparent">
          {/* Horizontal edge fade masks */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Track: Right to Left containing all 12 certifications */}
          {renderMarqueeTrack(allCerts, "animate-marquee")}
        </div>
      </div>

      {/* Modern Glassmorphic Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-lg border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-card/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-border bg-slate-50 dark:bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center space-y-6">
                {/* Large Badge Frame */}
                <div className="w-24 h-24 bg-white border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center p-4 shadow-md">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Header Information */}
                <div className="space-y-2 max-w-sm">
                  <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest leading-none block">
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

                {/* Divider */}
                <div className="w-full h-px bg-border/40" />

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedCert.description}
                </p>

                {/* Footer Buttons */}
                <div className="w-full pt-4 flex gap-3">
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
