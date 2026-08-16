"use client";

import React, { useState } from "react";
import { Mail, MapPin, Calendar, FileText, Send, Check, Copy } from "lucide-react";
import SectionHeaderDotGrid from "./SectionHeaderDotGrid";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setStatus("loading");
    
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      // Fallback to simulation for previewing
      console.warn("Web3Forms access key is not set. Simulating form submission.");
      setTimeout(() => {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      }, 1500);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Message from ${form.name}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Web3Forms submission failed:", data);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err) {
      console.error("Web3Forms connection error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-transparent scroll-mt-20">
      {/* Background ambient accents */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="relative z-10 flex flex-col items-start text-left mb-10 sm:mb-16 gap-3">
          <SectionHeaderDotGrid />
          <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/90 shadow-sm backdrop-blur-md text-xs font-semibold text-primary uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
          </div>
          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground font-heading">
            Get In Touch
          </h2>
          <p className="relative z-10 max-w-2xl text-muted-foreground text-sm sm:text-base">
            Let's collaborate on data pipelines, cloud architecture, or intelligent software automation.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 w-full mx-auto">
          
          {/* Left Column: Info Card Ledger (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="w-full h-full border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-card/25 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-xl shadow-slate-100/50 dark:shadow-none gap-6 sm:gap-8">
              
              <div className="space-y-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest leading-none block">
                    Communication Details
                  </span>
                  <h3 className="text-xl font-bold text-foreground font-heading">
                    Contact Information
                  </h3>
                </div>

                {/* Ledger Items */}
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/50 transition-colors duration-250">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">Email</h4>
                      <button
                        type="button"
                        onClick={() => handleCopy("halder.sourav1996@gmail.com", "email")}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate block text-left cursor-pointer"
                        title="Click to copy email"
                      >
                        halder.sourav1996@gmail.com
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy("halder.sourav1996@gmail.com", "email")}
                      className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      title="Copy Email"
                    >
                      {copiedType === "email" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/50 transition-colors duration-250">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">Location</h4>
                      <span className="text-sm font-semibold text-foreground truncate block">
                        Kolkata, West Bengal, India
                      </span>
                    </div>
                  </div>

                  {/* Birthday */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/50 transition-colors duration-250">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">Birthday</h4>
                      <span className="text-sm font-semibold text-foreground truncate block">
                        July 17, 1996
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials & Resume CTA */}
              <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
                <a
                  href="https://linkedin.com/in/sourav--halder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono font-bold text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://github.com/SouravHalder1996"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono font-bold text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-resume-modal"))}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-mono font-bold transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume PDF</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="w-full h-full border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-card/25 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col justify-between gap-6 sm:gap-8">
              
              <div className="space-y-8 flex-1 flex flex-col">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest leading-none block">
                    Interactive Terminal
                  </span>
                  <h3 className="text-xl font-bold text-foreground font-heading">
                    Send A Message
                  </h3>
                </div>

                {status === "success" ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300 py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center">
                      <Check className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-foreground text-lg">Message Sent Successfully</h4>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        Thank you! Your message has been dispatched. I'll get back to you shortly.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-6">
                    <div className="space-y-6 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            placeholder="John Doe"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            disabled={status === "loading"}
                            className="w-full text-sm px-4 py-3 rounded-xl border border-border bg-white dark:bg-slate-900/40 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 disabled:opacity-50"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            disabled={status === "loading"}
                            className="w-full text-sm px-4 py-3 rounded-xl border border-border bg-white dark:bg-slate-900/40 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 disabled:opacity-50"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                          Message
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          placeholder="Tell me about your project or opportunity..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          disabled={status === "loading"}
                          className="w-full text-sm px-4 py-3 rounded-xl border border-border bg-white dark:bg-slate-900/40 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 resize-none disabled:opacity-50"
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-xs text-rose-500 font-mono">
                          Transmission failed. Please check your connection and try again.
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "loading" || !form.name || !form.email || !form.message}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-sm font-bold hover:bg-primary/95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                      >
                        {status === "loading" ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            <span>Sending Transmission...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
