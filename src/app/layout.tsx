import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import ScrollToTop from "@/components/ScrollToTop";

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
  title: "Sourav Halder · Data Scientist & AI ML Engineer",
  description: "Data Scientist & AI/ML Engineer specializing in serverless cloud architectures, machine learning models, and enterprise data pipelines.",
  keywords: ["Data Scientist", "AI Engineer", "ML Engineer", "AWS", "Python", "Databricks", "Cloud Architect"],
  authors: [{ name: "Sourav Halder" }],
  openGraph: {
    title: "Sourav Halder · Data Scientist & AI ML Engineer",
    description: "Data Scientist & AI/ML Engineer specializing in serverless cloud architectures, machine learning models, and enterprise data pipelines.",
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
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
