"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Screen } from "@/lib/screens";

export type PickerItem = {
  slug: string;
  label: string;
  href: string;
  before: string;
  after: string;
  screen: Screen;
};

/**
 * "Qual é a sua empresa?": each chip swaps the pain, the answer and the real
 * screen for that segment, and links to the segment page.
 */
export function SegmentPicker({
  items,
  others,
  headingId,
}: {
  items: readonly PickerItem[];
  others: string;
  headingId: string;
}) {
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <div>
      <h2 id={headingId} className="text-[clamp(2rem,3.6vw,2.75rem)] font-light tracking-[-0.03em]">
        Qual é a sua empresa?
      </h2>
      <div role="group" aria-label="Segmentos" className="mt-6 flex flex-wrap gap-2">
        {items.map((it, i) => (
          <button
            key={it.slug}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className="rounded-full border border-on-ink-mute px-4 py-2.5 text-[0.9375rem] font-semibold text-brand-soft transition-colors hover:border-on-ink hover:text-on-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal aria-pressed:border-on-ink aria-pressed:bg-on-ink aria-pressed:text-ink"
          >
            {it.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-base font-bold text-signal">{item.label}</p>
          <div aria-live="polite" aria-atomic="true">
            <p className="mt-3 text-[clamp(1.5rem,2.4vw,1.875rem)] leading-tight font-light text-on-ink">
              “{item.before}”
            </p>
            <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-on-ink-soft">
              {item.after}
            </p>
          </div>
          <Link
            href={item.href}
            className="mt-6 inline-block border-b-2 border-signal pb-0.5 font-semibold text-on-ink transition-colors hover:border-on-ink"
          >
            Ver o Joshua para {item.label.toLowerCase()}
          </Link>
        </div>
        <div className="relative aspect-[1040/968] overflow-hidden rounded-screen bg-white shadow-stage">
          <Image
            key={item.slug}
            src={item.screen.src}
            width={item.screen.width}
            height={item.screen.height}
            alt={item.screen.alt}
            sizes="(min-width: 1024px) 720px, 100vw"
            quality={90}
            className="absolute inset-0 h-full w-full animate-[fade-in_300ms_ease-out] object-cover object-left-top motion-reduce:animate-none"
          />
        </div>
      </div>

      <p className="mt-10 text-[0.9375rem] text-on-ink-soft">
        {others}{" "}
        <Link
          href="/segmentos"
          className="font-semibold text-on-ink underline decoration-on-ink/40 underline-offset-4 hover:decoration-on-ink"
        >
          Ver todos os segmentos
        </Link>
      </p>
    </div>
  );
}
