"use client";

import { useEffect, useState } from "react";

/** Sticky page index that highlights the section being read. */
export function Toc({ items }: { items: readonly { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -70% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Nesta página" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
      <p className="mb-3 text-sm font-semibold text-mute">Nesta página</p>
      <ol className="grid gap-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={item.id === active ? "location" : undefined}
              className="text-body transition-colors hover:text-brand aria-[current=location]:font-semibold aria-[current=location]:text-brand"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
