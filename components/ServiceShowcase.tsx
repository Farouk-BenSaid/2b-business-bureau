"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { CORE_SERVICES } from "@/lib/data";
import { ICONS } from "@/lib/icons";
import { fmt } from "@/lib/format";

/** Home page: pick a service on the left, read its detail on the right. */
export default function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = CORE_SERVICES[active];
  const Icon = ICONS[current.icon];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-anim]", { y: 18, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" });
      });
      return () => mm.revert();
    },
    { scope: panel, dependencies: [active] }
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = CORE_SERVICES.length - 1;
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.3fr]">
      <div role="tablist" aria-label="Nos services" aria-orientation="vertical" onKeyDown={onKeyDown} className="flex flex-col gap-2">
        {CORE_SERVICES.map((s, i) => {
          const TabIcon = ICONS[s.icon];
          const selected = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`svc-tab-${s.id}`}
              aria-selected={selected}
              aria-controls="svc-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition-colors ${
                selected ? "border-navy-900 bg-navy-900 text-white" : "border-slate-200 hover:border-navy-300 hover:bg-slate-50"
              }`}
            >
              <TabIcon size={24} className={selected ? "text-crimson-400" : "text-navy-600"} aria-hidden="true" />
              <span className="min-w-0 flex-1 font-semibold">{s.title}</span>
              <span className={`shrink-0 text-xs sm:text-sm ${selected ? "text-navy-200" : "text-slate-500"}`}>dès {fmt(s.price!)} DT</span>
            </button>
          );
        })}
      </div>

      <div
        ref={panel}
        role="tabpanel"
        id="svc-panel"
        aria-labelledby={`svc-tab-${current.id}`}
        className="rounded-3xl bg-slate-50 p-6 sm:p-10"
      >
        <div data-anim className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-crimson-400">
          <Icon size={24} aria-hidden="true" />
        </div>
        <h3 data-anim className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">{current.title}</h3>
        <p data-anim className="mt-3 max-w-md text-slate-600">{current.summary}</p>
        <ul className="mt-6 space-y-3">
          {current.features.map((f) => (
            <li key={f} data-anim className="flex gap-3 text-sm">
              <Check size={18} className="mt-0.5 shrink-0 text-crimson-600" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
        <div data-anim className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <p>
            <span className="text-3xl font-extrabold">{fmt(current.price!)}</span>{" "}
            <span className="text-sm font-semibold text-slate-600">{current.unit}</span>
          </p>
          <Link href={`/contact?service=${current.category}`} className="btn btn-navy">
            Demander un devis <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
