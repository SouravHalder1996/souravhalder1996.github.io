"use client";

import { useState, useEffect } from "react";
import {
  Code2,
  FolderOpen,
  FolderClosed,
  ChevronRight,
  ChevronDown,
  X,
  GitBranch,
  Bell,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface SkillItem {
  name: string;
  iconUrl: string;
}

interface SkillFile {
  id: string;
  filename: string;
  language: string;
  langIconClass: string; // Devicon icon class for active tab
  langColor: string; // syntax highlight color for tab icon
  comment: string;
  groups: { groupName: string; skills: SkillItem[] }[];
}

const skillFiles: SkillFile[] = [
  {
    id: "ds",
    filename: "data_science.ipynb",
    language: "Jupyter Notebook",
    langIconClass: "devicon-jupyter-plain",
    langColor: "text-violet-600 dark:text-violet-400",
    comment: "# Jupyter Notebook - Machine Learning & AI Workflows",
    groups: [
      {
        groupName: "Machine Learning",
        skills: [
          { name: "NumPy", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
          { name: "Pandas", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
          { name: "Scikit-Learn", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
          { name: "MLflow", iconUrl: "https://cdn.brandfetch.io/idS8GMP5c8/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1742926327412" },
          { name: "Jupyter", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg" },
        ],
      },
      {
        groupName: "Deep Learning & GenAI",
        skills: [
          { name: "TensorFlow", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
          { name: "Keras", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg" },
          { name: "Hugging Face", iconUrl: "https://huggingface.co/front/assets/huggingface_logo.svg" },
          { name: "LangChain", iconUrl: "https://logo.svgcdn.com/s/langchain-dark.png" },
          { name: "Portkey AI", iconUrl: "https://cdn.brandfetch.io/id-WuCPAYH/w/64/h/64/theme/light/logo.png?c=1bxid64Mup7aczewSAYMX&t=1772500256836" },
        ],
      },
      {
        groupName: "Visualization",
        skills: [
          { name: "Matplotlib", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
          { name: "Seaborn", iconUrl: "https://logo.svgcdn.com/l/seaborn-icon.png" },
          { name: "Plotly", iconUrl: "https://logo.svgcdn.com/d/plotly-original.png" },
        ],
      },
    ],
  },
  {
    id: "cloud",
    filename: "cloud_eng.yml",
    language: "YAML",
    langIconClass: "devicon-amazonwebservices-plain",
    langColor: "text-amber-600 dark:text-amber-500",
    comment: "# Cloud Infrastructure & Data Pipelines",
    groups: [
      {
        groupName: "AWS Infrastructure",
        skills: [
          { name: "AWS", iconUrl: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1758604187114" },
          { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
          { name: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        ],
      },
      {
        groupName: "Data Engineering",
        skills: [
          { name: "AWS Glue", iconUrl: "https://logo.svgcdn.com/l/aws-glue.png" },
          { name: "Redshift", iconUrl: "https://logo.svgcdn.com/l/aws-redshift.png" },
          { name: "Databricks", iconUrl: "https://cdn.brandfetch.io/idSUrLOWbH/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1668081624532" },
          { name: "PostgreSQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
          { name: "Airflow", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg" },
          { name: "n8n", iconUrl: "https://cdn.brandfetch.io/idO6_6uqJ9/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1763457415601" },
        ],
      },
    ],
  },
  {
    id: "lang",
    filename: "languages.py",
    language: "Python",
    langIconClass: "devicon-python-plain",
    langColor: "text-sky-600 dark:text-sky-400",
    comment: "# Programming Languages & Frameworks",
    groups: [
      {
        groupName: "Core Languages",
        skills: [
          { name: "Python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
          { name: "C", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
          { name: "SQL", iconUrl: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg" },
        ],
      },
      {
        groupName: "Web Development",
        skills: [
          { name: "FastAPI", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
          { name: "HTML5", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
          { name: "CSS3", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
        ],
      },
    ],
  },
];

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

export default function Skills() {
  const [activeFileId, setActiveFileId] = useState("ds");
  const [openTabs, setOpenTabs] = useState<string[]>(["ds"]);
  const [lineCount, setLineCount] = useState(0);

  const activeFile = skillFiles.find((f) => f.id === activeFileId)!;

  useEffect(() => {
    // calculate layout lines matching the custom syntax structures
    const count = 3 + activeFile.groups.length * 3;
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

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background scroll-mt-20">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/2 rounded-full blur-3xl pointer-events-none -z-10" />

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
            Organized the way I think about engineering and automation — directly inside a simulated code editor.
          </p>
        </div>

        {/* VS Code IDE Frame */}
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-[#2d2d2d] bg-white dark:bg-[#1e1e1e] shadow-2xl flex flex-col font-mono text-left select-none text-slate-800 dark:text-[#d4d4d4] transition-colors duration-300">
          
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#ececec] dark:bg-[#2d2d2d] border-b border-slate-200 dark:border-[#1e1e1e] text-[11px] text-slate-600 dark:text-[#969696] font-sans transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 flex-shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="ml-3 truncate max-w-[180px] sm:max-w-none">sourav-skills — VS Code</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 dark:text-[#5f5f5f]">
              <Terminal className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-[780px] relative">
            
            {/* Sidebar Explorer */}
            <div className="hidden md:block w-52 bg-[#f3f3f3] dark:bg-[#252526] border-r border-slate-200 dark:border-[#2d2d2d] flex-shrink-0 py-2 transition-colors duration-300">
              <div className="px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#858585] font-sans">
                Explorer
              </div>
              
              <div className="mt-2 space-y-0.5">
                {/* src folder */}
                <div className="flex items-center gap-1.5 py-1 px-3 text-xs text-slate-700 dark:text-[#d4d4d4]">
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-[#858585] flex-shrink-0" />
                  <FolderOpen className="w-4 h-4 text-slate-600 dark:text-[#d4d4d4] flex-shrink-0" />
                  <span>src</span>
                </div>
                {/* skills folder */}
                <div className="flex items-center gap-1.5 py-1 px-3 text-xs text-slate-700 dark:text-[#d4d4d4] pl-6">
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-[#858585] flex-shrink-0" />
                  <FolderOpen className="w-4 h-4 text-slate-600 dark:text-[#d4d4d4] flex-shrink-0" />
                  <span>skills</span>
                </div>

                {/* files */}
                {skillFiles.map((file) => {
                  const isActive = file.id === activeFileId;
                  return (
                    <button
                      key={file.id}
                      onClick={() => openFile(file.id)}
                      className={`w-full flex items-center gap-2 py-1.5 pl-12 pr-4 text-xs font-mono text-left transition-colors cursor-pointer border-none ${
                        isActive
                          ? "bg-[#e4e6f1] dark:bg-[#37373d] text-[#333333] dark:text-white"
                          : "text-slate-500 dark:text-[#858585] hover:bg-slate-200/50 dark:hover:bg-[#2a2d2e] hover:text-slate-800 dark:hover:text-[#d4d4d4]"
                      }`}
                    >
                      <i className={`${file.langIconClass} text-sm ${isActive ? file.langColor : ""}`} />
                      <span className="truncate">{file.filename}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Editor Pane Container */}
            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#1e1e1e] transition-colors duration-300">
              
              {/* Tab Bar */}
              <div className="flex items-center bg-[#ececec] dark:bg-[#252526] overflow-x-auto scrollbar-none h-[35px] border-b border-slate-200 dark:border-[#1e1e1e] transition-colors duration-300">
                {openTabs.map((tabId) => {
                  const file = skillFiles.find((f) => f.id === tabId)!;
                  const isActive = tabId === activeFileId;
                  return (
                    <div
                      key={tabId}
                      onClick={() => setActiveFileId(tabId)}
                      className={`flex items-center gap-2 px-4 h-full text-xs font-mono border-r border-slate-200 dark:border-[#2d2d2d] transition-colors cursor-pointer select-none group ${
                        isActive
                          ? "bg-white dark:bg-[#1e1e1e] text-slate-800 dark:text-white border-t-2 border-t-[#007acc]"
                          : "bg-[#ececec] dark:bg-[#2d2d2d] text-slate-500 dark:text-[#969696] hover:bg-[#e8e8e8] dark:hover:bg-[#2a2d2e] hover:text-slate-800 dark:hover:text-[#d4d4d4]"
                      }`}
                    >
                      <i className={`${file.langIconClass} text-xs ${isActive ? file.langColor : ""}`} />
                      <span>{file.filename}</span>
                      <button
                        onClick={(e) => closeTab(tabId, e)}
                        className="p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10 text-slate-400 dark:text-[#969696] hover:text-slate-850 dark:hover:text-white transition-colors cursor-pointer ml-1.5 opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Breadcrumb Bar */}
              <div className="flex items-center gap-1 px-4 py-1.5 text-[10.5px] text-slate-400 dark:text-[#858585] border-b border-slate-200 dark:border-[#2d2d2d] bg-white dark:bg-[#1e1e1e] select-none transition-colors duration-300">
                <span>src</span>
                <ChevronRight className="w-3 h-3 text-slate-400 dark:text-[#858585]" />
                <span>skills</span>
                <ChevronRight className="w-3 h-3 text-slate-400 dark:text-[#858585]" />
                <span className="text-slate-700 dark:text-[#d4d4d4]">{activeFile.filename}</span>
              </div>

              {/* Editor Workspace */}
              <div className="flex-grow overflow-auto bg-white dark:bg-[#1e1e1e] transition-colors duration-300">
                <div className="flex min-h-full bg-white dark:bg-[#1e1e1e] w-full min-w-max">
                  {/* Line numbers gutter */}
                  <div className="hidden sm:flex flex-col items-end py-4 px-3.5 text-[11px] text-[#a6a6a6] dark:text-[#858585] select-none border-r border-slate-200 dark:border-[#2d2d2d] bg-white dark:bg-[#1e1e1e] flex-shrink-0 transition-colors duration-300">
                    {Array.from({ length: lineCount }, (_, i) => (
                      <div key={i} className="h-7 leading-7">
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Code Container */}
                  <div className="flex-1 py-4 px-6 font-mono text-xs select-none">
                    {/* Section Comment */}
                    <div className="h-7 leading-7 text-[#008000] dark:text-[#6a9955] italic transition-colors whitespace-nowrap">
                      {activeFile.comment}
                    </div>
                    
                    {/* Blank spacing line */}
                    <div className="h-7" />

                    {/* Skill Groups */}
                    <div className="space-y-6">
                      {activeFile.id === "ds" && activeFile.groups.map((group, gIdx) => (
                        <div key={group.groupName} className="space-y-4">
                          {/* Jupyter cell prompt */}
                          <div className="h-7 leading-7 flex items-center gap-2 select-none whitespace-nowrap">
                            <span className="text-blue-500 font-bold">In [{gIdx + 1}]:</span>
                            <span className="text-[#008000] dark:text-[#6a9955] italic"># {group.groupName}</span>
                          </div>
                          {/* Python class declaration */}
                          <div className="h-7 leading-7 flex items-center gap-2 pl-4 whitespace-nowrap">
                            <span className="text-[#0000ff] dark:text-[#569cd6] font-bold transition-colors">class</span>
                            <span className="text-[#267f99] dark:text-[#4ec9b0] transition-colors">{group.groupName.replace(/[^a-zA-Z0-9]/g, "")}:</span>
                          </div>

                          {/* Skills Grid */}
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 pl-8 sm:pl-12">
                            {group.skills.map((skill) => (
                              <div
                                key={skill.name}
                                className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 group cursor-default select-none hover:scale-[1.08] hover:-translate-y-[2px]"
                              >
                                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-[#252526] border border-slate-200 dark:border-[#2d2d2d] flex items-center justify-center p-2 transition-all duration-300 group-hover:border-primary/30 dark:group-hover:border-primary/30 shadow-inner">
                                  <img
                                    src={skill.iconUrl}
                                    alt={skill.name}
                                    className="w-8 h-8 object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                                <span className="mt-2 text-[10.5px] font-semibold text-slate-700 dark:text-[#d4d4d4] group-hover:text-primary transition-colors duration-300 font-sans tracking-wide text-center truncate w-full max-w-[85px]">
                                  {skill.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      {activeFile.id === "cloud" && activeFile.groups.map((group) => (
                        <div key={group.groupName} className="space-y-4">
                          {/* YAML group key */}
                          <div className="h-7 leading-7 flex items-center select-none whitespace-nowrap">
                            <span className="text-[#0451a5] dark:text-[#9cdcfe] font-semibold">{group.groupName.toLowerCase().replace(/[^a-z0-9]/g, "_")}:</span>
                          </div>
                          {/* YAML Nested list key */}
                          <div className="h-7 leading-7 flex items-center pl-4 select-none whitespace-nowrap">
                            <span className="text-[#0451a5] dark:text-[#9cdcfe] font-semibold">skills:</span>
                          </div>

                          {/* Skills Grid */}
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 pl-8 sm:pl-12">
                            {group.skills.map((skill) => (
                              <div
                                key={skill.name}
                                className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 group cursor-default select-none hover:scale-[1.08] hover:-translate-y-[2px] relative"
                              >
                                {/* YAML list dash prefix */}
                                <span className="absolute left-1 top-6 text-[#e06c75] font-bold select-none text-xs hidden sm:block">-</span>
                                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-[#252526] border border-slate-200 dark:border-[#2d2d2d] flex items-center justify-center p-2 transition-all duration-300 group-hover:border-primary/30 dark:group-hover:border-primary/30 shadow-inner">
                                  <img
                                    src={skill.iconUrl}
                                    alt={skill.name}
                                    className="w-8 h-8 object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                                <span className="mt-2 text-[10.5px] font-semibold text-slate-700 dark:text-[#d4d4d4] group-hover:text-primary transition-colors duration-300 font-sans tracking-wide text-center truncate w-full max-w-[85px]">
                                  {skill.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      {activeFile.id === "lang" && activeFile.groups.map((group) => (
                        <div key={group.groupName} className="space-y-4">
                          {/* Python comment */}
                          <div className="h-7 leading-7 text-[#008000] dark:text-[#6a9955] italic select-none whitespace-nowrap">
                            # {group.groupName}
                          </div>
                          {/* Python class declaration */}
                          <div className="h-7 leading-7 flex items-center gap-2 pl-4 whitespace-nowrap">
                            <span className="text-[#0000ff] dark:text-[#569cd6] font-bold transition-colors">class</span>
                            <span className="text-[#267f99] dark:text-[#4ec9b0] transition-colors">{group.groupName.replace(/[^a-zA-Z0-9]/g, "")}:</span>
                          </div>

                          {/* Skills Grid */}
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 pl-8 sm:pl-12">
                            {group.skills.map((skill) => (
                              <div
                                key={skill.name}
                                className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 group cursor-default select-none hover:scale-[1.08] hover:-translate-y-[2px]"
                              >
                                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-[#252526] border border-slate-200 dark:border-[#2d2d2d] flex items-center justify-center p-2 transition-all duration-300 group-hover:border-primary/30 dark:group-hover:border-primary/30 shadow-inner">
                                  <img
                                    src={skill.iconUrl}
                                    alt={skill.name}
                                    className="w-8 h-8 object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                                <span className="mt-2 text-[10.5px] font-semibold text-slate-700 dark:text-[#d4d4d4] group-hover:text-primary transition-colors duration-300 font-sans tracking-wide text-center truncate w-full max-w-[85px]">
                                  {skill.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between px-3 h-6 bg-[#007acc] text-white text-[11px] select-none flex-shrink-0 font-sans font-medium">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    main
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    0 errors
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Ln {lineCount}, Col 1</span>
                  <span>Spaces: 4</span>
                  <span className="flex items-center gap-1">
                    <i className={`${activeFile.langIconClass} text-[10px]`} />
                    {activeFile.language}
                  </span>
                  <Bell className="w-3 h-3" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile File Selector */}
        <div className="flex md:hidden gap-2 mt-5 overflow-x-auto pb-2 scrollbar-none justify-center px-4">
          {skillFiles.map((file) => {
            const isActive = file.id === activeFileId;
            return (
              <button
                key={file.id}
                onClick={() => openFile(file.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "border-primary/45 bg-primary/10 text-primary shadow-sm"
                    : "border-border/40 bg-card/30 text-muted-foreground hover:border-primary/25"
                }`}
              >
                <i className={`${file.langIconClass} text-[11px] ${isActive ? file.langColor : ""}`} />
                {file.filename}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
