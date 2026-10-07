import { Articles } from "@/app/_components/home/articles";
import { Faq } from "@/app/_components/home/faq";
import { FinalCta } from "@/app/_components/home/final-cta";
import { Hero } from "@/app/_components/home/hero";
import { HowItWorks } from "@/app/_components/home/how-it-works";
import { Problem } from "@/app/_components/home/problem";
import { Risks } from "@/app/_components/home/risks";
import { ToolsPreview } from "@/app/_components/home/tools-preview";
import { getPostIndex } from "@/lib/api";

// Home (decisão 12): PROBLEMA → ENTENDER → EXPLORAR → APRENDER → APLICAR.
// D-24: o bloco 03 (Mapa) está no Hero, como na composição do Brain Home v1.
// Sem logos, depoimentos, pricing ou números de marketing (D-07…D-10).
export default function Index() {
  const posts = getPostIndex();

  return (
    <main>
      <Hero />
      <Problem />
      <Risks />
      <HowItWorks />
      <Articles posts={posts} />
      <ToolsPreview />
      <Faq />
      <FinalCta />
    </main>
  );
}
