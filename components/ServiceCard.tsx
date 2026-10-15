import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CATEGORY_LABELS, type Service } from "@/lib/data";
import { ICONS } from "@/lib/icons";
import { fmt } from "@/lib/format";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon];
  return (
    <article className="service-card flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-navy-300 hover:shadow-xl hover:shadow-navy-900/10">
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-900 text-crimson-400">
          <Icon size={22} aria-hidden="true" />
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {CATEGORY_LABELS[service.category]}
        </span>
      </div>
      <h3 className="mt-6 text-xl font-bold tracking-tight">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.summary}</p>
      <ul className="mt-5 space-y-2">
        {service.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm">
            <Check size={16} className="mt-0.5 shrink-0 text-crimson-600" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-end justify-between gap-4 pt-7">
        {service.price !== undefined ? (
          <p>
            <span className="text-2xl font-extrabold">{fmt(service.price)}</span>{" "}
            <span className="text-xs font-semibold text-slate-600">{service.unit}</span>
          </p>
        ) : (
          <p className="text-sm font-semibold text-slate-600">Sur devis</p>
        )}
        <Link
          href={`/contact?service=${service.category}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-crimson-600"
        >
          Demander un devis <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
