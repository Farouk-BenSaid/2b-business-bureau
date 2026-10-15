import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FaqList from "@/components/FaqList";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Réponses aux questions fréquentes sur la création d'entreprise, la domiciliation et les bureaux privatifs.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Vos questions, nos réponses."
        description="Choisissez un thème. Si vous ne trouvez pas votre réponse, écrivez-nous."
      />
      <section className="section">
        <div className="container-x">
          <FaqList />
        </div>
      </section>
      <CTASection />
    </>
  );
}
