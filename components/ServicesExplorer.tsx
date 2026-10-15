"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { CATEGORY_LABELS, SERVICES, type ServiceCategory } from "@/lib/data";
import ServiceCard from "./ServiceCard";

type Filter = "all" | ServiceCategory;
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Tous les services" },
  ...(Object.keys(CATEGORY_LABELS) as ServiceCategory[]).map((id) => ({ id, label: CATEGORY_LABELS[id] })),
];

export default function ServicesExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const grid = useRef<HTMLDivElement>(null);
  const items = filter === "all" ? SERVICES : SERVICES.filter((s) => s.category === filter);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".service-item", { y: 28, opacity: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" });
      });
      return () => mm.revert();
    },
    { scope: grid, dependencies: [filter] }
  );

  return (
    <div>
      <div role="group" aria-label="Filtrer les services" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
              filter === f.id
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-slate-300 text-navy-900 hover:border-navy-900"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">{items.length} services affichés</p>

      <div ref={grid} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <div key={s.id} className="service-item">
            <ServiceCard service={s} />
          </div>
        ))}
      </div>
    </div>
  );
}
