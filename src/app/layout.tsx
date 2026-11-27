import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { site } from "@/lib/site";
import { siteEntities } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sistema de gestão para empresas de instalação | Joshua",
    template: "%s | Joshua",
  },
  description: site.description,
  applicationName: site.name,
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const graph = { "@context": "https://schema.org", "@graph": siteEntities };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={bricolage.variable}>
      <body className="min-h-dvh">
        <JsonLd data={graph} />
        {children}
      </body>
    </html>
  );
}
