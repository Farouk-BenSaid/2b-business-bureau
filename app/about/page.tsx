import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import Timeline from "@/components/Timeline";
import Waves from "@/components/Waves";
import CTASection from "@/components/CTASection";
import { CORE_SERVICES } from "@/lib/data";
import { ICONS } from "@/lib/icons";

export const metadata: Metadata = {
  title: "À propos",
  description: "2B Business Bureau accompagne les entrepreneurs aux Berges du Lac, à Tunis : création, domiciliation et bureaux.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Faciliter le début de votre aventure."
        description="Nous réunissons à Tunis ce dont une société a besoin pour démarrer : un dossier, une adresse et un bureau."
      />

      <section className="section">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SplitHeading text="Notre histoire" className="text-3xl font-extrabold tracking-tight sm:text-4xl" />
            <div className="mt-6 space-y-4 text-slate-600">
              <p>
                2B Business Bureau est né d'un constat simple : créer et installer une société en Tunisie oblige à
                multiplier les démarches et les interlocuteurs.
              </p>
              <p>
                Nous avons voulu proposer un seul point d'entrée, avec des tarifs publiés et une équipe joignable, au
                B3 Herthouma, rue du Lac Léman, aux Berges du Lac.
              </p>
            </div>
          </div>
          {/* Remplacez ce bloc par une photo des bureaux (next/image) : l'effet de révélation s'applique tel quel. */}
          <Reveal variant="clip" className="overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3] bg-navy-900">
              <Waves className="absolute inset-0 h-full w-full text-white/10" />
              <p className="absolute bottom-6 left-6 max-w-[14rem] text-lg font-bold text-white">
                Les Berges du Lac, Tunis
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-x">
          <SplitHeading text="Notre mission" className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl" />
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Donner aux créateurs d'entreprise une base solide dès le premier jour : une structure juridique claire, une
            adresse reconnue et, si besoin, un bureau où travailler.
          </p>
          <Reveal variant="stagger" className="mt-12 grid gap-6 md:grid-cols-3">
            {CORE_SERVICES.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <div key={s.id} className="rounded-2xl bg-white p-7">
                  <Icon className="text-crimson-600" size={26} aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.summary}</p>
                </div>
              );
            })}
          </Reveal>
          <p className="mt-8 text-sm">
            <Link href="/services" className="font-semibold underline underline-offset-4 hover:text-crimson-600">
              Voir tous les services
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SplitHeading text="Notre parcours" className="text-3xl font-extrabold tracking-tight sm:text-4xl" />
            <p className="mt-4 max-w-sm text-slate-600">Les grandes étapes qui nous ont menés aux Berges du Lac.</p>
          </div>
          <Timeline />
        </div>
      </section>

      <CTASection />
    </>
  );
}
