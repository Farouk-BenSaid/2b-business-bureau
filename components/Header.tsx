"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { NAV } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  // Shrink on scroll + reading-progress bar (updated without re-rendering).
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from("#mobile-nav li", { y: 14, opacity: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" });
    });
    return () => {
      window.removeEventListener("keydown", onKey);
      mm.revert();
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-navy-900/10 bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_6px_24px_-12px_rgba(27,42,83,0.35)]" : ""
      }`}
    >
      <div className={`container-x flex items-center justify-between transition-[height] duration-300 ${scrolled ? "h-14 sm:h-16" : "h-16 sm:h-[72px]"}`}>
        <Link href="/" className="flex items-center gap-2.5" aria-label="2B Business Bureau, accueil">
          <Image src="/logo-mark.png" alt="" width={652} height={537} priority className="h-8 w-auto sm:h-9" />
          <span className="text-[0.95rem] font-extrabold leading-none tracking-tight">
            <span className="text-crimson-600">Business</span> <span className="text-navy-900">Bureau</span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {NAV.filter((n) => n.href !== "/contact").map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className="relative px-4 py-2 text-sm font-semibold text-navy-900/75 transition-colors hover:text-navy-900 aria-[current=page]:text-navy-900 after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded after:bg-crimson-600 after:transition-transform hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-red ml-4 !py-2.5">
            Demander un devis
          </Link>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-navy-900 hover:bg-navy-900/5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav id="mobile-nav" aria-label="Navigation mobile" hidden={!open} className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-navy-900/10 bg-white lg:hidden">
        <ul className="container-x py-3">
          {NAV.filter((n) => n.href !== "/contact").map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className="flex items-center justify-between border-b border-navy-900/10 py-4 text-lg font-semibold text-navy-900 aria-[current=page]:text-crimson-600"
              >
                {n.label}
              </Link>
            </li>
          ))}
          <li className="py-5">
            <Link href="/contact" className="btn btn-red w-full">Demander un devis</Link>
          </li>
        </ul>
      </nav>

      <div ref={bar} aria-hidden="true" className="absolute bottom-[-1px] left-0 h-0.5 w-full origin-left scale-x-0 bg-crimson-600" />
    </header>
  );
}
