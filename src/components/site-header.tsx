import Link from "next/link";
import { Logo } from "@/components/logo";
import { demoUrl, nav, site } from "@/lib/site";

/**
 * Sticky light bar shared by every page, carrying the two-tone logo.
 * `current` marks the nav item of the page being viewed (e.g. "/precos").
 */
export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 text-ink backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center gap-x-5 px-5 sm:gap-x-9 py-4 sm:px-10 lg:px-14">
        <Link href="/" className="mr-auto">
          <Logo eager className="w-[104px] sm:w-[118px]" />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === current ? "page" : undefined}
              className="text-[0.9375rem] font-medium text-body transition-colors hover:text-brand aria-[current=page]:font-semibold aria-[current=page]:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/segmentos"
          aria-current={current === "/segmentos" ? "page" : undefined}
          className="text-[0.9375rem] font-medium text-body hover:text-brand aria-[current=page]:font-semibold aria-[current=page]:text-brand md:hidden"
        >
          Segmentos
        </Link>
        <Link
          href="/precos"
          aria-current={current === "/precos" ? "page" : undefined}
          className="text-[0.9375rem] font-medium text-body hover:text-brand aria-[current=page]:font-semibold aria-[current=page]:text-brand md:hidden"
        >
          Preços
        </Link>
        <a
          href={site.appUrl}
          className="hidden text-[0.9375rem] font-medium text-body hover:text-brand sm:inline"
        >
          Entrar
        </a>
        <a
          href={demoUrl()}
          target="_blank"
          rel="noopener"
          className="hidden rounded-full bg-signal px-5 py-2.5 text-[0.9375rem] font-bold text-on-signal transition-colors hover:bg-ink hover:text-on-ink sm:inline-block"
        >
          Agendar demonstração
          <span className="sr-only"> (abre o WhatsApp)</span>
        </a>
      </div>
    </header>
  );
}
