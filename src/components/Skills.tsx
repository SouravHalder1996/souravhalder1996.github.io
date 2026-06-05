"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Code2,
  FolderOpen,
  FolderClosed,
  FileCode,
  FileText,
  ChevronRight,
  ChevronDown,
  X,
  GitBranch,
  Bell,
  CheckCircle2,
  Terminal,
} from "lucide-react";

/* ───────────────────────────────────────────
 * Types
 * ─────────────────────────────────────────── */
interface SkillItem {
  name: string;
  icon: string; // devicon class (use 'colored' suffix for brand colors)
}

interface SkillFile {
  id: string;
  filename: string;
  language: string;
  langIcon: string; // devicon
  langColor: string; // syntax accent
  comment: string;
  groups: { groupName: string; skills: SkillItem[] }[];
}

/* ───────────────────────────────────────────
 * Skill Data
 * ─────────────────────────────────────────── */
const skillFiles: SkillFile[] = [
  {
    id: "ds",
    filename: "data_science.ipynb",
    language: "Jupyter Notebook",
    langIcon: "devicon-jupyter-plain colored",
    langColor: "text-orange-400",
    comment: "# Core Manipulation & Deep Learning toolkit",
    groups: [
      {
        groupName: "Core Manipulation",
        skills: [
          { name: "Python", icon: "devicon-python-plain colored" },
          { name: "Pandas", icon: "devicon-pandas-original colored" },
          { name: "NumPy", icon: "devicon-numpy-original colored" },
          { name: "Matplotlib", icon: "devicon-matplotlib-original colored" },
        ],
      },
      {
        groupName: "Deep Learning",
        skills: [
          { name: "TensorFlow", icon: "devicon-tensorflow-original colored" },
          { name: "PyTorch", icon: "devicon-python-plain colored" },
          { name: "Scikit-Learn", icon: "devicon-python-plain colored" },
          { name: "OpenCV", icon: "devicon-opencv-original colored" },
        ],
      },
      {
        groupName: "ML Ops",
        skills: [
          { name: "MLflow", icon: "devicon-python-plain colored" },
          { name: "LangChain", icon: "devicon-python-plain colored" },
          { name: "Hugging Face", icon: "devicon-python-plain colored" },
          { name: "Jupyter", icon: "devicon-jupyter-plain colored" },
        ],
      },
    ],
  },
  {
    id: "cloud",
    filename: "cloud_infra.yml",
    language: "YAML",
    langIcon: "devicon-amazonwebservices-plain-wordmark colored",
    langColor: "text-sky-400",
    comment: "# Cloud & DevOps infrastructure stack",
    groups: [
      {
        groupName: "AWS Services",
        skills: [
          { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark colored" },
          { name: "S3", icon: "devicon-amazonwebservices-plain-wordmark colored" },
          { name: "Lambda", icon: "devicon-amazonwebservices-plain-wordmark colored" },
          { name: "Glue", icon: "devicon-amazonwebservices-plain-wordmark colored" },
        ],
      },
      {
        groupName: "Databases",
        skills: [
          { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
          { name: "Redshift", icon: "devicon-amazonwebservices-plain-wordmark colored" },
          { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
          { name: "Redis", icon: "devicon-redis-plain colored" },
        ],
      },
      {
        groupName: "DevOps & Containers",
        skills: [
          { name: "Docker", icon: "devicon-docker-plain colored" },
          { name: "Terraform", icon: "devicon-terraform-plain colored" },
          { name: "GitHub Actions", icon: "devicon-github-original colored" },
          { name: "Linux", icon: "devicon-linux-plain colored" },
        ],
      },
    ],
  },
  {
    id: "lang",
    filename: "languages.py",
    language: "Python",
    langIcon: "devicon-python-plain colored",
    langColor: "text-yellow-400",
    comment: "# Programming languages & web frameworks",
    groups: [
      {
        groupName: "Primary Languages",
        skills: [
          { name: "Python", icon: "devicon-python-plain colored" },
          { name: "SQL", icon: "devicon-azuresqldatabase-plain colored" },
          { name: "JavaScript", icon: "devicon-javascript-plain colored" },
          { name: "TypeScript", icon: "devicon-typescript-plain colored" },
        ],
      },
      {
        groupName: "Web Frameworks",
        skills: [
          { name: "React", icon: "devicon-react-original colored" },
          { name: "Next.js", icon: "devicon-nextjs-original colored" },
          { name: "Flask", icon: "devicon-flask-original colored" },
          { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
        ],
      },
      {
        groupName: "Data Tooling",
        skills: [
          { name: "Apache Spark", icon: "devicon-apachespark-plain colored" },
          { name: "Airflow", icon: "devicon-apacheairflow-plain colored" },
          { name: "Databricks", icon: "devicon-python-plain colored" },
          { name: "dbt", icon: "devicon-python-plain colored" },
        ],
      },
    ],
  },
];

/* Explorer tree items */
const explorerTree = [
  { type: "folder" as const, name: "src", depth: 0, expanded: true },
  { type: "folder" as const, name: "skills", depth: 1, expanded: true },
  ...skillFiles.map((f) => ({
    type: "file" as const,
    name: f.filename,
    depth: 2,
    id: f.id,
  })),
];



/* ───────────────────────────────────────────
 * Animation variants
 * ─────────────────────────────────────────── */
const editorVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const skillCardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.04, type: "spring", stiffness: 200, damping: 20 },
  }),
};

