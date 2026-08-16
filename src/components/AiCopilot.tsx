"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Copy,
  Check,
  RotateCcw,
  User,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import { FAQ_KNOWLEDGE, FaqItem } from "@/data/aiKnowledge";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const suggestedPrompts = [
  "What is your experience in AI/ML & Data Science?",
  "Tell me about your Agentic AI & n8n automation workflows",
  "How do you build RAG chatbots & knowledge bases?",
  "Tell me about your Cloud Architecture experience with AWS",
  "Which 10+ Databricks & AWS certifications do you hold?",
  "What is your notice period, expected CTC and relocation preference?",
  "How can I contact Sourav or download his resume?",
];

// Stop-words to filter out from user query for accurate scoring
const stopWords = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but",
  "by", "can", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from",
  "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him",
  "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just", "me",
  "more", "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
  "other", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so",
  "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there",
  "these", "they", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was",
  "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "with", "would",
  "you", "your", "yours", "yourself", "yourselves", "tell", "show", "give", "know"
]);

// Conversational direct greeting triggers
const greetingTriggers = ["hi", "hello", "hey", "greetings", "good morning", "good evening", "who are you", "what can you do", "help"];

// Multi-dimensional contextual scoring algorithm using granular FAQ_KNOWLEDGE
function generateAnswer(rawQuery: string): string {
  const query = rawQuery.toLowerCase().replace(/['’]/g, "").trim();
  if (!query) {
    return "Please ask a question regarding Sourav's experience in AI/ML, Data Science, Agentic AI, Cloud Architecture, or certifications!";
  }

  // 1. Direct Conversational Greetings
  if (greetingTriggers.some(g => query === g || query === g + "!" || query.startsWith(g + " "))) {
    return `👋 Hello! I am **Sourav's AI Assistant**. I can give you verified, direct answers about:

* 🧠 **AI/ML & Data Science**: Machine learning modeling, Scikit-Learn, TensorFlow, MLflow, DVC, telemetry anomaly detection.
* ⚡ **Agentic AI & GenAI**: Multi-agent workflows (LangChain, LangGraph), Portkey AI gateway, n8n automations.
* 📚 **RAG & Knowledge Bases**: AWS Bedrock Managed Knowledge Bases (PaaS document ingestion & conversational retrieval).
* ☁️ **Cloud Architecture**: Scalable AWS cloud infrastructure (4x certified), serverless Lambda, ECS, event-driven pipelines.
* 🏆 **Certifications**: 10+ verified credentials across Databricks (3x) and AWS (4x).
* 🎓 **Education**: M.Tech Robotics & AI from Jadavpur University (90.36% Distinction).
* 📬 **Contact & Hiring**: Notice period (90 days / early buyout), expected CTC (~18 LPA), relocation (Bangalore/Hyderabad/Pune/Remote), resume download.

What specific question or topic can I answer for you?`;
  }

  // Tokenize and clean query
  const rawTokens = query.replace(/[^\w\s-]/g, " ").split(/\s+/).filter(Boolean);
  const isGreetingWord = (t: string) => greetingTriggers.includes(t);
  const meaningfulTokens = rawTokens.filter(t => !isGreetingWord(t));
  const effectiveTokens = meaningfulTokens.length > 0 ? meaningfulTokens : rawTokens;

  // Multi-stage scoring with category boost and length normalization
  const scoredItems = FAQ_KNOWLEDGE.map((item) => {
    let score = 0;

    // 1. Exact phrase matches in questions (Highest priority)
    for (const q of item.questions) {
      if (query.includes(q)) score += 12;
      else if (q.includes(query) && query.length > 3) score += 8;
    }

    // 2. Keyword exact & partial matching
    for (const kw of item.keywords) {
      if (query.includes(kw)) {
        score += 5;
      } else {
        const kwParts = kw.split(" ");
        for (const token of effectiveTokens) {
          if (token.length > 2 && kwParts.some(kp => kp === token)) {
            score += 3;
          }
        }
      }
    }

    // 3. Question token matching
    for (const q of item.questions) {
      const qTokens = q.split(" ");
      for (const token of effectiveTokens) {
        if (token.length > 2 && qTokens.includes(token)) {
          score += 2;
        }
      }
    }

    // 4. Boost for high-value core categories if related keywords match
    if (item.category === "Profile" && (query.includes("who") || query.includes("about") || query.includes("sourav"))) score += 6;
    if (item.category === "Contact" && (query.includes("contact") || query.includes("email") || query.includes("reach") || query.includes("hiring"))) score += 6;
    if (item.category === "Compensation & Notice" && (query.includes("ctc") || query.includes("salary") || query.includes("notice") || query.includes("location"))) score += 6;
    if (item.category === "Agentic AI & GenAI" && (query.includes("agent") || query.includes("rag") || query.includes("bedrock") || query.includes("llm") || query.includes("genai"))) score += 5;
    if (item.category === "Certifications" && (query.includes("cert") || query.includes("credential") || query.includes("badge") || query.includes("aws") || query.includes("databricks"))) score += 4;

    return { item, score };
  });

  scoredItems.sort((a, b) => b.score - a.score);
  const topMatch = scoredItems[0];

  // 2. Return high-confidence match
  if (topMatch && topMatch.score >= 3) {
    if (topMatch.item.id === "direct_contact_info" || topMatch.item.id === "recruiter_quick_summary") {
      return topMatch.item.answer;
    }
    return topMatch.item.answer;
  }

  // 3. Contextual Fallback for Unmatched / Off-Topic Queries
  return `I want to make sure I give you the most accurate answer regarding Sourav's profile.

While I couldn't find an exact answer for **"${rawQuery}"**, here are the specific topics you can ask me about:

* ⚡ **Agentic AI & GenAI**: Multi-agent workflows, LangChain, LangGraph, Portkey AI gateway, AWS Bedrock RAG.
* 🧠 **Data Science & ML**: Predictive modeling, Scikit-Learn, TensorFlow, MLflow, DVC.
* 🚀 **Apache Iceberg & AWS**: 93.75% volume reduction, AWS Glue, Delta Lake, 14 Redshift data marts.
* 🏆 **Certifications**: 10+ verified badges from Databricks (ML Associate, DE Professional) & AWS.
* 🎓 **Education**: M.Tech in Intelligent Automation & Robotics from Jadavpur University (90.36%).
* 📬 **Contact**: Email, LinkedIn, GitHub, or Resume download.

Feel free to click any suggestion below or ask a more specific technical question!`;
}

// Interactive Copy-on-Click Component for Email
function CopyableContact({ textToCopy, label }: { textToCopy: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Click to copy: ${textToCopy}`}
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 border border-teal-500/30 transition-all text-xs font-semibold cursor-pointer group my-0.5 align-middle"
    >
      <span>{label}</span>
      {copied ? (
        <span className="inline-flex items-center gap-0.5 text-emerald-400 text-[11px] font-bold">
          <Check className="w-3 h-3 text-emerald-400" />
          <span>Copied!</span>
        </span>
      ) : (
        <Copy className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}

// Inline Markdown Parser for bolding, italics, code, links, and copyable email
function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Sanitize common LaTeX and ASCII arrows to clean Unicode characters
  const sanitized = text
    .replace(/\$\\to\$/g, "→")
    .replace(/\$\s*\\to\s*\$/g, "→")
    .replace(/\\to/g, "→")
    .replace(/\$\\rightarrow\$/g, "→")
    .replace(/\\rightarrow/g, "→")
    .replace(/-->/g, "→");

  // Regex splitting by bold (**text**), code (`text`), link ([label](url)), italics (*text*), or email
  const tokens = sanitized.split(
    /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*|halder\.sourav1996@gmail\.com)/g
  );

  return tokens.map((token, index) => {
    if (!token) return null;

    // Direct plain-text email match
    if (token === "halder.sourav1996@gmail.com") {
      return <CopyableContact key={index} textToCopy="halder.sourav1996@gmail.com" label="halder.sourav1996@gmail.com" />;
    }

    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    }

    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-muted font-mono text-[11px] text-teal-500 font-semibold border border-border/60"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
      const match = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        const label = match[1];
        const url = match[2];

        // Intercept emails so they are copied rather than opening mail client
        const isEmail = url.startsWith("mailto:") || label.includes("@");

        if (isEmail) {
          const rawValue = url.replace(/^mailto:/, "").trim() || label;
          return <CopyableContact key={index} textToCopy={rawValue} label={label} />;
        }

        if (url.includes("Sourav_Halder_Resume.pdf")) {
          return (
            <button
              key={index}
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume-modal"))}
              className="text-teal-400 hover:text-teal-300 underline underline-offset-2 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          );
        }

        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300 underline underline-offset-2 font-medium inline-flex items-center gap-0.5"
          >
            {label}
            <ArrowUpRight className="w-3 h-3 opacity-80" />
          </a>
        );
      }
    }

    if (token.startsWith("*") && token.endsWith("*") && !token.startsWith("**")) {
      return (
        <em key={index} className="italic text-muted-foreground">
          {token.slice(1, -1)}
        </em>
      );
    }

    return <span key={index}>{token}</span>;
  });
}

// Full Structured Markdown Renderer
function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed text-foreground select-text">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Horizontal Rule (---)
        if (trimmed === "---") {
          return <hr key={idx} className="my-3 border-border/60" />;
        }

        // Heading (### Header)
        if (line.startsWith("### ")) {
          const headerText = line.replace("### ", "");
          return (
            <div key={idx} className="pt-1 pb-0.5">
              <h4 className="font-bold text-sm text-teal-400 flex items-center gap-1.5">
                {parseInlineMarkdown(headerText)}
              </h4>
            </div>
          );
        }

        // Numbered list item (e.g. 1. Item)
        const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-1">
              <span className="font-mono text-teal-400 font-bold text-xs mt-0.5 flex-shrink-0">
                {numberedMatch[1]}.
              </span>
              <div className="flex-1">{parseInlineMarkdown(numberedMatch[2])}</div>
            </div>
          );
        }

        // Sub-bullet (indented bullet)
        if (line.startsWith("  * ") || line.startsWith("    * ")) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-5 my-0.5 text-muted-foreground">
              <span className="text-teal-400/80 font-bold text-xs flex-shrink-0 mt-0.5">◦</span>
              <div className="flex-1">{parseInlineMarkdown(line.replace(/^\s*\*\s+/, ""))}</div>
            </div>
          );
        }

        // Bullet point (* Bullet)
        if (line.startsWith("* ") || line.startsWith("- ")) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1.5 my-1">
              <span className="text-teal-400 font-bold text-sm flex-shrink-0 leading-none mt-1">•</span>
              <div className="flex-1">{parseInlineMarkdown(line.slice(2))}</div>
            </div>
          );
        }

        // Regular paragraph
        return <p key={idx}>{parseInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}

export default function AiCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "👋 Hi! I'm **Sourav's AI Assistant**. Ask me anything about his **Agentic AI workflows, GenAI architectures, Data Science models, Apache Iceberg pipelines**, or **Databricks & AWS certifications**!",
      timestamp: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Listen for global custom event to trigger AI Assistant
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-ai-copilot", handleOpen);
    return () => window.removeEventListener("open-ai-copilot", handleOpen);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen, isTyping, streamedText]);

  // Lock background body scroll when AI modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Close chat window on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Clean up any streaming intervals on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMessage: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsTyping(true);
    setStreamedText("");

    const fullResponse = generateAnswer(query);
    const words = fullResponse.split(" ");
    let wordIndex = 0;

    // Smooth, natural word-chunk streaming that preserves Markdown formatting
    streamIntervalRef.current = setInterval(() => {
      wordIndex += 2;
      if (wordIndex >= words.length) {
        if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
        const aiMessage: Message = {
          id: "ai-" + Date.now(),
          sender: "ai",
          text: fullResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setStreamedText("");
        setIsTyping(false);
      } else {
        setStreamedText(words.slice(0, wordIndex).join(" "));
      }
    }, 25);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleClear = () => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    setIsTyping(false);
    setStreamedText("");
    setMessages([
      {
        id: "welcome-" + Date.now(),
        sender: "ai",
        text: "Session refreshed. Ask anything about Sourav's Agentic AI, GenAI, or Data Science experience!",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button: perfectly matching size and vibe with ScrollToTop button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Sourav AI Assistant"
        className="fixed bottom-5 sm:bottom-6 right-16 sm:right-22 z-50 h-10 sm:h-11 px-3 sm:px-4 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-[#090b0e]/70 backdrop-blur-md shadow-lg shadow-slate-100/50 dark:shadow-none hover:shadow-primary/20 dark:hover:shadow-primary/10 hover:border-primary/50 text-foreground hover:text-primary flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 group cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-xs font-semibold tracking-wide">Ask AI</span>
        <div className="absolute inset-0 rounded-full border border-primary/0 group-hover:border-primary/20 transition-all duration-300 scale-105 pointer-events-none" />
      </motion.button>

      {/* AI Assistant Modal Backdrop & Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overscroll-contain"
          >
            {/* Modal Box */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{
                duration: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full max-w-2xl h-[580px] sm:h-[620px] max-h-[90vh] bg-card border border-border/90 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative overscroll-contain"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/80 bg-muted/30 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sourav AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">AI Assistant</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Online" />
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleClear}
                    title="Reset chat"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 text-left overscroll-contain">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "ai" && (
                      <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 flex-shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`relative max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground font-medium rounded-tr-none text-xs sm:text-[13px]"
                          : "bg-muted/50 dark:bg-slate-900/70 border border-border rounded-tl-none"
                      }`}
                    >
                      {/* Formatted Markdown Body */}
                      {msg.sender === "ai" ? (
                        <MarkdownRenderer content={msg.text} />
                      ) : (
                        <p>{msg.text}</p>
                      )}

                      {/* Footer & Copy */}
                      <div className="flex items-center justify-between pt-1.5 text-[10px] text-muted-foreground/80 border-t border-border/40 mt-2">
                        <span>{msg.timestamp}</span>
                        {msg.sender === "ai" && (
                          <button
                            onClick={() => handleCopy(msg.text, msg.id)}
                            className="flex items-center gap-1 text-[10px] hover:text-foreground transition-colors ml-3 cursor-pointer"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {msg.sender === "user" && (
                      <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Live Real-time Streaming State with Full Markdown Formatting */}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 flex-shrink-0">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-none px-4 py-3 bg-muted/50 dark:bg-slate-900/70 border border-border text-foreground">
                      {streamedText ? (
                        <div>
                          <MarkdownRenderer content={streamedText} />
                          <span className="inline-block w-2 h-3.5 bg-teal-400 ml-1 animate-pulse rounded-sm align-middle" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 py-1 text-xs font-mono text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                          <span>Synthesizing response...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Prompt Suggestions Pills */}
              <div className="px-5 py-2 border-t border-border/50 bg-background/50 overflow-x-auto flex items-center gap-2 no-scrollbar">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex-shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-400" /> Suggestions:
                </span>
                {suggestedPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSend(prompt)}
                    className="flex-shrink-0 text-[11px] px-3 py-1 rounded-full border border-border bg-card/60 hover:bg-teal-500/10 hover:border-teal-500/40 hover:text-teal-400 transition-all text-muted-foreground whitespace-nowrap cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-4 border-t border-border bg-card/80 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Agentic AI, GenAI, Data Science, AWS Glue, Databricks..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/40 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 text-xs shadow-md cursor-pointer"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
