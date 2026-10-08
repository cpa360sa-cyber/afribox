import { PageWrapper } from '../../components/layout/PageWrapper'
import { Hero } from '../../components/landing/Hero'
import { ProblemBar } from '../../components/landing/ProblemBar'
import { Opportunity } from '../../components/landing/Opportunity'
import { SolutionOverview } from '../../components/landing/SolutionOverview'
import { ProductDemo } from '../../components/landing/ProductDemo'
import { ProductEcosystem } from '../../components/landing/ProductEcosystem'
import { PricingSection } from '../../components/landing/PricingSection'
import { GettingStarted } from '../../components/landing/GettingStarted'
import { CtaBanner } from '../../components/landing/CtaBanner'

export default function Landing() {
  return (
    <PageWrapper>
      <Hero />
      <ProblemBar />
      <Opportunity />
      <SolutionOverview />
      <ProductDemo />
      <ProductEcosystem />
      <PricingSection />
      <GettingStarted />
      <CtaBanner />
    </PageWrapper>
  )
}
