import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";
import SectionSkeleton from "@/app/components/ui/SectionSkeleton";

/** Near-fold: load promptly after Hero for LCP continuity into Work. */
const ProjectsSection = dynamic(() => import("@/app/projects/ProjectsSection"), {
  loading: () => <SectionSkeleton />,
});

/** Mid-page sections — separate chunks, streamed after Work. */
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), {
  loading: () => <SectionSkeleton />,
});
const ExperienceSection = dynamic(
  () => import("@/components/sections/ExperienceSection"),
  { loading: () => <SectionSkeleton /> },
);

/** Lower page — deferred chunks; SSR retained for SEO. */
const EducationSection = dynamic(
  () => import("@/components/sections/EducationSection"),
  { loading: () => <SectionSkeleton /> },
);
const CertificationsSection = dynamic(
  () => import("@/components/sections/CertificationsSection"),
  { loading: () => <SectionSkeleton /> },
);
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
  loading: () => <SectionSkeleton />,
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <SectionSkeleton />,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
