import { PageWrapper } from '../../components/layout/PageWrapper'
import { Hero } from '../../components/landing/Hero'
import { ProblemBar } from '../../components/landing/ProblemBar'
import { SolutionOverview } from '../../components/landing/SolutionOverview'
import { Features } from '../../components/landing/Features'
import { Stats } from '../../components/landing/Stats'
import { PricingSection } from '../../components/landing/PricingSection'
import { HowItWorks } from '../../components/landing/HowItWorks'
import { CommunityGiveback } from '../../components/landing/CommunityGiveback'
import { CtaBanner } from '../../components/landing/CtaBanner'

export default function Landing() {
  return (
    <PageWrapper>
      <Hero />
      <ProblemBar />
      <SolutionOverview />
      <Features />
      <Stats />
      <PricingSection />
      <HowItWorks />
      <CommunityGiveback />
      <CtaBanner />
    </PageWrapper>
  )
}
