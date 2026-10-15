"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  /** up: the block rises. stagger: each direct child rises in turn. clip: image-style wipe with a slow zoom. */
  variant?: "up" | "stagger" | "clip";
  className?: string;
  delay?: number;
};

export default function Reveal({ children, variant = "up", className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrollTrigger = { trigger: el, start: "top 86%", once: true };
        if (variant === "up") {
          gsap.from(el, { y: 28, opacity: 0, duration: 0.8, ease: "power3.out", delay, scrollTrigger });
        } else if (variant === "stagger") {
          gsap.from(el.children, { y: 36, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay, scrollTrigger });
        } else {
          gsap.from(el, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "power3.inOut", delay, scrollTrigger });
          if (el.firstElementChild) {
            gsap.from(el.firstElementChild, { scale: 1.15, duration: 1.5, ease: "power3.out", delay, scrollTrigger });
          }
        }
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
