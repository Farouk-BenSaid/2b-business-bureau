import { Building2, Mailbox, Armchair, FileSignature, MapPinned, Users } from "lucide-react";

export const ICONS = {
  building: Building2,
  pin: MapPinned,
  desk: Armchair,
  sign: FileSignature,
  mail: Mailbox,
  meeting: Users,
} as const;

export type IconKey = keyof typeof ICONS;
