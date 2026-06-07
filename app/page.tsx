import { DeferredHomeSections } from "@/components/deferred-home-sections";
import { PremiumHero } from "@/components/premium-hero";

export default function Home() {
  return (
    <main>
      <PremiumHero />
      <DeferredHomeSections />
    </main>
  );
}
