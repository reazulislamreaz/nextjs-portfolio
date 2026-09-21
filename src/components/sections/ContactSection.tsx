"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ContactForm from "@/app/components/ContactForm";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { resumePath, siteContact, siteSocial } from "@/config/site";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import { Download, Mail, MapPin, X } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactSection() {
  const [showMap, setShowMap] = useState(false);
  const mapTriggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMap = useCallback(() => setShowMap(false), []);

  const containerRef = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    gsap.fromTo(
      "[data-contact-col]",
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "[data-contact-grid]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.55,
        ease: "power2.out",
      },
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
    <Section id="contact" className="border-t border-zinc-700/50 bg-zinc-900/30">
      <div ref={containerRef}>
        <SectionHeader
          eyebrow="Contact"
          title="Let’s talk about the role"
          subtitle="Open to backend and full-stack roles in Dhaka or remote. Currently at Sparktech Agency."
        />

        <div
          data-contact-grid
          className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14"
        >
          <div data-contact-col className="flex min-w-0 flex-col">
            <p className="type-body text-pretty sm:text-base sm:leading-relaxed">
              If you&apos;re hiring a backend or full-stack engineer, send a short
              note with the role, stack, and whether it&apos;s on-site or remote. I
              usually reply within 24–48 hours.
            </p>

            <div className="mt-8 space-y-0">
              <a
                href={`mailto:${siteContact.email}`}
                className="group flex items-start gap-4 border-b border-zinc-700/60 py-4 transition first:pt-0"
              >
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-400 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
                  aria-hidden
                />
                <div>
                  <p className="type-label">Email</p>
                  <span className="mt-1 block break-all text-sm font-medium text-zinc-100 transition group-hover:text-emerald-400 sm:text-[0.9375rem]">
                    {siteContact.email}
                  </span>
                </div>
              </a>

              <a
                href={siteContact.phoneHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 border-b border-zinc-700/60 py-4"
              >
                <FaWhatsapp
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-400 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
                  aria-hidden
                />
                <div>
                  <p className="type-label">WhatsApp / Phone</p>
                  <span className="mt-1 block text-sm font-medium text-zinc-100 transition group-hover:text-emerald-400 sm:text-[0.9375rem]">
                    {siteContact.phone}
                  </span>
                </div>
              </a>

              <button
                ref={mapTriggerRef}
                type="button"
                onClick={() => setShowMap(true)}
                className="group flex w-full items-start gap-4 border-b border-zinc-700/60 py-4 text-left"
              >
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-400 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
                  aria-hidden
                />
                <div>
                  <p className="type-label">Location</p>
                  <span className="mt-1 block text-sm font-medium text-zinc-100 transition group-hover:text-emerald-400 sm:text-[0.9375rem]">
                    Dhaka, Bangladesh · Onsite & Remote
                  </span>
                </div>
              </button>
            </div>

            <div className="mt-6 flex items-center gap-1.5">
              <a
                href={siteSocial.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </a>
              <a
                href={siteSocial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href={resumePath}
                download
                className="btn-secondary ml-auto"
              >
                <Download size={15} aria-hidden />
                Resume
              </a>
            </div>
          </div>

          <div data-contact-col>
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="map-dialog-title"
            className="modal-enter relative z-10 w-full max-w-4xl overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-700/80 px-5 py-4">
              <h3
                id="map-dialog-title"
                className="font-display text-lg text-zinc-50"
              >
                {siteContact.location}
              </h3>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMap}
                className="icon-btn"
                aria-label="Close map dialog"
              >
                <X size={20} />
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
