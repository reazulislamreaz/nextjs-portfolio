"use client";

import { useRef, useState, type FormEvent } from "react";
import { FiAlertCircle, FiCheck, FiLoader, FiSend } from "react-icons/fi";

type FormStatus = "idle" | "loading" | "success" | "error";

type FieldKey = "user_name" | "user_email" | "message";

type FieldErrors = Partial<Record<FieldKey, string>>;

const MAX_NAME = 120;
const MAX_SUBJECT = 160;
const MAX_MESSAGE = 5000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-md border border-zinc-700 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-50 placeholder-zinc-500 transition hover:border-zinc-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-60";

const fieldErrorClass =
  "border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600 dark:border-red-400 dark:hover:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const resetForm = () => {
    form.current?.reset();
    setStatus("idle");
    setErrorMessage("");
    setFieldErrors({});
  };

  const clearFieldError = (key: FieldKey) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.current || status === "loading") return;

    const formData = new FormData(form.current);
    const user_name = String(formData.get("user_name") ?? "").trim();
    const user_email = String(formData.get("user_email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    // Ignore honeypot value from autofill — only treat clearly bot-like values.
    // Real bots often fill every input; humans/autofill leave it empty when hidden with display:none.
    const honeypotRaw = String(formData.get("contact_extra_field") ?? "").trim();

    const nextFieldErrors: FieldErrors = {};
    if (!user_name) nextFieldErrors.user_name = "Required";
    if (!user_email) nextFieldErrors.user_email = "Required";
    else if (!EMAIL_PATTERN.test(user_email)) {
      nextFieldErrors.user_email = "Invalid email";
    }
    if (!message) nextFieldErrors.message = "Required";

    const errorKeys = Object.keys(nextFieldErrors) as FieldKey[];

    if (errorKeys.length > 0) {
      setFieldErrors(nextFieldErrors);
      setErrorMessage("");
      setStatus("error");
      form.current
        .querySelector<HTMLElement>(`[name="${errorKeys[0]}"]`)
        ?.focus();
      return;
    }

    if (
      user_name.length > MAX_NAME ||
      subject.length > MAX_SUBJECT ||
      message.length > MAX_MESSAGE
    ) {
      setFieldErrors({});
      setErrorMessage("Too long — shorten a field and retry.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name,
          user_email,
          subject,
          message,
          time: new Date().toLocaleString(),
          // Only send honeypot key when non-empty so empty autofill noise isn't an issue
          ...(honeypotRaw ? { _honey_trap_field: honeypotRaw } : {}),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
        delivered?: boolean;
        provider?: string;
        code?: string;
      };

      if (!response.ok) {
        setErrorMessage(data.error ?? "Couldn't send. Try again.");
        setStatus("error");
        return;
      }

      // Treat missing `delivered` as success for older API responses.
      // Never show a hard failure for silent bot filtering.
      if (data.ok === false) {
        setErrorMessage(
          data.error ?? "Couldn't send. Email or WhatsApp me instead.",
        );
        setStatus("error");
        return;
      }

      form.current.reset();
      setStatus("success");
    } catch {
      setErrorMessage("No connection. Check the network and retry.");
      setStatus("error");
    }
  };

  return (
    <div className="surface-card h-full w-full rounded-lg p-5 sm:p-6 lg:p-7">
      {status === "success" ? (
        <div
          className="status-enter flex flex-col items-start py-2"
          role="status"
          aria-live="polite"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-md border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
            <FiCheck size={20} aria-hidden />
          </span>
          <h3 className="type-card-title mt-5">Message sent</h3>
          <p className="type-body mt-2 max-w-sm text-pretty">
            Thanks — I&apos;ll reply within 24–48 hours. If you don&apos;t see a
            reply, check spam or follow up via WhatsApp.
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="btn-secondary mt-6"
          >
            Send another message
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="type-card-title">Send a message</h3>
            <p className="type-meta mt-1.5">
              Role, stack, and onsite or remote
            </p>
          </div>

          {status === "error" && errorMessage ? (
            <div
              className="status-enter mb-5 flex items-start gap-2.5 rounded-md border border-red-700/35 bg-red-600/12 px-3.5 py-2.5 dark:border-red-400/35 dark:bg-red-500/15"
              role="alert"
            >
              <FiAlertCircle
                className="mt-0.5 shrink-0 text-red-700 dark:text-red-300"
                size={16}
                aria-hidden
              />
              <p className="text-sm text-red-800 dark:text-red-100">
                {errorMessage}
              </p>
            </div>
          ) : null}

          <form ref={form} onSubmit={sendEmail} className="space-y-5" noValidate>
            <div
              aria-hidden="true"
              className="hidden"
            >
              <label htmlFor="contact_extra_field">Company website</label>
              <input
                type="text"
                id="contact_extra_field"
                name="contact_extra_field"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Name <span className="text-red-700 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                name="user_name"
                id="name"
                required
                aria-invalid={Boolean(fieldErrors.user_name)}
                aria-describedby={
                  fieldErrors.user_name ? "name-error" : undefined
                }
                maxLength={MAX_NAME}
                disabled={status === "loading"}
                className={`${fieldClass} ${fieldErrors.user_name ? fieldErrorClass : ""}`}
                placeholder="Your full name"
                autoComplete="name"
                onChange={() => clearFieldError("user_name")}
              />
              {fieldErrors.user_name ? (
                <p
                  id="name-error"
                  className="mt-1.5 text-sm text-red-700 dark:text-red-300"
                >
                  {fieldErrors.user_name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Email <span className="text-red-700 dark:text-red-400">*</span>
              </label>
              <input
                type="email"
                name="user_email"
                id="email"
                required
                aria-invalid={Boolean(fieldErrors.user_email)}
                aria-describedby={
                  fieldErrors.user_email ? "email-error" : undefined
                }
                disabled={status === "loading"}
                className={`${fieldClass} ${fieldErrors.user_email ? fieldErrorClass : ""}`}
                placeholder="your.email@example.com"
                autoComplete="email"
                onChange={() => clearFieldError("user_email")}
              />
              {fieldErrors.user_email ? (
                <p
                  id="email-error"
                  className="mt-1.5 text-sm text-red-700 dark:text-red-300"
                >
                  {fieldErrors.user_email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Subject{" "}
                <span className="font-normal text-zinc-500">(optional)</span>
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                maxLength={MAX_SUBJECT}
                disabled={status === "loading"}
                className={fieldClass}
                placeholder="Role, project, or topic"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Message <span className="text-red-700 dark:text-red-400">*</span>
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={
                  fieldErrors.message ? "message-error" : undefined
                }
                maxLength={MAX_MESSAGE}
                disabled={status === "loading"}
                className={`${fieldClass} resize-none ${fieldErrors.message ? fieldErrorClass : ""}`}
                placeholder="Role, stack, and whether it’s onsite or remote…"
                onChange={() => clearFieldError("message")}
              />
              {fieldErrors.message ? (
                <p
                  id="message-error"
                  className="mt-1.5 text-sm text-red-700 dark:text-red-300"
                >
                  {fieldErrors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
              aria-busy={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <FiLoader className="animate-spin" size={16} aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <FiSend size={15} aria-hidden />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
