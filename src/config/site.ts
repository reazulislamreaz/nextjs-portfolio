export const SITE_URL = "https://reazul-islam-reaz.vercel.app";

export const siteContact = {
  email: "reazul.dev@gmail.com",
  phone: "+8801770807782",
  phoneHref: "https://wa.me/8801770807782",
  location: "Dhaka, Bangladesh",
  locationDetail: "Dhaka, Bangladesh (Remote Available)",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d365230.6813912493!2d90.356331!3d23.810475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85725990c43%3A0x9cf3632f2b4bd153!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1714850000000!5m2!1sen!2sbd",
} as const;

export const siteSocial = {
  github: "https://github.com/reazulislamreaz",
  linkedin: "https://www.linkedin.com/in/reazulislamreaz",
} as const;

export const resumePath = "/Reazul_Islam_Reaz_Backend_Focused_Full_Stack_Engineer.pdf";

export interface NavLink {
  href: string;
  label: string;
  sectionId?: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About", sectionId: "about" },
  {
    href: "/#system-architecture",
    label: "Architecture",
    sectionId: "system-architecture",
  },
  { href: "/#skills", label: "Skills", sectionId: "skills" },
  { href: "/#education", label: "Education", sectionId: "education" },
  { href: "/#experience", label: "Experience", sectionId: "experience" },
  { href: "/#certifications", label: "Learning", sectionId: "certifications" },
  { href: "/#projects", label: "Projects", sectionId: "projects" },
  { href: "/#contact", label: "Contact", sectionId: "contact" },
];

export const sectionIds = navLinks
  .map((link) => link.sectionId)
  .filter((id): id is string => Boolean(id));
