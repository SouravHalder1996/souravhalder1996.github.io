import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import ScrollToTop from "@/components/ScrollToTop";
import AiCopilot from "@/components/AiCopilot";
import TerminalDrawer from "@/components/TerminalDrawer";
import ResumeModal from "@/components/ResumeModal";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sourav Halder · AI/ML Engineer · Data Scientist · Cloud Architect",
  description: "AI/ML Engineer & Data Scientist specializing in Agentic AI, AWS Bedrock RAG, machine learning models, and scalable AWS cloud architecture.",
  keywords: ["AI Engineer", "ML Engineer", "Data Scientist", "Agentic AI", "GenAI Developer", "RAG Chatbots", "AWS Cloud Architect", "Databricks", "Python"],
  authors: [{ name: "Sourav Halder" }],
  openGraph: {
    title: "Sourav Halder · AI/ML Engineer · Data Scientist · Cloud Architect",
    description: "AI/ML Engineer & Data Scientist specializing in Agentic AI, AWS Bedrock RAG, machine learning models, and scalable AWS cloud architecture.",
    type: "website",
    url: "https://souravhalder1996.github.io",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${firaCode.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark'); // dark-first default
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body 
        className="min-h-full bg-background text-foreground transition-colors duration-300 flex flex-col"
        suppressHydrationWarning
      >
        <Navbar />
        <CommandPalette />
        <ScrollToTop />
        <AiCopilot />
        <TerminalDrawer />
        <ResumeModal />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
