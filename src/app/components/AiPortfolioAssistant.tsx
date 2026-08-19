"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import { TbMessageChatbot, TbSparkles } from "react-icons/tb";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

type ContactStep =
  | "idle"
  | "name"
  | "email"
  | "project"
  | "timeline"
  | "confirm"
  | "sending"
  | "done";

interface ContactLead {
  name: string;
  email: string;
  project: string;
  timeline: string;
}

const starterPrompts = [
  "Summarize Reaz's backend skills",
  "What is Reaz's most successful project?",
  "Which project uses AI?",
  "How can I contact Reaz?",
];

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Ask about Reaz's projects, skills, education, resume, or contact details.",
  },
];

function createMessage(role: Message["role"], content: string): Message {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
  };
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function detectContactIntent(value: string): boolean {
  return /\b(hire|hiring|available|availability|contact|message|email|whatsapp|project inquiry|work with|build my|need a developer|backend developer|full-stack developer|developer chai|hire korte|contact korte|kotha bolte|kaj korte|project niye|proposal)\b/i.test(
    value,
  );
}

function isAffirmative(value: string): boolean {
  return /^(yes|yeah|yep|sure|send|confirm|ok|okay|done|ha|haan|hmm|pathao|send koro|confirm koro)$/i.test(
    value.trim(),
  );
}

function isNegative(value: string): boolean {
  return /^(no|nope|cancel|stop|na|nah|bad dao|bad|skip|skip it)$/i.test(
    value.trim(),
  );
}

