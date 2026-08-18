"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiMail, FiMapPin, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import ContactForm from "@/app/components/ContactForm";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { siteContact, siteSocial } from "@/config/site";

export default function ContactSection() {
  const [showMap, setShowMap] = useState(false);
  const mapTriggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMap = useCallback(() => setShowMap(false), []);

  useEffect(() => {
    if (!showMap) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMap();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      mapTriggerRef.current?.focus();
    };
  }, [showMap, closeMap]);

  return (
    <Section id="contact" className="bg-zinc-950/40">
      <SectionHeader
        title="Contact"
        subtitle="Open to roles and project conversations."
      />

      <div className="grid min-w-0 grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10">
        <div className="w-full min-w-0 space-y-6 md:space-y-8">
          <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 p-5 shadow-xl backdrop-blur-md transition-all duration-500 sm:rounded-3xl sm:p-8 hover:border-zinc-400 dark:hover:border-white/20">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10">
              <p className="mb-6 text-base font-normal leading-relaxed text-zinc-300 sm:mb-8 sm:text-lg">
                Open to new opportunities and interesting projects. Reach out
                anytime.
              </p>

              <div className="space-y-6 text-base">
                <a
                  href={`mailto:${siteContact.email}`}
                  className="flex cursor-pointer items-center gap-4 rounded-2xl border border-zinc-700/80 bg-zinc-900 p-4 transition-all duration-300 hover:border-zinc-500"
                >
                  <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-3">
                    <FiMail className="text-xl text-zinc-50" />
                  </div>
                  <span className="break-all text-zinc-100 transition-colors duration-300 hover:text-zinc-50 sm:text-base font-medium">
                    {siteContact.email}
                  </span>
                </a>

                <a
                  href={siteContact.phoneHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center gap-4 rounded-2xl border border-zinc-700/80 bg-zinc-900 p-4 transition-all duration-300 hover:border-zinc-500"
                >
                  <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-3">
                    <FaWhatsapp className="text-xl text-zinc-50" />
                  </div>
                  <span className="text-zinc-100 transition-colors duration-300 hover:text-zinc-50 font-medium">
                    {siteContact.phone}
                  </span>
                </a>

                <button
                  ref={mapTriggerRef}
                  type="button"
                  onClick={() => setShowMap(true)}
                  className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-zinc-700/80 bg-zinc-900 p-4 text-left transition-all duration-300 hover:border-zinc-500"
                >
                  <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-3">
                    <FiMapPin className="text-xl text-zinc-50" />
                  </div>
                  <span className="text-zinc-100 transition-colors duration-300 hover:text-zinc-50 font-medium">
                    Dhaka, Bangladesh
                  </span>
                </button>

                <div className="flex flex-wrap items-center gap-4 pt-6 sm:gap-6">
                  <span className="font-medium text-zinc-400">Follow me:</span>
                  <div className="flex items-center gap-4">
                    <a
                      href={siteSocial.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-zinc-700/80 bg-zinc-800 p-3 text-zinc-300 shadow-sm transition-all duration-300 hover:border-zinc-500 hover:text-zinc-50"
                      aria-label="GitHub"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                    <a
                      href={siteSocial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-zinc-700/80 bg-zinc-800 p-3 text-zinc-300 shadow-sm transition-all duration-300 hover:border-zinc-500 hover:text-zinc-50"
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
            onClick={closeMap}
            className="absolute inset-0 cursor-pointer bg-black/80 backdrop-blur-sm"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="map-dialog-title"
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 p-6">
              <h3
                id="map-dialog-title"
                className="flex items-center gap-2 text-xl font-bold text-zinc-50"
              >
                <FiMapPin className="text-emerald-500" />
                {siteContact.location}
              </h3>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMap}
                className="cursor-pointer rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-50"
                aria-label="Close map dialog"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="aspect-video w-full bg-zinc-950">
              <iframe
                src={siteContact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map — ${siteContact.location}`}
              />
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