/* ───────────────────────────────────────────
 * Component
 * ─────────────────────────────────────────── */
export default function Skills() {
  const [activeFileId, setActiveFileId] = useState("ds");
  const [openTabs, setOpenTabs] = useState<string[]>(["ds"]);
  const [lineCount, setLineCount] = useState(0);

  const activeFile = skillFiles.find((f) => f.id === activeFileId)!;

  /* Count total skill items for line numbers */
  useEffect(() => {
    const count = activeFile.groups.reduce(
      (sum, g) => sum + g.skills.length + 1, // +1 for group header
      2 // file comment + blank line
    );
    setLineCount(count);
  }, [activeFile]);

  function openFile(id: string) {
    if (!openTabs.includes(id)) {
      setOpenTabs((prev) => [...prev, id]);
    }
    setActiveFileId(id);
  }

  function closeTab(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    const newTabs = openTabs.filter((t) => t !== id);
    setOpenTabs(newTabs);
    if (activeFileId === id && newTabs.length > 0) {
      setActiveFileId(newTabs[newTabs.length - 1]);
    } else if (newTabs.length === 0) {
      setOpenTabs(["ds"]);
      setActiveFileId("ds");
    }
  }

  /* Line number generator */
  let globalLine = 0;

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16 gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs font-semibold text-primary uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground font-heading">
            Technical Skills
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            A deep stack spanning data science, cloud engineering, and modern
            development — organized the way I think about it: in code.
          </p>
        </div>

        {/* VS Code IDE Frame */}
        <div className="relative group">
          {/* ── IDE Container ── */}
          <div className="relative rounded-xl border border-slate-200/80 dark:border-border/60 bg-white/80 dark:bg-[#1e1e2e]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* ─── Title Bar ─── */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200/60 dark:border-border/40 bg-white/90 dark:bg-[#181825]/90">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <span className="ml-3 text-xs font-mono text-muted-foreground/70">
                  sourav-skills — VS Code
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground/50">
                <Terminal className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row min-h-[520px]">
              {/* ─── Explorer Sidebar ─── */}
              <div className="hidden md:block w-56 border-r border-border/40 bg-card/30 dark:bg-[#181825]/60 flex-shrink-0">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                  Explorer
                </div>
                <nav className="px-1">
                  {explorerTree.map((item, i) => {
                    if (item.type === "folder") {
                      return (
                        <div
                          key={`folder-${i}`}
                          className="flex items-center gap-1 py-1 px-2 text-xs font-mono text-muted-foreground/80 cursor-default select-none"
                          style={{ paddingLeft: `${item.depth * 12 + 8}px` }}
                        >
                          {item.expanded ? (
                            <>
                              <ChevronDown className="w-3 h-3 flex-shrink-0" />
                              <FolderOpen className="w-3.5 h-3.5 text-sky-400/80 flex-shrink-0" />
                            </>
                          ) : (
                            <>
                              <ChevronRight className="w-3 h-3 flex-shrink-0" />
                              <FolderClosed className="w-3.5 h-3.5 text-sky-400/80 flex-shrink-0" />
                            </>
                          )}
                          <span className="ml-1 truncate">{item.name}</span>
                        </div>
                      );
                    }
                    const isActive =
                      "id" in item && item.id === activeFileId;
                    return (
                      <button
                        key={`file-${item.name}`}
                        onClick={() => "id" in item && openFile(item.id)}
                        className={`w-full flex items-center gap-1 py-1 px-2 text-xs font-mono rounded transition-colors select-none ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground/70 hover:bg-muted/40 hover:text-foreground"
                        }`}
                        style={{ paddingLeft: `${item.depth * 12 + 8}px` }}
                      >
                        <FileCode className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="ml-1 truncate">{item.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* ─── Editor Panel ─── */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Tab Bar */}
                <div className="flex items-center border-b border-border/40 bg-card/20 dark:bg-[#181825]/40 overflow-x-auto scrollbar-hide">
                  {openTabs.map((tabId) => {
                    const file = skillFiles.find((f) => f.id === tabId)!;
                    const isActive = tabId === activeFileId;
                    return (
                      <button
                        key={tabId}
                        onClick={() => setActiveFileId(tabId)}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-mono whitespace-nowrap border-r border-border/30 transition-colors ${
                          isActive
                            ? "bg-background dark:bg-[#1e1e2e] text-foreground border-b-2 border-b-primary"
                            : "text-muted-foreground/60 hover:text-foreground/80 hover:bg-muted/20"
                        }`}
                      >
                        <i className={`${file.langIcon} text-xs ${file.langColor}`} />
                        <span>{file.filename}</span>
                        <X
                          className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity cursor-pointer"
                          onClick={(e) => closeTab(tabId, e)}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 px-4 py-1.5 text-[10px] font-mono text-muted-foreground/50 border-b border-border/20 bg-card/10 dark:bg-[#1e1e2e]/40">
                  <span>src</span>
                  <ChevronRight className="w-2.5 h-2.5" />
                  <span>skills</span>
                  <ChevronRight className="w-2.5 h-2.5" />
                  <span className="text-foreground/70">{activeFile.filename}</span>
                </div>

                {/* Code Editor Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFileId}
                      variants={editorVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex min-h-full"
                    >
                      {/* Gutter (line numbers) */}
                      <div className="hidden sm:flex flex-col items-end py-4 px-3 text-[10px] font-mono text-muted-foreground/30 select-none flex-shrink-0 border-r border-border/20">
                        {Array.from({ length: lineCount }, (_, i) => (
                          <div key={i} className="h-7 leading-7">
                            {i + 1}
                          </div>
                        ))}
                      </div>

                      {/* Code Content */}
                      <div className="flex-1 py-4 px-4 sm:px-6 space-y-0">
                        {/* File comment */}
                        <div className="h-7 leading-7 text-xs font-mono text-emerald-600 dark:text-emerald-400/70">
                          {activeFile.comment}
                        </div>
                        {/* Blank line */}
                        <div className="h-7" />

                        {/* Skill Groups */}
                        {activeFile.groups.map((group) => {
                          globalLine++;
                          return (
                            <div key={group.groupName}>
                              {/* Group comment header */}
                              <div className="h-7 leading-7 flex items-center gap-2 text-xs font-mono">
                                <span className="text-violet-600 dark:text-violet-400/80 font-semibold">
                                  class
                                </span>
                                <span className="text-amber-700 dark:text-amber-300">
                                  {group.groupName.replace(/\s/g, "")}
                                </span>
                                <span className="text-muted-foreground/50">{"{"}</span>
                              </div>

                              {/* Skill Items Grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 py-2 pl-4 sm:pl-8">
                                {group.skills.map((skill, si) => (
                                  <motion.div
                                    key={skill.name}
                                    custom={si}
                                    variants={skillCardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.04, y: -1 }}
                                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-border/40 bg-muted/20 dark:bg-white/[0.03] hover:bg-muted/40 dark:hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-200 cursor-default group/skill"
                                  >
                                    <div className="w-6 h-6 rounded border border-border/30 bg-card/60 dark:bg-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover/skill:border-primary/30 transition-colors">
                                      <i
                                        className={`${skill.icon} text-sm`}
                                      />
                                    </div>
                                    <span className="text-[11px] font-semibold text-foreground truncate">
                                      {skill.name}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>

                              {/* Closing brace */}
                              <div className="h-7 leading-7 text-xs font-mono text-muted-foreground/50">
                                {"}"}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ─── Status Bar ─── */}
                <div className="flex items-center justify-between px-4 py-1.5 border-t border-border/40 bg-primary/5 dark:bg-[#181825]/80 text-[10px] font-mono text-muted-foreground/60">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      main
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      0 errors
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      Ln {lineCount}, Col 1
                    </span>
                    <span className={`flex items-center gap-1 ${activeFile.langColor}`}>
                      <i className={`${activeFile.langIcon} text-[10px]`} />
                      {activeFile.language}
                    </span>
                    <Bell className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Mobile File Selector (replaces sidebar on small screens) ─── */}
        <div className="flex md:hidden gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {skillFiles.map((f) => (
            <button
              key={f.id}
              onClick={() => openFile(f.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono whitespace-nowrap transition-all ${
                f.id === activeFileId
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/40 bg-card/30 text-muted-foreground hover:border-primary/20"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              {f.filename}
            </button>
          ))}
        </div>
      </div>


    </section>
  );
}
