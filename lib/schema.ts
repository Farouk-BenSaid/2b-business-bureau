import { z } from "zod";

export const serviceValues = ["creation", "domiciliation", "bureaux"] as const;
export const startValues = ["asap", "one-to-three-months", "later"] as const;

export const SERVICE_OPTIONS: { value: (typeof serviceValues)[number]; label: string; hint: string }[] = [
  { value: "creation", label: "Création d'entreprise", hint: "À partir de 699 DT TTC" },
  { value: "domiciliation", label: "Domiciliation commerciale", hint: "À partir de 428 DT TTC" },
  { value: "bureaux", label: "Bureaux privatifs", hint: "À partir de 700 DT HT par mois" },
];

export const START_OPTIONS: { value: (typeof startValues)[number]; label: string }[] = [
  { value: "asap", label: "Dès que possible" },
  { value: "one-to-three-months", label: "Dans 1 à 3 mois" },
  { value: "later", label: "Plus tard, je me renseigne" },
];

export const quoteSchema = z.object({
  services: z.array(z.enum(serviceValues)).min(1, "Choisissez au moins un service."),
  activity: z.string().trim().min(3, "Décrivez brièvement votre activité.").max(200, "200 caractères maximum."),
  startWhen: z.enum(startValues),
  message: z.string().trim().max(1000, "1 000 caractères maximum.").optional(),
  fullName: z.string().trim().min(2, "Indiquez votre nom."),
  email: z.string().trim().email("Cette adresse e-mail n'est pas valide."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s().-]{8,18}$/, "Ce numéro de téléphone n'est pas valide."),
  consent: z.boolean().refine((v) => v === true, "Votre accord est nécessaire pour être recontacté."),
  // Honeypot: real visitors never fill it in.
  hp: z.string().max(0).optional(),
});

export type QuoteValues = z.infer<typeof quoteSchema>;
