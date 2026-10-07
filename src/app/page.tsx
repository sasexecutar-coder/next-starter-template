import { Articles } from "@/app/_components/home/articles";
import { Faq } from "@/app/_components/home/faq";
import { FinalCta } from "@/app/_components/home/final-cta";
import { Hero } from "@/app/_components/home/hero";
import { HowItWorks } from "@/app/_components/home/how-it-works";
import { MapPreview } from "@/app/_components/home/map-preview";
import { Problem } from "@/app/_components/home/problem";
import { Risks } from "@/app/_components/home/risks";
import { ToolsPreview } from "@/app/_components/home/tools-preview";
import { getAllPosts } from "@/lib/api";

// Home (decisão 12): PROBLEMA → ENTENDER → EXPLORAR → APRENDER → APLICAR.
// Sem logos, depoimentos, pricing ou números de marketing (D-07…D-10).
export default function Index() {
  const posts = getAllPosts();

  return (
    <main>
      <Hero />
      <Problem />
      <MapPreview />
      <Risks />
      <HowItWorks />
      <Articles posts={posts} />
      <ToolsPreview />
      <Faq />
      <FinalCta />
    </main>
  );
}
