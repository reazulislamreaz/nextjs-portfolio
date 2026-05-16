"use client";
import React, { useRef, useEffect, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    emailjs.init("vh3xBQbYnuH1mKR3J");
  }, []);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        form.current
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Your message has been sent successfully.",
            confirmButtonColor: "#000000",
            timer: 2000,
          });
          form.current?.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error?.text || "Failed to send message. Please try again later.",
            confirmButtonColor: "#DC2626",
          });
        }
      );
  };

  return (
    <div className="group relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] md:mx-0">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Initiate Contact
          </h3>
          <p className="text-zinc-400 text-sm md:text-base font-light">
            I&apos;m currently available for backend engineering roles and interesting projects.
          </p>
        </div>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-300 mb-2 pl-1"
            >
              Name
            </label>
            <input
              type="text"
              name="user_name"
              id="name"
              required
              className="w-full px-5 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 hover:border-zinc-700 backdrop-blur-sm"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300 mb-2 pl-1"
            >
              Email
            </label>
            <input
              type="email"
              name="user_email"
              id="email"
              required
              className="w-full px-5 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 hover:border-zinc-700 backdrop-blur-sm"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-300 mb-2 pl-1"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              className="w-full px-5 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 hover:border-zinc-700 backdrop-blur-sm resize-none"
              placeholder="Discuss architecture, team opportunities, or just say hello..."
            ></textarea>
          </div>

          <input
            type="hidden"
            name="time"
            value={new Date().toLocaleString()}
          />

          <button
            type="submit"
            className="group/btn relative w-full cursor-pointer overflow-hidden rounded-xl bg-zinc-100 px-8 py-4 font-semibold text-zinc-950 shadow-lg transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Send Message
              <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}