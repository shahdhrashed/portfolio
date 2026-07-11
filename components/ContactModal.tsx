"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "sending" | "sent" | "error";

const OVERLAY = { hidden: { opacity: 0 }, show: { opacity: 1 } };
const PANEL = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 420, damping: 32 } },
  exit: { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.18 } },
};

export default function ContactButton() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", body: "" });

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setErrorMsg("");
      setForm({ name: "", email: "", subject: "", body: "" });
    }, 250);
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-accent";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-dark"
      >
        Let&apos;s Talk
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            variants={OVERLAY}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              variants={PANEL}
              initial="hidden"
              animate="show"
              exit="exit"
              className="relative w-full max-w-md rounded-2xl border border-line bg-paper shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-line px-6 py-5">
                <div>
                  <h2 className="font-serif text-2xl">Let&apos;s Talk</h2>
                  <p className="mt-0.5 text-sm text-muted">I&apos;ll get back to you as soon as I can.</p>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="ml-4 mt-0.5 text-muted transition-colors hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                {status === "sent" ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="mt-3 font-semibold text-ink">Message sent!</p>
                    <p className="mt-1 text-sm text-muted">Thanks for reaching out. I&apos;ll be in touch soon.</p>
                    <button onClick={handleClose} className="mt-5 text-sm font-medium text-accent hover:underline">
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">
                          Name <span className="text-accent">*</span>
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={set("name")}
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">
                          Email <span className="text-accent">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={set("email")}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted">Subject</label>
                      <input
                        value={form.subject}
                        onChange={set("subject")}
                        placeholder="What's this about?"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted">
                        Message <span className="text-accent">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.body}
                        onChange={set("body")}
                        placeholder="Write your message here…"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-accent">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full rounded-full bg-accent py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-dark disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
