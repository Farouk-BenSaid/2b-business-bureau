"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SITE } from "@/lib/data";
import { quoteSchema, SERVICE_OPTIONS, START_OPTIONS, serviceValues, type QuoteValues } from "@/lib/schema";

const STEPS = ["Services", "Projet", "Coordonnées"] as const;

const STEP_FIELDS: (keyof QuoteValues)[][] = [
  ["services"],
  ["activity", "startWhen", "message"],
  ["fullName", "email", "phone", "consent"],
];

type Props = { initialService?: string };

export default function QuoteForm({ initialService }: Props) {
  const preset = serviceValues.find((v) => v === initialService);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: {
      services: preset ? [preset] : [],
      activity: "",
      startWhen: "asap",
      message: "",
      fullName: "",
      email: "",
      phone: "",
      consent: false,
      hp: "",
    },
  });

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const panel = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  const selected = watch("services");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(panel.current, { x: direction * 32, opacity: 0, duration: 0.45, ease: "power3.out" });
      });
      return () => mm.revert();
    },
    { scope: panel, dependencies: [step, done] }
  );

  // Move focus to the new step's heading, but not on first render.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    heading.current?.focus();
  }, [step, done]);

  const toggleService = (value: (typeof serviceValues)[number]) => {
    const next = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
    setValue("services", next, { shouldValidate: true, shouldDirty: true });
  };

  const goNext = async () => {
    if (await trigger(STEP_FIELDS[step])) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const onSubmit = async (values: QuoteValues) => {
    setServerError(null);
    if (values.hp) {
      setDone(true); // bot: pretend it worked
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request failed");
      setDone(true);
    } catch {
      setServerError(`L'envoi n'a pas abouti. Réessayez, ou appelez-nous au ${SITE.phone}.`);
    }
  };

  const err = (name: keyof QuoteValues) => errors[name]?.message as string | undefined;
  const describedBy = (name: keyof QuoteValues) => (errors[name] ? `${name}-error` : undefined);

  if (done) {
    return (
      <div ref={panel} className="rounded-3xl bg-slate-50 p-8 sm:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-navy-900 text-crimson-400">
          <Check aria-hidden="true" />
        </span>
        <h3 ref={heading} tabIndex={-1} className="mt-6 text-2xl font-bold tracking-tight outline-none">
          Demande envoyée
        </h3>
        <p className="mt-3 max-w-md text-slate-600">
          Merci. Nous étudions votre demande et revenons vers vous par e-mail ou par téléphone. Pour une question
          urgente, appelez le{" "}
          <a href={SITE.phoneHref} className="font-semibold underline">{SITE.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={step < STEPS.length - 1 ? (e) => { e.preventDefault(); void goNext(); } : handleSubmit(onSubmit)}
      className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10"
    >
      <ol className="mb-10 flex items-center gap-3" aria-label="Progression du formulaire">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-3" aria-current={i === step ? "step" : undefined}>
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                i <= step ? "bg-navy-900 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {i < step ? <Check size={14} aria-hidden="true" /> : i + 1}
            </span>
            <span className={`hidden text-sm font-semibold sm:block ${i === step ? "text-navy-900" : "text-slate-500"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <span aria-hidden="true" className={`h-px flex-1 ${i < step ? "bg-crimson-600" : "bg-slate-200"}`} />}
          </li>
        ))}
      </ol>

      <div ref={panel}>
        {step === 0 && (
          <fieldset>
            <legend className="sr-only">Services souhaités</legend>
            <h3 ref={heading} tabIndex={-1} className="text-2xl font-bold tracking-tight outline-none">
              De quoi avez-vous besoin ?
            </h3>
            <p className="mt-2 text-sm text-slate-600">Plusieurs choix possibles.</p>
            <div className="mt-6 space-y-3">
              {SERVICE_OPTIONS.map((o) => {
                const checked = selected.includes(o.value);
                return (
                  <label
                    key={o.value}
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-crimson-500 ${
                      checked ? "border-navy-900 bg-navy-50" : "border-slate-200 hover:border-navy-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleService(o.value)}
                      aria-describedby={describedBy("services")}
                    />
                    <span
                      aria-hidden="true"
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border ${
                        checked ? "border-navy-900 bg-navy-900 text-crimson-400" : "border-slate-300"
                      }`}
                    >
                      {checked && <Check size={14} />}
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold">{o.label}</span>
                      <span className="text-sm text-slate-600">{o.hint}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            {err("services") && (
              <p id="services-error" role="alert" className="mt-3 text-sm font-medium text-red-700">{err("services")}</p>
            )}
          </fieldset>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h3 ref={heading} tabIndex={-1} className="text-2xl font-bold tracking-tight outline-none">
              Parlez-nous de votre projet
            </h3>
            <div>
              <label htmlFor="activity" className="mb-2 block text-sm font-semibold">Votre activité</label>
              <input
                id="activity"
                className="field"
                placeholder="Ex. : conseil en informatique, commerce en ligne…"
                aria-invalid={!!errors.activity}
                aria-describedby={describedBy("activity")}
                {...register("activity")}
              />
              {err("activity") && <p id="activity-error" role="alert" className="mt-2 text-sm font-medium text-red-700">{err("activity")}</p>}
            </div>
            <div>
              <label htmlFor="startWhen" className="mb-2 block text-sm font-semibold">Quand souhaitez-vous démarrer ?</label>
              <select id="startWhen" className="field" {...register("startWhen")}>
                {START_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                Précisions <span className="font-normal text-slate-500">(facultatif)</span>
              </label>
              <textarea
                id="message"
                rows={4}
                className="field"
                aria-invalid={!!errors.message}
                aria-describedby={describedBy("message")}
                {...register("message")}
              />
              {err("message") && <p id="message-error" role="alert" className="mt-2 text-sm font-medium text-red-700">{err("message")}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 ref={heading} tabIndex={-1} className="text-2xl font-bold tracking-tight outline-none">
              Comment vous joindre ?
            </h3>
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-semibold">Nom complet</label>
              <input id="fullName" autoComplete="name" className="field" aria-invalid={!!errors.fullName} aria-describedby={describedBy("fullName")} {...register("fullName")} />
              {err("fullName") && <p id="fullName-error" role="alert" className="mt-2 text-sm font-medium text-red-700">{err("fullName")}</p>}
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">E-mail</label>
                <input id="email" type="email" autoComplete="email" className="field" aria-invalid={!!errors.email} aria-describedby={describedBy("email")} {...register("email")} />
                {err("email") && <p id="email-error" role="alert" className="mt-2 text-sm font-medium text-red-700">{err("email")}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold">Téléphone</label>
                <input id="phone" type="tel" autoComplete="tel" placeholder="+216 …" className="field" aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} {...register("phone")} />
                {err("phone") && <p id="phone-error" role="alert" className="mt-2 text-sm font-medium text-red-700">{err("phone")}</p>}
              </div>
            </div>
            <div>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-navy-900" aria-describedby={describedBy("consent")} {...register("consent")} />
                <span>J'accepte d'être recontacté au sujet de ma demande de devis.</span>
              </label>
              {err("consent") && <p id="consent-error" role="alert" className="mt-2 text-sm font-medium text-red-700">{err("consent")}</p>}
            </div>
            {/* Honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label>Ne pas remplir<input tabIndex={-1} autoComplete="off" {...register("hp")} /></label>
            </div>
            {serverError && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800">{serverError}</p>}
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        {step > 0 ? (
          <button type="button" onClick={goBack} className="btn btn-outline-dark">
            <ArrowLeft size={16} aria-hidden="true" /> Retour
          </button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <button type="submit" className="btn btn-navy">
            Continuer <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : (
          <button type="submit" disabled={isSubmitting} className="btn btn-red disabled:opacity-60">
            {isSubmitting ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : null}
            Envoyer ma demande
          </button>
        )}
      </div>
    </form>
  );
}
