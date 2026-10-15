import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServicesExplorer from "@/components/ServicesExplorer";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Création d'entreprise dès 699 DT TTC, domiciliation dès 428 DT TTC, bureaux privatifs dès 700 DT HT par mois, aux Berges du Lac.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Tout ce qu'il faut pour installer votre société."
        description="Création, domiciliation, bureaux : filtrez par besoin pour trouver le service qui vous convient."
      />
      <section className="section">
        <div className="container-x">
          <ServicesExplorer />
        </div>
      </section>
      <CTASection />
    </>
  );
}
