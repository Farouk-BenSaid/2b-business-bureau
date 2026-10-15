import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PLANS } from "@/lib/data";
import { fmt } from "@/lib/format";
import Reveal from "./Reveal";

export default function PricingCards() {
  return (
    <Reveal variant="stagger" className="grid gap-6 lg:grid-cols-3">
      {PLANS.map((p) => (
        <article key={p.id} className="flex flex-col rounded-3xl border border-slate-200 border-t-4 border-t-crimson-600 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10 sm:p-8">
          <h3 className="text-lg font-bold tracking-tight">{p.name}</h3>
          <p className="mt-2 min-h-[3rem] text-sm text-slate-600">{p.blurb}</p>
          <p className="mt-6">
            <span className="text-4xl font-extrabold sm:text-5xl tracking-tight">{fmt(p.price)}</span>{" "}
            <span className="text-sm font-semibold text-slate-600">DT {p.unit}</span>
          </p>
          <ul className="mt-7 space-y-3 border-t border-slate-200 pt-7">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm">
                <Check size={18} className="mt-0.5 shrink-0 text-crimson-600" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <Link href={`/contact?service=${p.id}`} aria-label={`Obtenir un devis pour ${p.name}`} className="btn btn-navy mt-10">
            Obtenir un devis
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </article>
      ))}
    </Reveal>
  );
}
