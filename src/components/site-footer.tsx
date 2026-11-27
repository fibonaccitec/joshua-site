import Link from "next/link";
import { Logo } from "@/components/logo";
import { segmentPath, segments } from "@/lib/segments";
import { demoUrl, shell, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div
        className={`${shell} grid gap-8 py-12 text-sm md:grid-cols-3 md:gap-12 lg:grid-cols-[minmax(16rem,1fr)_auto_auto_auto] lg:gap-16`}
      >
        <div className="md:col-span-3 lg:col-span-1">
          <Logo className="w-[100px]" />
          <p className="mt-2 max-w-[40ch] text-mute">
            Um produto da {site.publisher}. Gestão para empresas que vendem e instalam: energia
            solar, ar-condicionado, automação, segurança, esquadrias, cortinas e persianas.
          </p>
        </div>
        <nav aria-label="Segmentos" className="flex flex-col gap-2">
          <p className="mb-1 font-semibold text-mute">Segmentos</p>
          {segments.map((s) => (
            <Link key={s.slug} href={segmentPath(s.slug)} className="hover:text-brand">
              {s.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Produto" className="flex flex-col gap-2">
          <p className="mb-1 font-semibold text-mute">Produto</p>
          <Link href="/#como-funciona" className="hover:text-brand">
            Como funciona
          </Link>
          <Link href="/#app-de-campo" className="hover:text-brand">
            App de campo
          </Link>
          <Link href="/precos" className="hover:text-brand">
            Preços
          </Link>
          <a href={demoUrl()} target="_blank" rel="noopener" className="hover:text-brand">
            Agendar demonstração
            <span className="sr-only"> (abre o WhatsApp)</span>
          </a>
          <a href={site.appUrl} className="hover:text-brand">
            Entrar no Joshua
          </a>
        </nav>
        <nav aria-label="Ajuda" className="flex flex-col gap-2">
          <p className="mb-1 font-semibold text-mute">Ajuda</p>
          <Link href="/suporte" className="hover:text-brand">
            Suporte
          </Link>
          <Link href="/privacidade" className="hover:text-brand">
            Privacidade
          </Link>
        </nav>
      </div>
    </footer>
  );
}
