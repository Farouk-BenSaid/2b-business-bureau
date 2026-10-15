import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { SITE } from "@/lib/data";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import Waves from "./Waves";

export default function CTASection() {
  return (
    <section className="section relative overflow-hidden bg-navy-900 text-white">
      <Waves className="pointer-events-none absolute inset-0 h-full w-full text-white/10" />
      <div className="container-x relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <SplitHeading text="Parlons de votre projet." className="text-3xl font-extrabold tracking-tight sm:text-5xl" />
          <p className="mt-5 max-w-lg text-lg text-navy-200">
            Dites-nous ce dont vous avez besoin. Nous revenons vers vous avec un devis clair.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-red">Demander un devis</Link>
            <Link href="/pricing" className="btn btn-outline-light">Voir les tarifs</Link>
          </div>
        </div>
        <Reveal variant="stagger" className="space-y-4">
          <a href={SITE.phoneHref} className="flex items-center gap-4 rounded-2xl border border-white/15 p-5 transition-colors hover:bg-white/5">
            <Phone className="text-crimson-400" aria-hidden="true" />
            <span>
              <span className="block text-sm text-navy-200">Appelez-nous</span>
              <span className="font-semibold">{SITE.phone}</span>
            </span>
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 rounded-2xl border border-white/15 p-5 transition-colors hover:bg-white/5">
            <Mail className="text-crimson-400" aria-hidden="true" />
            <span>
              <span className="block text-sm text-navy-200">Écrivez-nous</span>
              <span className="font-semibold">{SITE.email}</span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
