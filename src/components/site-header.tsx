import Link from "next/link";
import { demoUrl, nav, site } from "@/lib/site";

/** `current` marks the nav item of the page being viewed (e.g. "/precos"). */
export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="flex flex-wrap items-baseline gap-x-12 gap-y-4 border-b border-ink py-7 md:py-9">
      <Link href="/" className="text-[1.625rem] font-extrabold tracking-[-0.04em]">
        joshua
      </Link>
      <nav aria-label="Principal" className="hidden gap-8 md:flex">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item.href === current ? "page" : undefined}
            className="caption hover:text-brand aria-[current=page]:text-brand"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-baseline gap-6 sm:gap-8">
        <Link href="/precos" className="caption hover:text-brand md:hidden">
          Preços
        </Link>
        <a href={site.appUrl} className="caption hidden text-mute hover:text-ink sm:inline">
          Entrar
        </a>
        <a
          href={demoUrl()}
          target="_blank"
          rel="noopener"
          className="caption border-b-2 border-signal pb-0.5 hover:border-ink"
        >
          Agendar demonstração <span aria-hidden="true">→</span>
          <span className="sr-only"> (abre o WhatsApp)</span>
        </a>
      </div>
    </header>
  );
}