function createLeadSummary(lead: ContactLead): string {
  return [
    "Project inquiry for Reaz",
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Project: ${lead.project}`,
    `Timeline / budget: ${lead.timeline || "Not specified"}`,
    "",
    "Source: AI Portfolio Assistant",
  ].join("\n");
}

export default function AiPortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contactStep, setContactStep] = useState<ContactStep>("idle");
  const [lead, setLead] = useState<ContactLead>({
    name: "",
    email: "",
    project: "",
    timeline: "",
  });
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputPlaceholder =
    contactStep === "idle" || contactStep === "done"
      ? "Ask about projects or start an inquiry..."
      : contactStep === "confirm"
        ? "Reply yes to send or no to cancel..."
        : "Share the requested detail...";

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
    inputRef.current?.focus();
  }, [messages, open]);

  useEffect(() => {
    if (open && typeof window !== "undefined" && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || loading) return;

    if (contactStep !== "idle" && contactStep !== "done") {
      await handleContactFlow(trimmed);
      return;
    }

    if (detectContactIntent(trimmed)) {
      startContactFlow(trimmed);
      return;
    }

    const nextMessages = [...messages, createMessage("user", trimmed)];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.id !== "welcome")
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json()) as {
        answer?: string;
        error?: string;
      };

      if (!response.ok || !data.answer) {
        throw new Error(
          data.error ?? "The assistant could not answer right now.",
        );
      }

      setMessages((current) => [
        ...current,
        createMessage("assistant", data.answer ?? ""),
      ]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "The assistant could not answer right now.";
      setError(message);
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "Sorry, I could not answer that. Please try again in a moment.",
        ),
      ]);
    } finally {
      setLoading(false);
    }
  }

  function appendExchange(userContent: string, assistantContent: string) {
    setMessages((current) => [
      ...current,
      createMessage("user", userContent),
      createMessage("assistant", assistantContent),
    ]);
    setInput("");
    setError("");
  }

  function startContactFlow(initialRequest: string) {
    setContactStep("name");
    setLead({
      name: "",
      email: "",
      project: initialRequest,
      timeline: "",
    });
    appendExchange(
      initialRequest,
      "Great. I can send a focused project inquiry to Reaz from here. What is your name?",
    );
  }

  async function handleContactFlow(value: string) {
    if (contactStep === "name") {
      setLead((current) => ({ ...current, name: value }));
      setContactStep("email");
      appendExchange(value, "Thanks. What email should Reaz reply to?");
      return;
    }

    if (contactStep === "email") {
      if (!isValidEmail(value)) {
        appendExchange(
          value,
          "That email does not look valid. Please send a valid email address.",
        );
        return;
      }

      setLead((current) => ({ ...current, email: value }));
      setContactStep("project");
      appendExchange(
        value,
        "Got it. Briefly describe the project, product, or backend problem you want help with.",
      );
      return;
    }

    if (contactStep === "project") {
      const updatedLead = { ...lead, project: value };
      setLead(updatedLead);
      setContactStep("timeline");
      appendExchange(
        value,
        "Useful. Any timeline, budget range, or urgency? You can also say 'skip'.",
      );
      return;
    }

    if (contactStep === "timeline") {
      const updatedLead = {
        ...lead,
        timeline: isNegative(value) ? "" : value,
      };
      setLead(updatedLead);
      setContactStep("confirm");
      appendExchange(
        value,
        `${createLeadSummary(updatedLead)}\n\nShould I send this to Reaz? Reply yes to send or no to cancel.`,
      );
      return;
    }

    if (contactStep === "confirm") {
      if (isNegative(value)) {
        setContactStep("idle");
        appendExchange(
          value,
          "No problem. I cancelled the inquiry. You can still contact Reaz directly at reazul.dev@gmail.com or WhatsApp: +8801770807782.",
        );
        return;
      }

      if (!isAffirmative(value)) {
        appendExchange(value, "Please reply yes to send it, or no to cancel.");
        return;
      }

      await submitContactLead(value);
    }
  }

  async function submitContactLead(confirmText: string) {
    setMessages((current) => [...current, createMessage("user", confirmText)]);
    setInput("");
    setError("");
    setLoading(true);
    setContactStep("sending");

    try {
      const payload = {
        user_name: lead.name,
        user_email: lead.email,
        message: createLeadSummary(lead),
        time: new Date().toISOString(),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Unable to send the inquiry right now.");
      }

      setContactStep("done");
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "Done. I sent your project inquiry to Reaz. He can reply to your email directly.",
        ),
      ]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to send the inquiry right now.";
      setError(message);
      setContactStep("idle");
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "I could not send the inquiry from chat right now. You can contact Reaz directly at reazul.dev@gmail.com or WhatsApp: +8801770807782.",
        ),
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <>
      {/* Mobile dark backdrop overlay when chatbot is open */}
      {open ? (
        <div
          className="fixed inset-0 z-[85] bg-black/75 backdrop-blur-xs transition-opacity sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <div className="fixed bottom-4 right-4 z-[90] sm:bottom-6 sm:right-6">
        {open ? (
          <section
            className="fixed inset-x-0 bottom-0 top-10 z-[90] flex flex-col overflow-hidden rounded-t-3xl border-t border-zinc-800/90 bg-zinc-950/98 shadow-2xl backdrop-blur-2xl sm:absolute sm:bottom-16 sm:right-0 sm:top-auto sm:inset-x-auto sm:h-[min(620px,calc(100dvh-6.5rem))] sm:w-[400px] sm:rounded-2xl sm:border sm:border-zinc-800/90"
            aria-label="AI portfolio assistant"
          >
            {/* Mobile grab bar indicator */}
            <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
              <div className="h-1 w-10 rounded-full bg-zinc-700/60" />
            </div>

            <header className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  <TbSparkles size={22} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-zinc-50">
                    AI Portfolio Assistant
                  </h2>
                  <p className="truncate text-xs text-zinc-400 sm:text-zinc-500">
                    Answers questions and sends project inquiries
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 cursor-pointer shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Close AI assistant"
              >
                <FiX size={18} aria-hidden />
              </button>
            </header>

            <div
              ref={listRef}
              data-lenis-prevent
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4 overscroll-contain touch-pan-y"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[85%] break-words [overflow-wrap:anywhere] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      message.role === "user"
                        ? "bg-zinc-100 text-zinc-950 font-semibold dark:bg-zinc-100 dark:text-zinc-950"
                        : "border border-zinc-800/90 bg-zinc-900/90 text-zinc-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 text-sm text-zinc-400">
                    Thinking...
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-zinc-800/80 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] bg-zinc-950/98">
              {messages.length === 1 ? (
                <div className="mb-3 flex flex-nowrap overflow-x-auto gap-2 pb-1.5 scrollbar-none sm:flex-wrap sm:overflow-x-visible">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt)}
                      className="shrink-0 whitespace-nowrap rounded-lg border border-zinc-800 cursor-pointer bg-zinc-900/80 px-3 py-2 text-left text-xs text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300 sm:shrink sm:whitespace-normal"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              ) : null}

              {error ? (
                <p className="mb-2 text-xs font-medium text-red-400">{error}</p>
              ) : null}

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={1000}
                  placeholder={inputPlaceholder}
                  className="min-h-11 min-w-0 flex-1 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 text-base sm:text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-zinc-100 text-zinc-950 font-bold shadow-md transition hover:bg-white active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
                  aria-label="Send message"
                >
                  <FiSend size={18} aria-hidden />
                </button>
              </form>
            </div>
          </section>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative inline-flex h-13 w-13 sm:h-14 sm:w-14 cursor-pointer items-center justify-center rounded-2xl border border-zinc-700/80 bg-zinc-900 text-zinc-100 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-zinc-500 hover:bg-zinc-800 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Open AI portfolio assistant"
            aria-expanded="false"
          >
            <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-zinc-400/15 to-emerald-500/20 blur-sm opacity-50 transition duration-300 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center justify-center">
              <TbMessageChatbot
                size={26}
                aria-hidden
                className="text-zinc-100 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
            </span>
          </button>
        )}
      </div>
    </>
  );
}
