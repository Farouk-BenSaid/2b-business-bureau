"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "@/lib/gsap";

type Props = { id: string; question: string; answer: string; open: boolean; onToggle: () => void };

export default function AccordionItem({ id, question, answer, open, onToggle }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const icon = useRef<SVGSVGElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 0 : 0.4;
    gsap.to(panel.current, {
      height: open ? "auto" : 0,
      autoAlpha: open ? 1 : 0,
      duration,
      ease: "power2.out",
    });
    gsap.to(icon.current, { rotate: open ? 180 : 0, duration, ease: "power2.out" });
  }, [open]);

  return (
    <div className="border-b border-slate-200">
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold tracking-tight hover:text-crimson-600"
        >
          {question}
          <ChevronDown ref={icon} size={22} className="shrink-0" aria-hidden="true" />
        </button>
      </h3>
      <div
        ref={panel}
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className="overflow-hidden"
        style={{ height: 0, visibility: "hidden", opacity: 0 }}
      >
        <p className="max-w-2xl pb-6 leading-relaxed text-slate-600">{answer}</p>
      </div>
    </div>
  );
}
