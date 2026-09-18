import { ClipboardList, Sliders, Rocket } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: 'Onboard',
    copy: 'Tell us about your business, your pain points, and the services you offer — takes under 5 minutes.',
  },
  {
    icon: Sliders,
    title: 'Configure',
    copy: 'Choose your agents, set their tone, language, and FAQs so they sound like your business, not a robot.',
  },
  {
    icon: Rocket,
    title: 'Deploy',
    copy: 'Hit launch. Your AI employee goes live on your website, WhatsApp, or phone line instantly.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Get Started In Minutes</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-textdark sm:text-4xl">How it works</h2>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
                <step.icon size={28} />
              </div>
              <span className="absolute left-1/2 top-0 -translate-x-1/2 font-display text-6xl font-extrabold text-black/5">
                {i + 1}
              </span>
              <h3 className="relative font-display text-xl font-bold text-textdark">{step.title}</h3>
              <p className="relative mt-2 text-sm text-midgray">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
