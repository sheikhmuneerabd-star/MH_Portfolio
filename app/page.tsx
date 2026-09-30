import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import TechMarquee from "@/components/TechMarquee";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <TechMarquee />
      <Contact />
    </main>
  );
}