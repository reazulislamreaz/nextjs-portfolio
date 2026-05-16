"use client";

import { useRef, useState, type FormEvent } from "react";
import { FiAlertCircle, FiCheck, FiLoader, FiSend } from "react-icons/fi";

type FormStatus = "idle" | "loading" | "success" | "error";

const MAX_NAME = 120;
const MAX_MESSAGE = 5000;

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    form.current?.reset();
    setStatus("idle");
    setErrorMessage("");
  };

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.current || status === "loading") return;

    const formData = new FormData(form.current);
    const user_name = String(formData.get("user_name") ?? "").trim();
    const user_email = String(formData.get("user_email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim();

    if (!user_name || !user_email || !message) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    if (user_name.length > MAX_NAME || message.length > MAX_MESSAGE) {
      setErrorMessage("One or more fields exceed the allowed length.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name,
          user_email,
          message,
          website,
          time: new Date().toLocaleString(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again in a moment.");
        setStatus("error");
        return;
      }

      form.current.reset();
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div className="group relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] md:mx-0">
      <div className="pointer-events-none absolute inset-0 flex bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        {status === "success" ? (
          <div
            className="flex flex-col items-center py-6 text-center sm:py-10"
            role="status"
            aria-live="polite"
          >
            <div className="relative mb-6">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.15)] sm:h-20 sm:w-20">
                <FiCheck className="h-8 w-8 text-emerald-400 sm:h-9 sm:w-9" aria-hidden />
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Message sent
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400 sm:text-base">
              Thanks for reaching out. I&apos;ve received your message and will get back to you
              within <span className="text-zinc-300">24–48 hours</span>.
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              I&apos;ll reply to the email address you provided.
            </p>

            <button
              type="button"
              onClick={resetForm}
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-6 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-emerald-500/40 hover:bg-zinc-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Send another message
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="mb-2 text-3xl font-bold tracking-tight text-white">
                Initiate Contact
              </h3>
              <p className="text-sm font-light text-zinc-400 md:text-base">
                I&apos;m currently available for backend engineering roles and interesting
                projects.
              </p>
            </div>

            {status === "error" && errorMessage ? (
              <div
                className="mb-6 flex gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-left"
                role="alert"
              >
                <FiAlertCircle className="mt-0.5 shrink-0 text-red-400" size={18} aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-red-200">Couldn&apos;t send message</p>
                  <p className="mt-1 text-sm text-red-200/80">{errorMessage}</p>
                </div>
              </div>
            ) : null}

            <form ref={form} onSubmit={sendEmail} className="space-y-6" noValidate>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </div>

              <div>
                <label htmlFor="name" className="mb-2 block pl-1 text-sm font-medium text-zinc-300">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  required
                  maxLength={MAX_NAME}
                  disabled={status === "loading"}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 px-5 py-3.5 text-white placeholder-zinc-500 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block pl-1 text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  required
                  disabled={status === "loading"}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 px-5 py-3.5 text-white placeholder-zinc-500 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block pl-1 text-sm font-medium text-zinc-300"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  maxLength={MAX_MESSAGE}
                  disabled={status === "loading"}
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950/50 px-5 py-3.5 text-white placeholder-zinc-500 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Discuss architecture, team opportunities, or just say hello..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group/btn relative w-full cursor-pointer overflow-hidden rounded-xl bg-zinc-100 px-8 py-4 font-semibold text-zinc-950 shadow-lg transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:enabled:scale-[1.02] active:enabled:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
              >
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  {status === "loading" ? (
                    <>
                      <FiLoader className="animate-spin" size={18} aria-hidden />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend
                        size={17}
                        className="transition-transform group-hover/btn:translate-x-0.5"
                        aria-hidden
                      />
                    </>
                  )}
                </span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
