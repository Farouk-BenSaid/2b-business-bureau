"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Remounts on every navigation (unlike layout.tsx), which makes it the right
 * place for an enter transition in the App Router.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(ref.current, { opacity: 0, duration: 0.5, ease: "power2.out", clearProps: "opacity" });
      });
      window.scrollTo(0, 0);
      return () => mm.revert();
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}
