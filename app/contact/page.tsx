import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import Waves from "@/components/Waves";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact et devis",
  description: "Contactez 2B Business Bureau ou demandez un devis en trois étapes. Les Berges du Lac, Tunis.",
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { service } = await searchParams;

  return (
    <>
      <PageHero
        title="Parlons de votre projet."
        description="Remplissez le formulaire en trois étapes, ou contactez-nous directement."
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8">
            <Reveal variant="stagger" className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-crimson-600" aria-hidden="true" />
                <div>
                  <h2 className="font-bold">Adresse</h2>
                  <address className="mt-1 not-italic text-slate-600">
                    {SITE.addressLines[0]}
                    <br />
                    {SITE.addressLines[1]}
                  </address>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-crimson-600" aria-hidden="true" />
                <div>
                  <h2 className="font-bold">Téléphone</h2>
                  <a href={SITE.phoneHref} className="mt-1 block text-slate-600 hover:text-crimson-600">{SITE.phone}</a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="mt-1 shrink-0 text-crimson-600" aria-hidden="true" />
                <div>
                  <h2 className="font-bold">E-mail</h2>
                  <a href={`mailto:${SITE.email}`} className="mt-1 block text-slate-600 hover:text-crimson-600">{SITE.email}</a>
                </div>
              </div>
            </Reveal>

            {/* Placeholder: remplacez par une carte intégrée (Google Maps embed ou Mapbox) quand le client a choisi. */}
            <Reveal variant="clip" className="overflow-hidden rounded-3xl">
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/3] bg-navy-900"
              >
                <Waves className="absolute inset-0 h-full w-full text-white/10" />
                <span className="absolute left-1/2 top-[42%] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-crimson-500 text-white">
                  <MapPin size={22} aria-hidden="true" />
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-navy-950/70 px-5 py-4 text-sm font-semibold text-white">
                  Ouvrir dans Google Maps
                  <ArrowUpRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          </div>

          <QuoteForm initialService={service} />
        </div>
      </section>
    </>
  );
}
