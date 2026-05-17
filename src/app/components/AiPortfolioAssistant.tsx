"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import { TbMessageChatbot, TbSparkles } from "react-icons/tb";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const starterPrompts = [
  "Summarize Reaz's backend skills",
  "Which project uses AI?",
  "Explain the Confaero project.",
  "How can I contact Reaz?",
];

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hi, I can answer questions about Reaz's projects, skills, education, resume, and contact details.",
  },
];

function createMessage(role: Message["role"], content: string): Message {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
  };
}

export default function AiPortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
    inputRef.current?.focus();
  }, [messages, open]);

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || loading) return;

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6">
      {open ? (
        <section
          className="mb-3 flex h-[min(620px,calc(100dvh-6.5rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl sm:w-[400px]"
          aria-label="AI portfolio assistant"
        >
          <header className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                <TbSparkles size={22} aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-white">
                  AI Portfolio Assistant
                </h2>
                <p className="truncate text-xs text-zinc-500">
                  Powered by Groq
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
              aria-label="Close AI assistant"
            >
              <FiX size={18} aria-hidden />
            </button>
          </header>

          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-emerald-500 text-zinc-950"
                      : "border border-zinc-800 bg-zinc-900/80 text-zinc-300"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading ? (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-400">
                  Thinking...
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-zinc-800/80 p-3">
            {messages.length === 1 ? (
              <div className="mb-3 flex flex-wrap gap-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-left text-xs text-zinc-400 transition hover:border-emerald-500/40 hover:text-emerald-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}

            {error ? (
              <p className="mb-2 text-xs text-red-300">{error}</p>
            ) : null}

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1000}
                placeholder="Ask about projects or skills..."
                className="min-h-11 min-w-0 flex-1 rounded-xl border border-zinc-800 bg-black/40 px-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/50"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-950 transition hover:bg-white disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
                aria-label="Send message"
              >
                <FiSend size={18} aria-hidden />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500 text-zinc-950 shadow-xl shadow-emerald-950/40 transition hover:scale-105 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-zinc-950"
        aria-label={
          open ? "Hide AI portfolio assistant" : "Open AI portfolio assistant"
        }
        aria-expanded={open ? "true" : "false"}
      >
        <TbMessageChatbot
          size={28}
          aria-hidden
          className="transition group-hover:scale-105"
        />
      </button>
    </div>
  );
}
