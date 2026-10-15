import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE } from "@/lib/data";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "2B Business Bureau | Création d'entreprise et domiciliation à Tunis", template: "%s | 2B Business Bureau" },
  description:
    "Création d'entreprise, domiciliation commerciale et bureaux privatifs aux Berges du Lac, à Tunis. Tarifs annoncés et devis rapide.",
  openGraph: {
    type: "website",
    locale: "fr_TN",
    siteName: SITE.name,
    title: "2B Business Bureau",
    description: "Création d'entreprise, domiciliation et bureaux privatifs aux Berges du Lac, Tunis.",
  },
};

export const viewport: Viewport = { themeColor: "#0B1F3A" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  telephone: SITE.phone,
  email: SITE.email,
  url: SITE.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: "B3 Herthouma, Rue Du Lac Léman",
    addressLocality: "Les Berges du Lac, Tunis",
    postalCode: "1053",
    addressCountry: "TN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-crimson-500 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu
        </a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
