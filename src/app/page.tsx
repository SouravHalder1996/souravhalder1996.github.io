import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CircuitGridBackground from "@/components/CircuitGridBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <CircuitGridBackground />
      <Hero />
      <Metrics />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Credentials />
      <Contact />
      <Footer />
    </main>
  );
}

