import Link from "next/link";
import { demoUrl, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="grid gap-8 border-t border-ink py-12 text-sm md:grid-cols-[1fr_auto_auto] md:gap-16">
      <div>
        <p className="text-[1.375rem] font-extrabold tracking-[-0.04em]">joshua</p>
        <p className="mt-2 max-w-[40ch] text-mute">
          Um produto da {site.publisher}. Gestão para integradoras de automação, áudio, vídeo e
          segurança.
        </p>
      </div>
      <nav aria-label="Produto" className="flex flex-col gap-2">
        <p className="caption mb-1 text-mute">Produto</p>
        <Link href="/precos">Preços</Link>
        <a href={demoUrl()} target="_blank" rel="noopener">
          Agendar demonstração
        </a>
        <a href={site.appUrl}>Entrar no Joshua</a>
      </nav>
      <nav aria-label="Ajuda" className="flex flex-col gap-2">
        <p className="caption mb-1 text-mute">Ajuda</p>
        <a href="/support.html">Suporte</a>
        <a href="/privacy.html">Privacidade</a>
      </nav>
    </footer>
  );
}
