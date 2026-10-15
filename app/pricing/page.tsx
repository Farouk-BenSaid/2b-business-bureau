import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PricingCards from "@/components/PricingCards";
import OfficeEstimator from "@/components/OfficeEstimator";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Création d'entreprise 699 DT TTC, domiciliation 428 DT TTC, bureaux privatifs 700 DT HT par mois.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="Des tarifs clairs, annoncés d'avance."
        description="Les prix sont en dinars tunisiens. Le devis confirme le montant pour votre situation."
      />
      <section className="section">
        <div className="container-x space-y-16">
          <PricingCards />
          <Reveal>
            <OfficeEstimator />
          </Reveal>
        </div>
      </section>
      <CTASection />
    </>
  );
}
