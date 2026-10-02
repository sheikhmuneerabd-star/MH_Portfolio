"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolio, gmailLink, whatsappLink } from "@/data/portfolio";
import ContactForm from "@/components/ContactForm";
import { SocialIcon, MailIcon, PhoneIcon } from "@/components/Icons";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const { contact, profile, socials } = portfolio;
  const initials = profile.name.split(" ").map((w) => w[0]).join("");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".c-line", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".c-head", start: "top 85%" },
      });
      gsap.from(".c-fade", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".c-head", start: "top 70%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="contact" className="px-5 py-24 md:px-10 md:py-40">
      <div className="c-head grid gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <div>
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-dusk">{contact.eyebrow}</p>
          <h2
            className="font-display leading-[0.95]"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            {contact.heading.map((l) => (
              <span key={l} className="block overflow-hidden pb-2">
                <span className="c-line block">{l}</span>
              </span>
            ))}
          </h2>

          <p className="c-fade mt-8 max-w-md text-lg text-moon/70">{contact.text}</p>

          <div className="c-fade mt-10 space-y-4">
            <a
              href={gmailLink(profile.email)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 font-display text-2xl underline-offset-8 transition-colors hover:text-sky hover:underline md:text-4xl"
            >
              <MailIcon className="h-7 w-7 shrink-0" />
              <span className="break-all">{profile.email}</span>
            </a>
            <a
              href={whatsappLink(profile.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center gap-4 font-display text-2xl underline-offset-8 transition-colors hover:text-sky hover:underline md:text-4xl"
            >
              <PhoneIcon className="h-7 w-7 shrink-0" />
              {profile.whatsapp}
            </a>
          </div>

          {/* Mini profile card */}
          <div className="c-fade mt-12 flex flex-wrap items-center gap-5 rounded-3xl border border-moon/15 bg-midnight/60 p-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sky font-display text-2xl text-night">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl">{profile.name}</p>
              <p className="text-sm text-moon/60">
                {profile.role} · {profile.location}
              </p>
            </div>
            <ul className="flex gap-2">
              {socials.map((s) => (
                <li key={s.type}>
                  <a
                    href={s.href}
                    target={s.type === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-moon/20 transition-colors hover:border-sky hover:bg-sky hover:text-night"
                  >
                    <SocialIcon type={s.type} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: form */}
        <div className="c-fade rounded-[2.5rem] border border-moon/15 bg-midnight/60 p-6 md:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}