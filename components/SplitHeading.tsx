"use client";

import { Fragment, useRef, type ElementType } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
};

/** Heading whose words rise out of a mask. Screen readers get the full text via aria-label. */
export default function SplitHeading({ text, as = "h2", className, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".split-word", {
          yPercent: 115,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.05,
          delay,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const words = text.split(" ");
  return (
    <Tag ref={ref} aria-label={text} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span aria-hidden="true" className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <span className="split-word inline-block">{w}</span>
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}
