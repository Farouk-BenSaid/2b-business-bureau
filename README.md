# 2B Business Bureau

Site vitrine Next.js (App Router, TypeScript) : Tailwind CSS, GSAP + ScrollTrigger, Lenis, Lucide, React Hook Form + Zod.

Palette tirée du logo : bleu marine `#1B2A53` (`navy-900`) et rouge `#A80019` (`crimson-600`). Les variantes du logo sont dans `public/` : `logo-full.png`, `logo-mark.png` (fond clair) et `logo-mark-light.png` (fond sombre). Favicon, icône Apple et image de partage sont générés dans `app/`.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build && npm start
```

Copiez `.env.example` vers `.env.local` et réglez `NEXT_PUBLIC_SITE_URL` (utilisé pour les métadonnées, le sitemap et robots).

## Structure

```
app/                 pages (/, /about, /services, /pricing, /faq, /contact), template.tsx (transition), api/contact
components/          Header (Navbar), Footer, ServiceCard, AccordionItem, QuoteForm, + sections interactives
lib/data.ts          tout le contenu : coordonnées, services, tarifs, FAQ, étapes
lib/schema.ts        schéma Zod partagé par le formulaire et l'API
lib/gsap.ts          enregistrement des plugins GSAP + media query "reduced motion"
```

## À faire avant la mise en ligne

1. **Valider le contenu** repéré par `À VALIDER` dans `lib/data.ts` (listes de prestations, réponses FAQ, étapes du parcours). Les tarifs, l'adresse, le téléphone et l'e-mail viennent du site d'origine.
2. **Brancher l'envoi des devis** dans `app/api/contact/route.ts` (Resend, Nodemailer ou webhook CRM). Pour l'instant la requête est validée puis journalisée.
3. **Remplacer les deux blocs visuels provisoires** : photo des bureaux sur `/about` (animation `Reveal variant="clip"` déjà en place) et carte intégrée sur `/contact`.
4. Remplacer les chiffres de `STATS` par des chiffres d'activité réels si disponibles.

## Animations et accessibilité

Toutes les animations GSAP passent par `gsap.matchMedia()` avec `prefers-reduced-motion` : si le visiteur demande moins de mouvement, rien n'est animé et Lenis est désactivé. Le focus clavier est visible, l'accordéon et les onglets exposent leurs états ARIA, et le formulaire déplace le focus à chaque étape.
