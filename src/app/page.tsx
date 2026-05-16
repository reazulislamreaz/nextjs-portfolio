import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";
import SectionSkeleton from "@/app/components/ui/SectionSkeleton";

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
  loading: () => <SectionSkeleton />,
});
const SystemArchitectureSection = dynamic(
  () => import("@/components/sections/SystemArchitectureSection"),
  { loading: () => <SectionSkeleton /> },
);
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), {
  loading: () => <SectionSkeleton />,
});
const AiWorkflowSection = dynamic(() => import("@/components/sections/AiWorkflowSection"), {
  loading: () => <SectionSkeleton />,
});
const EducationSection = dynamic(() => import("@/components/sections/EducationSection"), {
  loading: () => <SectionSkeleton />,
});
const CertificationsSection = dynamic(
  () => import("@/components/sections/CertificationsSection"),
  { loading: () => <SectionSkeleton /> },
);
const ProjectsSection = dynamic(() => import("@/app/projects/ProjectsSection"), {
  loading: () => <SectionSkeleton />,
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <SectionSkeleton />,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutSection />
      <SystemArchitectureSection />
      <SkillsSection />
      <AiWorkflowSection />
      <EducationSection />
      <CertificationsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
