import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/schema";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  if (parsed.data.hp) return NextResponse.json({ ok: true }); // honeypot

  // TODO: send parsed.data to contact@2bbusiness.com (Resend, Nodemailer, or a CRM webhook).
  // Keep the request server-side so credentials never reach the browser.
  console.info("[quote request]", { services: parsed.data.services, startWhen: parsed.data.startWhen });

  return NextResponse.json({ ok: true });
}
