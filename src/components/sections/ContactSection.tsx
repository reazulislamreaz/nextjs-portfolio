"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ContactForm from "@/app/components/ContactForm";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { siteContact, siteSocial } from "@/config/site";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import { Mail, MapPin, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function ContactSection() {
  const [showMap, setShowMap] = useState(false);
  const mapTriggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMap = useCallback(() => setShowMap(false), []);

  const containerRef = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    gsap.fromTo(
      "[data-contact-left]",
      { x: -30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "[data-contact-grid]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: 0,
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      "[data-contact-right]",
      { x: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "[data-contact-grid]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: 0,
        opacity: 1,
        duration: 0.65,
        delay: 0.15,
        ease: "power3.out",
      }
    );
  });

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
      <div ref={containerRef}>
        <SectionHeader
          title="Contact"
          subtitle="Open to backend and full-stack roles in Dhaka or remote. Currently at Sparktech Agency."
        />

        <div data-contact-grid className="grid min-w-0 grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10">
          <div data-contact-left className="w-full min-w-0 space-y-6 md:space-y-8">
            <div className="relative flex h-full flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-7">
              <div>
                <p className="mb-6 text-base leading-relaxed text-zinc-300 sm:mb-8">
                  If you&apos;re hiring a backend or full-stack engineer, I&apos;d like to hear from you. I work on-site in Dhaka and remotely.
                </p>

                <div className="space-y-4 text-base">
                  <a
                    href={`mailto:${siteContact.email}`}
                    className="flex cursor-pointer items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 transition-colors hover:border-zinc-600"
                  >
                    <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-zinc-100">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Email</p>
                      <span className="break-all text-zinc-100 transition-colors duration-300 hover:text-zinc-50 sm:text-base font-medium">
                        {siteContact.email}
                      </span>
                    </div>
                  </a>

                  <a
                    href={siteContact.phoneHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 transition-colors hover:border-zinc-600"
                  >
                    <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-emerald-400">
                      <FaWhatsapp size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">WhatsApp / Phone</p>
                      <span className="text-zinc-100 transition-colors duration-300 hover:text-zinc-50 font-medium">
                        {siteContact.phone}
                      </span>
                    </div>
                  </a>

                  <button
                    ref={mapTriggerRef}
                    type="button"
                    onClick={() => setShowMap(true)}
                    className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 text-left transition-colors hover:border-zinc-600"
                  >
                    <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-zinc-100">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Location</p>
                      <span className="text-zinc-100 transition-colors duration-300 hover:text-zinc-50 font-medium">
                        Dhaka, Bangladesh · Available Worldwide
                      </span>
                    </div>
                  </button>

                  <div className="flex flex-wrap items-center gap-4 pt-4 sm:gap-6 border-t border-zinc-800/80">
                    <span className="text-xs text-zinc-500">Profiles</span>
                    <div className="flex items-center gap-3">
                      <a
                        href={siteSocial.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-zinc-700/80 bg-zinc-800 p-2.5 text-zinc-300 shadow-sm transition-all duration-300 hover:border-zinc-500 hover:text-zinc-50"
                        aria-label="GitHub"
                      >
                        <FaGithub size={18} />
                      </a>
                      <a
                        href={siteSocial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-zinc-700/80 bg-zinc-800 p-2.5 text-zinc-300 shadow-sm transition-all duration-300 hover:border-zinc-500 hover:text-zinc-50"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-contact-right>
            <ContactForm />
          </div>
        </div>
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
                <MapPin size={20} className="text-emerald-500" />
                <span>{siteContact.location}</span>
              </h3>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMap}
                className="cursor-pointer rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-50"
                aria-label="Close map dialog"
              >
                <X size={22} />
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
