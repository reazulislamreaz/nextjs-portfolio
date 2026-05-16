"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const About = dynamic(() => import("./about/page"));
const SystemArchitecture = dynamic(() => import("./system-architecture/page"));
const Skills = dynamic(() => import("./skills/page"));
const AiWorkflow = dynamic(() => import("./ai-workflow/page"));
const Education = dynamic(() => import("./education/page"));
const Projects = dynamic(() => import("./projects/page"));
const Contact = dynamic(() => import("./contact/page"));

const texts: string[] = [
  "I build scalable backend systems, APIs, and SaaS-style architectures.",
  "PostgreSQL · MongoDB · Redis — with Node.js, NestJS, and Go where it fits.",
  "Full-stack delivery with Next.js when the product needs a polished client.",
];

interface TechItem {
  name: string;
  color: string;
}

export default function Home() {
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % texts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const backendTechStack: TechItem[] = [
    { name: "PostgreSQL", color: "text-blue-400" },
    { name: "MongoDB", color: "text-emerald-500" },
    { name: "Redis", color: "text-red-500" },
    { name: "Node.js", color: "text-green-500" },
    { name: "Express", color: "text-gray-300" },
    { name: "Go", color: "text-sky-400" },
    { name: "REST APIs", color: "text-cyan-400" },
  ];

  return (
    <>
      <section
        aria-label="Introduction"
        className="min-h-screen relative overflow-hidden flex flex-col justify-center"
      >
        <div className="relative z-10 flex items-center justify-center px-6 md:px-16 min-h-screen">
          <div className="max-w-7xl w-full flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center py-20">
            {/* Left: Info Section */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Heading Section */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium tracking-wide mb-4"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Available for New Opportunities
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-2">
                  Reazul Islam Reaz
                </h1>
                
                {/* Text Slider */}
                <div className="min-h-[3.5rem] md:min-h-[4rem] relative overflow-hidden flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={sliderIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="text-xl md:text-2xl text-zinc-400 font-medium absolute"
                    >
                      {texts[sliderIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Quick Tech Stack preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                {backendTechStack.map((tech, i) => (
                  <div key={i} className={`text-sm font-medium px-3 py-1.5 rounded-md bg-zinc-900/50 border border-zinc-800 ${tech.color}`}>
                    {tech.name}
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="group relative cursor-pointer px-8 py-3 rounded-lg bg-zinc-100 text-zinc-900 font-semibold hover:bg-white transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                >
                  <span className="relative z-10">View Projects</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/Reazul_Islam_Reaz_Resume.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative cursor-pointer px-8 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  Download Resume
                </motion.a>
              </motion.div>

              {/* Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex gap-6 pt-6"
              >
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/reazulislamreaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-emerald-500/10"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/in/reazulislamreaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-blue-600/20 transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-blue-500/10"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="mailto:reazul.dev@gmail.com"
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-emerald-600/20 transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-emerald-500/10"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right: Profile Picture */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-600 via-emerald-500/10 to-zinc-700 rounded-full blur-2xl opacity-20 animate-pulse"></div>

                {/* Profile container */}
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-zinc-600 via-emerald-500/40 to-zinc-700 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
                    {/* Placeholder for profile image */}
                    <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative">
                      <Image
                        src="/reaz.png"
                        alt="Reazul Islam Reaz"
                        width={400}
                        height={400}
                        priority={true}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{
                    rotate: 360,
                    y: [0, -20, 0],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-zinc-700 to-zinc-900 border border-zinc-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                >
                  ⚡
                </motion.div>

                <motion.div
                  animate={{
                    rotate: -360,
                    y: [0, 15, 0],
                  }}
                  transition={{
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    },
                  }}
                  className="absolute -bottom-2 -left-6 w-10 h-10 bg-gradient-to-r from-zinc-800 to-black border border-zinc-600 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  💻
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
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
