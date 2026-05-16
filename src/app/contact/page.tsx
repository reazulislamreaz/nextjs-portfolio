"use client";

import React, { useState, useEffect } from "react";
import { FiMail, FiMapPin, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Section from "../components/ui/Section";
import SectionHeader from "../components/ui/SectionHeader";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (!showMap) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowMap(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showMap]);

  return (
    <Section id="contact" className="bg-black/40">
      <SectionHeader
        title="Contact Me"
        subtitle="Let's connect and discuss how we can work together on your next project"
      />

      <div className="grid min-w-0 grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10">
        <div className="mx-auto w-full min-w-0 max-w-xl space-y-6 md:mx-0 md:space-y-8">
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 shadow-xl backdrop-blur-md transition-all duration-500 sm:rounded-3xl sm:p-8 md:hover:border-zinc-700 md:hover:shadow-[0_0_20px_rgba(16,185,129,0.03)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10">
              <p className="mb-6 text-base font-light leading-relaxed text-zinc-300 sm:mb-8 sm:text-lg">
                I&apos;m always open to discussing new opportunities,
                interesting projects, or just having a chat about technology and
                development. Feel free to reach out!
              </p>

              <div className="space-y-6 text-base">
                <a
                  href="mailto:reazul.dev@gmail.com"
                  className="flex cursor-pointer items-center gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-950/30 p-4 transition-all duration-300 hover:border-emerald-500/40"
                >
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 transition-colors duration-300 group-hover/item:bg-emerald-500/20">
                    <FiMail className="text-xl text-emerald-400" />
                  </div>
                  <span className="whitespace-nowrap text-zinc-300 transition-colors duration-300 hover:text-white sm:text-base">
                    reazul.dev@gmail.com
                  </span>
                </a>

                <a
                  href="https://wa.me/8801770807782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-950/30 p-4 transition-all duration-300 hover:border-emerald-500/40"
                >
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 transition-colors duration-300">
                    <FaWhatsapp className="text-xl text-emerald-400" />
                  </div>
                  <span className="text-zinc-300 transition-colors duration-300 hover:text-white">
                    +8801770807782
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowMap(true)}
                  className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-950/30 p-4 text-left transition-all duration-300 hover:border-emerald-500/40"
                >
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 transition-colors duration-300">
                    <FiMapPin className="text-xl text-emerald-400" />
                  </div>
                  <span className="text-zinc-300 transition-colors duration-300 hover:text-white">
                    Dhaka, Bangladesh (Remote Available)
                  </span>
                </button>

                <div className="flex items-center gap-6 pt-6">
                  <span className="font-medium text-zinc-400">Follow me:</span>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://github.com/reazulislamreaz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-zinc-800/50 bg-zinc-950/50 p-3 text-zinc-400 shadow-lg transition-all duration-300 hover:border-zinc-500 hover:text-white hover:shadow-emerald-500/5"
                      aria-label="GitHub"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/reazulislamreaz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-blue-500/20 bg-blue-600/10 p-3 text-blue-400 shadow-lg transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-600/20 hover:text-blue-300 hover:shadow-blue-500/10"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>

      {showMap ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close map"
            onClick={() => setShowMap(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="map-dialog-title"
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 p-6">
              <h3
                id="map-dialog-title"
                className="flex items-center gap-2 text-xl font-bold text-white"
              >
                <FiMapPin className="text-emerald-500" />
                Faridpur, Bangladesh
              </h3>
              <button
                type="button"
                onClick={() => setShowMap(false)}
                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                aria-label="Close"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="aspect-video w-full bg-zinc-950">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116962.77526000047!2d89.75336181180237!3d23.601007785461247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe2f9b2d2f7fbd%3A0x6a0c0e7d5a5a1f0a!2sFaridpur!5e0!3m2!1sen!2sbd!4v1714850000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Faridpur, Bangladesh"
              />
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
