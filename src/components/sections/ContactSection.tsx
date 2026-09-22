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
  const dialogRef = useRef<HTMLDivElement>(null);

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
      if (e.key === "Escape") {
        closeMap();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
          subtitle="Open to backend and full-stack roles — Dhaka or remote. I usually reply within 24–48 hours."
        />

        <div
          data-contact-grid
          className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14"
        >
          <div data-contact-col className="flex min-w-0 flex-col">
            <div className="space-y-0">
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

              <div className="flex items-start gap-4 border-b border-zinc-700/60 py-4">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-400"
                  aria-hidden
                />
                <div>
                  <p className="type-label">Location</p>
                  <p className="mt-1 text-sm font-medium text-zinc-100 sm:text-[0.9375rem]">
                    Dhaka, Bangladesh · Onsite & Remote
                  </p>
                  <button
                    ref={mapTriggerRef}
                    type="button"
                    onClick={() => setShowMap(true)}
                    className="mt-1.5 text-sm text-zinc-500 underline-offset-2 transition hover:text-emerald-400 hover:underline"
                  >
                    View map
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1.5">
              <a
                href={siteSocial.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="GitHub Profile"
              >
                <FiGithub size={18} aria-hidden />
              </a>
              <a
                href={siteSocial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn Profile"
              >
                <FiLinkedin size={18} aria-hidden />
              </a>
              <a href={resumePath} download className="btn-secondary ml-auto">
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
          className="fixed inset-0 z-[95] flex items-center justify-center p-4"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close map"
            onClick={closeMap}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div
            ref={dialogRef}
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
