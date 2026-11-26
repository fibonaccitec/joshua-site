import Link from "next/link";
import { Logo } from "@/components/logo";
import { demoUrl, shell, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className={`${shell} grid gap-8 py-12 text-sm md:grid-cols-[1fr_auto_auto] md:gap-16`}>
        <div>
          <Logo className="w-[100px]" />
          <p className="mt-2 max-w-[40ch] text-mute">
            Um produto da {site.publisher}. Gestão para integradoras de automação, áudio, vídeo e
            segurança.
          </p>
        </div>
        <nav aria-label="Produto" className="flex flex-col gap-2">
          <p className="mb-1 font-semibold text-mute">Produto</p>
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
