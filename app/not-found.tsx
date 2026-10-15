import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-navy-950 pb-24 pt-40 text-white">
      <div className="container-x">
        <h1 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">Cette page n'existe pas.</h1>
        <p className="mt-5 max-w-md text-navy-200">Le lien est peut-être ancien. Retournez à l'accueil ou contactez-nous.</p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="btn btn-red">Retour à l'accueil</Link>
          <Link href="/contact" className="btn btn-outline-light">Nous contacter</Link>
        </div>
      </div>
    </section>
  );
}
