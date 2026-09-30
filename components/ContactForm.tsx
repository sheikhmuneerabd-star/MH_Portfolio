"use client";

import { useState } from "react";
import AnimatedField from "@/components/AnimatedField";
import FillButton from "@/components/FillButton";

type Values = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "success" | "error";

const EMPTY: Values = { name: "", email: "", message: "" };
const NOT_TOUCHED = { name: false, email: false, message: false };

// Basic validation
const validate = (v: Values) => {
  const e: Partial<Values> = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
};

export default function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState(NOT_TOUCHED);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const errors = validate(values);
  const show = (k: keyof Values) => (touched[k] ? errors[k] : undefined);

  const change = (k: keyof Values) => (v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (status === "success" || status === "error") setStatus("idle");
  };
  const blur = (k: keyof Values) => () => setTouched((p) => ({ ...p, [k]: true }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length > 0) return;

    const website = String(new FormData(e.currentTarget).get("website") ?? ""); // honeypot
    setStatus("sending");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      setValues(EMPTY);
      setTouched(NOT_TOUCHED);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <AnimatedField id="name" label="Your name" autoComplete="name"
        value={values.name} onChange={change("name")} onBlur={blur("name")} error={show("name")} />
      <AnimatedField id="email" label="Email address" type="email" autoComplete="email"
        value={values.email} onChange={change("email")} onBlur={blur("email")} error={show("email")} />
      <AnimatedField id="message" label="Tell me about your project" multiline
        value={values.message} onChange={change("message")} onBlur={blur("message")} error={show("message")} />

      {/* Honeypot: insaan ko nazar nahi aata, spam bots bhar dete hain */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className="flex flex-wrap items-center gap-5">
        <FillButton type="submit" variant="solid" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </FillButton>

        <p role="status" aria-live="polite" className="text-sm">
          {status === "success" && <span className="text-sky">Thank you! Your message has been sent.</span>}
          {status === "error" && <span className="text-red-500">{serverError}</span>}
        </p>
      </div>
    </form>
  );
}