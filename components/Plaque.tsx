"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { CORE_SERVICES, SITE } from "@/lib/data";
import { fmt } from "@/lib/format";

/**
 * Hero object: a directory board, like the one at the entrance of a business address.
 * Intro: the board lands, the logo wipes in, the price lines follow. Then a slow parallax on scroll.
 */
export default function Plaque() {
  const outer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ delay: 0.4, defaults: { ease: "power3.out" } })
          .fromTo(".sign", { y: 80, rotate: -6, opacity: 0 }, { y: 0, rotate: -1.5, opacity: 1, duration: 1.1 })
          .from(".sign-logo", { clipPath: "inset(0 100% 0 0)", duration: 0.9, ease: "power3.inOut" }, "-=0.6")
          .from(".sign-rule", { scaleX: 0, transformOrigin: "left", duration: 0.5 }, "-=0.3")
          .from(".sign-line", { opacity: 0, x: -14, stagger: 0.1, duration: 0.5 }, "-=0.2");

        gsap.to(outer.current, {
          y: -36,
          ease: "none",
          scrollTrigger: { trigger: outer.current, start: "top 30%", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: outer }
  );

  return (
    <div ref={outer} className="mx-auto w-full max-w-md">
      <div className="sign rounded-2xl bg-white p-6 shadow-2xl shadow-black/40 sm:p-9">
        <Image
          src="/logo-full.png"
          alt="2B Business Bureau"
          width={652}
          height={617}
          priority
          className="sign-logo mx-auto h-36 w-auto sm:h-44"
        />
        <div className="sign-rule mt-6 h-1 w-14 rounded bg-crimson-600" />
        <p className="sign-line mt-4 text-[13px] font-medium leading-snug text-slate-600 sm:text-sm">
          {SITE.addressLines[0]}, {SITE.addressLines[1]}
        </p>
        <ul className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-[13px] sm:text-sm">
          {CORE_SERVICES.map((s) => (
            <li key={s.id} className="sign-line flex items-baseline gap-2">
              <span className="min-w-0 font-semibold">{s.title}</span>
              <span aria-hidden="true" className="min-w-3 flex-1 border-b border-dotted border-slate-300" />
              <span className="shrink-0 whitespace-nowrap font-bold text-navy-900">
                {fmt(s.price!)} <span className="text-xs font-semibold text-slate-500">{s.unit}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
