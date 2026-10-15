import Reveal from "./Reveal";

// À VALIDER : étapes génériques, à ajuster selon le déroulé réel.
const STEPS = [
  { title: "Vous décrivez votre projet", text: "Trois étapes en ligne, ou un appel : services, activité, coordonnées." },
  { title: "Nous vous envoyons un devis", text: "Un montant clair, adapté à votre situation, avant tout engagement." },
  { title: "Nous lançons les démarches", text: "Création, domiciliation ou installation dans vos bureaux : vous démarrez." },
];

export default function Process() {
  return (
    <Reveal variant="stagger" className="relative grid gap-10 md:grid-cols-3 md:gap-8">
      <span aria-hidden="true" className="absolute left-[19px] top-5 hidden h-px w-[calc(100%-2rem)] bg-navy-900/15 md:block md:left-5" />
      {STEPS.map((s, i) => (
        <div key={s.title} className="relative flex gap-5 md:block">
          <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-900 text-sm font-bold text-white ring-8 ring-white">
            {i + 1}
          </span>
          <div className="md:mt-6">
            <h3 className="text-lg font-bold tracking-tight">{s.title}</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{s.text}</p>
          </div>
        </div>
      ))}
    </Reveal>
  );
}
