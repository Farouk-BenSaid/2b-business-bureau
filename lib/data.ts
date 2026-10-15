import type { IconKey } from "./icons";

/* ------------------------------------------------------------------ *
 * Single source of truth for the site's content.
 * Prices, address, phone and email come from the original site.
 * Anything marked "À VALIDER" is proposed copy: confirm it with the client.
 * ------------------------------------------------------------------ */

const addressQuery = encodeURIComponent("B3 Herthouma, Rue Du Lac Léman, Les Berges du Lac, Tunis 1053");

export const SITE = {
  name: "2B Business Bureau",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://2bbusiness.com",
  addressLines: ["B3 Herthouma, Rue Du Lac Léman", "Les Berges du Lac, Tunis 1053"],
  phone: "+216 29 921 922",
  phoneHref: "tel:+21629921922",
  email: "contact@2bbusiness.com",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${addressQuery}`,
} as const;

export const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export type ServiceCategory = "creation" | "domiciliation" | "bureaux";

export type Service = {
  id: string;
  category: ServiceCategory;
  icon: IconKey;
  title: string;
  summary: string;
  price?: number;
  unit?: string;
  features: string[];
};

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  creation: "Création",
  domiciliation: "Domiciliation",
  bureaux: "Bureaux privatifs",
};

export const SERVICES: Service[] = [
  {
    id: "creation-entreprise",
    category: "creation",
    icon: "building",
    title: "Création d'entreprise",
    summary: "De la forme juridique à l'immatriculation, nous préparons et suivons votre dossier.",
    price: 699,
    unit: "DT TTC",
    // À VALIDER
    features: [
      "Conseil pour choisir la forme juridique",
      "Constitution et dépôt du dossier",
      "Suivi des formalités jusqu'à l'immatriculation",
    ],
  },
  {
    id: "domiciliation-commerciale",
    category: "domiciliation",
    icon: "pin",
    title: "Domiciliation commerciale",
    summary: "Une adresse de siège aux Berges du Lac pour votre société, sans louer de bureau.",
    price: 428,
    unit: "DT TTC",
    // À VALIDER
    features: [
      "Adresse de siège aux Berges du Lac",
      "Contrat de domiciliation pour vos démarches",
      "Un interlocuteur local pour vos questions",
    ],
  },
  {
    id: "bureaux-privatifs",
    category: "bureaux",
    icon: "desk",
    title: "Bureaux privatifs",
    summary: "Des bureaux fermés, prêts à l'emploi, pour travailler et recevoir dans un cadre soigné.",
    price: 700,
    unit: "DT HT / mois",
    // À VALIDER
    features: [
      "Bureau privatif meublé",
      "Adresse professionnelle pour votre activité",
      "Souplesse pour faire évoluer vos besoins",
    ],
  },
  {
    id: "conseil-demarrage",
    category: "creation",
    icon: "sign",
    title: "Conseil de démarrage",
    summary: "Un échange avec notre équipe pour valider la structure adaptée à votre activité.",
    features: ["Analyse de votre projet", "Calendrier des démarches"], // À VALIDER
  },
  {
    id: "courrier",
    category: "domiciliation",
    icon: "mail",
    title: "Réception du courrier",
    summary: "Votre courrier arrive à l'adresse du siège, et nous vous le signalons.",
    features: ["Réception à l'adresse du siège", "Information à l'arrivée du courrier"], // À VALIDER
  },
  {
    id: "salle-reunion",
    category: "bureaux",
    icon: "meeting",
    title: "Salle de réunion",
    summary: "Un espace dédié pour recevoir clients et partenaires, sur réservation.",
    features: ["Réservation à la demande", "Accueil de vos invités"], // À VALIDER
  },
];

export const CORE_SERVICES = SERVICES.filter((s) => s.price !== undefined);

export const PLANS = [
  {
    id: "creation" as const,
    name: "Création d'entreprise",
    price: 699,
    unit: "TTC",
    blurb: "Pour lancer votre société avec un dossier complet et suivi.",
    features: [
      "Conseil sur la forme juridique",
      "Préparation des statuts et du dossier",
      "Dépôt et suivi des formalités",
      "Un interlocuteur dédié",
    ],
  },
  {
    id: "domiciliation" as const,
    name: "Domiciliation commerciale",
    price: 428,
    unit: "TTC",
    blurb: "Pour établir le siège de votre société à une adresse reconnue.",
    features: [
      "Adresse de siège aux Berges du Lac",
      "Contrat de domiciliation",
      "Information à l'arrivée du courrier",
      "Un interlocuteur local",
    ],
  },
  {
    id: "bureaux" as const,
    name: "Bureaux privatifs",
    price: 700,
    unit: "HT / mois",
    blurb: "Pour disposer d'un bureau fermé et d'une adresse, au mois.",
    features: [
      "Bureau privatif meublé",
      "Adresse professionnelle incluse",
      "Salle de réunion sur réservation",
      "Facturation mensuelle",
    ],
  },
]; // Les listes de prestations sont À VALIDER ; les prix sont ceux du site d'origine.

export const VALUE_PROPS = [
  {
    title: "Une adresse qui rassure vos clients",
    text: "Les Berges du Lac, c'est le quartier d'affaires de Tunis. Votre société y a son siège dès le premier jour.",
  },
  {
    title: "Des démarches expliquées, pas subies",
    text: "Chaque étape de la création est présentée avant de commencer, pour que vous sachiez ce qui se passe et quand.",
  },
  {
    title: "Des tarifs annoncés d'avance",
    text: "Création, domiciliation, bureaux : les prix sont publiés sur le site. Le devis confirme votre cas précis.",
  },
  {
    title: "Une équipe locale qui répond",
    text: "Par téléphone, par e-mail ou sur place au B3 Herthouma. Vous parlez à quelqu'un qui connaît votre dossier.",
  },
];

// Chiffres issus du site (services et tarifs). Remplacez par des chiffres d'activité réels si vous en avez.
export const STATS = [
  { value: 3, label: "services pour lancer, héberger et installer votre activité" },
  { value: 428, prefix: "dès ", suffix: " DT", label: "pour domicilier votre société (TTC)" },
  { value: 699, prefix: "dès ", suffix: " DT", label: "pour créer votre entreprise (TTC)" },
  { value: 700, prefix: "dès ", suffix: " DT", label: "par mois pour un bureau privatif (HT)" },
];

export const MARQUEE = [
  "Création d'entreprise",
  "Domiciliation commerciale",
  "Bureaux privatifs",
  "Les Berges du Lac",
  "Tunis",
];

// Étapes sans dates : à remplacer par l'historique réel de l'entreprise.
export const TIMELINE = [
  {
    title: "Le constat de départ",
    text: "Lancer une société en Tunisie demande du temps, des documents et des interlocuteurs multiples. L'idée : tout regrouper au même endroit.",
  },
  {
    title: "Une offre pensée pour les entrepreneurs",
    text: "Création d'entreprise, domiciliation et bureaux privatifs deviennent trois portes d'entrée vers une même adresse.",
  },
  {
    title: "L'installation aux Berges du Lac",
    text: "Le bureau s'installe au B3 Herthouma, rue du Lac Léman, au cœur du quartier d'affaires de Tunis.",
  },
  {
    title: "Aujourd'hui",
    text: "Une équipe qui accompagne les créateurs, les indépendants et les sociétés qui ont besoin d'une adresse ou d'un bureau.",
  },
];

export type FaqCategory = "legal" | "domiciliation" | "workspace";

export const FAQ_CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: "legal", label: "Création et juridique" },
  { id: "domiciliation", label: "Domiciliation" },
  { id: "workspace", label: "Bureaux privatifs" },
];

// Réponses volontairement générales : À VALIDER avant mise en ligne, surtout les points juridiques.
export const FAQ: { id: string; category: FaqCategory; q: string; a: string }[] = [
  {
    id: "l1",
    category: "legal",
    q: "Combien coûte la création d'une entreprise ?",
    a: "Notre offre de création d'entreprise démarre à 699 DT TTC. Le devis confirme le montant selon votre situation et la forme juridique choisie.",
  },
  {
    id: "l2",
    category: "legal",
    q: "Quelle forme juridique choisir ?",
    a: "Cela dépend de votre activité, du nombre d'associés et de vos projets. Nous en discutons avec vous au démarrage, avant de préparer le dossier.",
  },
  {
    id: "l3",
    category: "legal",
    q: "Quels documents dois-je fournir ?",
    a: "La liste varie selon la forme juridique et le profil des associés. Nous vous la communiquons dès la demande de devis, pour que vous prépariez tout en une fois.",
  },
  {
    id: "d1",
    category: "domiciliation",
    q: "Combien coûte la domiciliation ?",
    a: "La domiciliation commerciale démarre à 428 DT TTC. Le devis précise ce qui est inclus pour votre société.",
  },
  {
    id: "d2",
    category: "domiciliation",
    q: "À quoi sert une adresse de domiciliation ?",
    a: "Elle sert d'adresse officielle de siège pour votre société, sans que vous ayez à louer un bureau. Elle figure sur vos documents officiels.",
  },
  {
    id: "d3",
    category: "domiciliation",
    q: "Comment récupérer mon courrier ?",
    a: "Le courrier est reçu à l'adresse du siège. Les modalités de remise sont précisées dans votre contrat de domiciliation.",
  },
  {
    id: "w1",
    category: "workspace",
    q: "Quel est le prix d'un bureau privatif ?",
    a: "Les bureaux privatifs démarrent à 700 DT HT par mois. Vous pouvez estimer votre budget sur la page Tarifs.",
  },
  {
    id: "w2",
    category: "workspace",
    q: "Puis-je visiter les bureaux avant de m'engager ?",
    a: "Oui, contactez-nous pour convenir d'un rendez-vous au B3 Herthouma, rue du Lac Léman, aux Berges du Lac.",
  },
  {
    id: "w3",
    category: "workspace",
    q: "Puis-je recevoir mes clients dans les bureaux ?",
    a: "Oui. Vous avez une adresse professionnelle et vous pouvez réserver une salle de réunion pour vos rendez-vous.",
  },
];
