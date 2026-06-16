import { PuckRenderer } from '@/components/puck/PuckRenderer'
import HeroSliderServer from '@/components/home/HeroSliderServer'
import StatsSection from '@/components/home/StatsSection'
import AboutSection from '@/components/home/AboutSection'
import ProblemSection from '@/components/home/ProblemSection'
import HowItWorks from '@/components/home/HowItWorks'
import ProductsPreview from '@/components/home/ProductsPreview'
import CTASection from '@/components/home/CTASection'
import { getPageLayout } from '@/lib/getPageLayout'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const layout = await getPageLayout('home')

  // if a Puck layout has been published → show it
  if (layout) return <PuckRenderer data={layout} />

  // otherwise show the original hardcoded design
  return (
    <>
      <HeroSliderServer />
      <StatsSection />
      <AboutSection />
      <ProblemSection />
      <HowItWorks />
      <ProductsPreview />
      <CTASection />
    </>
  )
}
