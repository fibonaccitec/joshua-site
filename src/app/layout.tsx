import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { site } from "@/lib/site";
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
    default: "Joshua · Sistema de gestão para integradoras",
    template: "%s · Joshua",
  },
  description: site.description,
  applicationName: site.name,
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.publisher,
  url: site.url,
  logo: `${site.url}/assets/logo_joshua_desktop.png`,
  brand: { "@type": "Brand", name: site.name },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={bricolage.variable}>
      <body className="min-h-dvh">
        <JsonLd data={organization} />
        {children}
      </body>
    </html>
  );
}
