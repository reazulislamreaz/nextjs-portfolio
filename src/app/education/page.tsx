import Image from "next/image";
import Section from "../components/ui/Section";
import SectionHeader from "../components/ui/SectionHeader";

interface EducationItem {
  degree: string;
  department: string;
  institution: string;
  duration: string;
  status: string;
  icon: string;
  accentColor: string;
  glowColor: string;
}

const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Social Science (Honors)",
    department: "Department of Political Science",
    institution: "National University, Bangladesh",
    duration: "Expected Graduation: 2026",
    status: "IN PROGRESS",
    icon: "🎓",
    accentColor: "bg-blue-500/10 border-blue-500/20",
    glowColor: "group-hover:shadow-blue-500/10",
  },
  {
    degree: "MERN Stack Web Development",
    department: "Full-Stack Development Program",
    institution: "Programming Hero",
    duration: "2024 – Present",
    status: "ACTIVE",
    icon: "💻",
    accentColor: "bg-emerald-500/10 border-emerald-500/20",
    glowColor: "group-hover:shadow-emerald-500/10",
  },
];

export default function Education() {
  return (
    <Section id="education" className="relative bg-black/60">
      <SectionHeader
        title="Education"
        subtitle="My academic journey and professional development in technology"
      />

      <div className="grid items-start gap-12 md:grid-cols-2">
        <div className="space-y-8">
          {educationData.map((item, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:border-zinc-700 hover:shadow-2xl ${item.glowColor} hover:-translate-y-0.5`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-4 flex items-start justify-between">
                  <div className={`rounded-xl border p-3 ${item.accentColor}`}>
                    <div className="text-2xl">{item.icon}</div>
                  </div>
                  <div
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${item.accentColor}`}
                  >
                    {item.status}
                  </div>
                </div>

                <h3 className="mb-3 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-emerald-50">
                  {item.degree}
                </h3>
                <p className="mb-2 text-lg font-medium text-zinc-300">{item.department}</p>
                <p className="mb-1 text-sm text-zinc-400">{item.institution}</p>
                <p className="text-sm font-semibold text-zinc-500">{item.duration}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex h-full w-full items-center justify-center">
          <div className="relative group">
            <div
              className="absolute inset-0 scale-110 transform rounded-3xl bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            />

            <div
              className="relative rounded-3xl border border-zinc-800/50 bg-zinc-900/20 p-8 shadow-xl backdrop-blur-md transition-all duration-500 group-hover:border-zinc-700 group-hover:shadow-2xl"
            >
              <Image
                src="/image.png"
                alt="Education illustration"
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 400px"
                className="h-auto w-full max-w-xs object-contain drop-shadow-xl filter transition-all duration-300 group-hover:brightness-110 md:max-w-md"
              />

              <div className="absolute right-4 top-4 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/50" />
              <div className="delay-75 absolute bottom-4 left-4 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-zinc-400 to-zinc-600 shadow-lg shadow-zinc-500/50" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
