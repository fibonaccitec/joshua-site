"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Screen } from "@/lib/screens";

export type TourStep = {
  label: string;
  text: string;
  screen: Screen;
};

const AUTO_ADVANCE_MS = 4500;

/**
 * Clickable tour of the product: each step swaps the large screen.
 * It advances on its own until the visitor interacts, and never when the
 * visitor asked the system for reduced motion.
 */
export function ProductTour({ steps }: { steps: readonly TourStep[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % steps.length),
      AUTO_ADVANCE_MS,
    );
    return () => window.clearInterval(id);
  }, [auto, steps.length]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <div
      className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16"
      onPointerEnter={() => setAuto(false)}
      onFocusCapture={() => setAuto(false)}
    >
      <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0">
          {steps.map((step, i) => {
            const on = i === active;
            return (
              <li key={step.label} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(i)}
                  className={`w-full rounded-screen px-5 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal lg:py-5 ${
                    on ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`block text-xl font-bold tracking-[-0.03em] transition-colors lg:text-step ${
                      on ? "text-on-ink" : "text-on-ink-mute"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span
                    className={`mt-2 hidden max-w-[34ch] text-[0.9375rem] leading-relaxed text-on-ink-soft ${
                      on ? "lg:block" : ""
                    }`}
                  >
                    {step.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p aria-live="polite" className="mt-4 text-[0.9375rem] leading-relaxed text-on-ink-soft lg:hidden">
          {steps[active].text}
        </p>
      </div>

      <div className="relative aspect-[16/10] min-w-0 overflow-hidden rounded-screen bg-white shadow-stage">
        {steps.map((step, i) => (
          <Image
            key={step.label}
            src={step.screen.src}
            width={step.screen.width}
            height={step.screen.height}
            alt={step.screen.alt}
            aria-hidden={i !== active}
            sizes="(min-width: 1024px) 860px, 100vw"
            quality={90}
            className={`absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-500 motion-reduce:transition-none ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
