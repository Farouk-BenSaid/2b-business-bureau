import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAV, SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="container-x grid gap-12 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo-mark-light.png" alt="" width={652} height={537} className="h-10 w-auto" />
            <span className="text-base font-extrabold leading-none">
              <span className="text-crimson-400">Business</span> <span className="text-white">Bureau</span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Création d'entreprise, domiciliation commerciale et bureaux privatifs aux Berges du Lac, à Tunis.
          </p>
        </div>

        <nav aria-label="Pied de page">
          <p className="text-sm font-semibold text-white">Navigation</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm md:grid-cols-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-2 lg:col-span-1">
          <p className="text-sm font-semibold text-white">Nous trouver</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-crimson-400" aria-hidden="true" />
              <span>
                {SITE.addressLines[0]}
                <br />
                {SITE.addressLines[1]}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="shrink-0 text-crimson-400" aria-hidden="true" />
              <a href={SITE.phoneHref} className="hover:text-white">{SITE.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="shrink-0 text-crimson-400" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-white">{SITE.email}</a>
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t border-white/10">
        <p className="container-x py-6 text-xs text-navy-300">© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
