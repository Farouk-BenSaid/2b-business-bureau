import Image from "next/image";
import type { ReactNode } from "react";
import SplitHeading from "./SplitHeading";

type Props = { title: string; description: string; children?: ReactNode };

export default function PageHero({ title, description, children }: Props) {
  return (
    <section className="slant-b relative overflow-hidden bg-gradient-to-br from-navy-900 to-navy-950 pb-24 pt-32 text-white sm:pb-28 sm:pt-40">
      <Image
        src="/logo-mark-light.png"
        alt=""
        aria-hidden="true"
        width={652}
        height={537}
        className="pointer-events-none absolute -bottom-10 -right-10 hidden w-[26rem] opacity-[0.07] md:block lg:w-[32rem]"
      />
      <div className="container-x relative">
        <SplitHeading as="h1" text={title} delay={0.1} className="max-w-3xl text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl" />
        <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-200 sm:mt-6 sm:text-lg">{description}</p>
        {children}
      </div>
    </section>
  );
}
