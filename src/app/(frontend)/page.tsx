import { PuckRenderer } from '@/components/puck/PuckRenderer'
import HeroSliderServer from '@/components/home/HeroSliderServer'
import StatsSection from '@/components/home/StatsSection'
import AboutSection from '@/components/home/AboutSection'
import ProblemSection from '@/components/home/ProblemSection'
import HowItWorks from '@/components/home/HowItWorks'
import ProductsPreview from '@/components/home/ProductsPreview'
import CTASection from '@/components/home/CTASection'

export const dynamic = 'force-dynamic'

async function getHomeLayout() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/pages/home`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.layout ?? null
  } catch {
    return null
  }
}

export default async function HomePage() {
  const layout = await getHomeLayout()

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
