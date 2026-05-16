import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";

const About = dynamic(() => import("./about/page"));
const SystemArchitecture = dynamic(() => import("./system-architecture/page"));
const Skills = dynamic(() => import("./skills/page"));
const AiWorkflow = dynamic(() => import("./ai-workflow/page"));
const Education = dynamic(() => import("./education/page"));
const Projects = dynamic(() => import("./projects/page"));
const Contact = dynamic(() => import("./contact/page"));

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <About />
      <SystemArchitecture />
      <Skills />
      <AiWorkflow />
      <Education />
      <Projects />
      <Contact />
    </>
  );
}
