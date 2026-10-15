"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { MARQUEE, STATS } from "@/lib/data";
import { fmt } from "@/lib/format";

export default function StatsTicker() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        root.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const o = { v: 0 };
          el.textContent = "0";
          gsap.to(o, {
            v: end,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = fmt(Math.round(o.v));
            },
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <div className="bg-navy-950 text-white">
        <div className="container-x grid gap-x-8 gap-y-10 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="border-l-2 border-crimson-500 pl-5">
              <p className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                {"prefix" in s && <span className="text-xl font-semibold text-crimson-400">{s.prefix}</span>}
                <span data-count={s.value}>{fmt(s.value)}</span>
                {"suffix" in s && <span className="text-xl font-semibold text-crimson-400">{s.suffix}</span>}
              </p>
              <p className="mt-3 max-w-[16rem] text-sm text-navy-200">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden bg-crimson-600 py-3.5" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-sm font-semibold text-white hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-12">
              {m}
              <span className="h-1.5 w-1.5 rotate-12 bg-white/70" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
