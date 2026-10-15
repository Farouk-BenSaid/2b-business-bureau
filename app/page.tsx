import Link from "next/link";
import { ArrowRight, Building2, Clock, MapPin } from "lucide-react";
import Plaque from "@/components/Plaque";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import Waves from "@/components/Waves";
import ServiceShowcase from "@/components/ServiceShowcase";
import Process from "@/components/Process";
import StatsTicker from "@/components/StatsTicker";
import CTASection from "@/components/CTASection";
import { VALUE_PROPS } from "@/lib/data";

const BADGES = [
  { icon: MapPin, label: "Siège aux Berges du Lac" },
  { icon: Clock, label: "Démarches expliquées" },
  { icon: Building2, label: "Bureaux prêts à l'emploi" },
];

export default function HomePage() {
  return (
    <>
      <section className="slant-b relative overflow-hidden bg-gradient-to-br from-navy-900 to-navy-950 pb-28 pt-32 text-white sm:pb-36 sm:pt-40 lg:pt-44">
        <Waves className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 w-full text-white/10" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <SplitHeading
              as="h1"
              delay={0.1}
              text="Une société, une adresse, un bureau. Tout commence aux Berges du Lac."
              className="text-[2.1rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-200 sm:mt-7 sm:text-lg">
              Création d'entreprise, domiciliation commerciale et bureaux privatifs, réunis au même endroit à Tunis.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <Link href="/contact" className="btn btn-red">
                Demander un devis <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/pricing" className="btn btn-outline-light">Voir les tarifs</Link>
            </div>
            <Reveal variant="stagger" delay={0.6}>
              <ul className="mt-9 flex flex-wrap gap-2.5 sm:mt-10 sm:gap-3">
                {BADGES.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-2 text-[13px] text-navy-100 sm:px-4 sm:text-sm">
                    <Icon size={16} className="text-crimson-400" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Plaque />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SplitHeading text="Trois services, une même adresse." className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl" />
          <p className="mt-4 max-w-xl text-slate-600">Choisissez un service pour voir ce qu'il comprend et son tarif.</p>
          <Reveal className="mt-10 sm:mt-12">
            <ServiceShowcase />
          </Reveal>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <SplitHeading text="Pourquoi nous choisir" className="text-3xl font-extrabold tracking-tight sm:text-4xl" />
            <p className="mt-4 max-w-sm text-slate-600">Ce que vous pouvez attendre de 2B Business Bureau, dès le premier échange.</p>
          </div>
          <Reveal variant="stagger" className="grid gap-x-10 sm:grid-cols-2">
            {VALUE_PROPS.map((v) => (
              <div key={v.title} className="border-t-2 border-navy-900 py-6">
                <h3 className="text-lg font-bold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SplitHeading text="Comment ça se passe" className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl" />
          <div className="mt-12 sm:mt-14">
            <Process />
          </div>
        </div>
      </section>

      <StatsTicker />
      <CTASection />
    </>
  );
}
