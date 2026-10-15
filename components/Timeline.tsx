"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { TIMELINE } from "@/lib/data";

/** The vertical line draws itself as you scroll; each step lands when the line reaches it. */
export default function Timeline() {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".tl-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 70%", scrub: true },
          }
        );
        gsap.utils.toArray<HTMLElement>(".tl-step").forEach((step) => {
          gsap.from(step, {
            opacity: 0,
            x: -28,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 80%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <ol ref={root} className="relative space-y-12 pl-10 sm:pl-14">
      <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-slate-200 sm:left-[15px]" />
      <span aria-hidden="true" className="tl-line absolute bottom-2 left-[11px] top-2 w-px origin-top bg-crimson-600 sm:left-[15px]" />
      {TIMELINE.map((t, i) => (
        <li key={t.title} className="tl-step relative">
          <span className="absolute -left-10 top-0.5 grid h-6 w-6 place-items-center rounded-full bg-navy-900 text-[11px] font-bold text-crimson-400 sm:-left-14 sm:h-8 sm:w-8 sm:text-xs">
            {i + 1}
          </span>
          <h3 className="text-xl font-bold tracking-tight">{t.title}</h3>
          <p className="mt-2 max-w-xl text-slate-600">{t.text}</p>
        </li>
      ))}
    </ol>
  );
}
