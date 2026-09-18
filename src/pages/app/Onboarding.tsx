import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Rocket } from 'lucide-react'
import { Logo } from '../../components/layout/Logo'
import { WizardProgress, WizardStep } from '../../components/onboarding/WizardStep'
import { BusinessProfileForm, type BusinessProfileData } from '../../components/onboarding/BusinessProfileForm'
import { PainPointsSelector } from '../../components/onboarding/PainPointsSelector'
import { AgentSelector } from '../../components/onboarding/AgentSelector'
import { ToneSetup } from '../../components/onboarding/ToneSetup'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { agentTemplate } from '../../constants/agentTemplates'
import type { AgentLanguage, AgentTone, AgentType } from '../../types'

const initialProfile: BusinessProfileData = {
  name: '',
  industry: '',
  location: '',
  website: '',
  logoUrl: '',
  description: '',
  services: '',
}

export default function Onboarding() {
  const { appUser, authUser } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<BusinessProfileData>(initialProfile)
  const [painPoints, setPainPoints] = useState<string[]>([])
  const [agentTypes, setAgentTypes] = useState<AgentType[]>([])
  const [agentName, setAgentName] = useState('')
  const [tone, setTone] = useState<AgentTone>('friendly')
  const [language, setLanguage] = useState<AgentLanguage>('English')
  const [launching, setLaunching] = useState(false)
  const [error, setError] = useState('')

  const canProceed =
    (step === 1 && profile.name && profile.industry && profile.location && profile.description) ||
    (step === 2 && painPoints.length > 0) ||
    (step === 3 && agentTypes.length > 0) ||
    (step === 4 && agentName) ||
    step === 5

  async function handleLaunch() {
    if (!authUser) return
    setLaunching(true)
    setError('')
    try {
      const { data: newBusiness, error: businessError } = await supabase
        .from('businesses')
        .insert({
          owner_id: authUser.id,
          name: profile.name,
          industry: profile.industry,
          location: profile.location,
          website: profile.website,
          logo_url: profile.logoUrl,
          description: profile.description,
          services: profile.services.split(',').map((s) => s.trim()).filter(Boolean),
          faqs: [],
          tone,
          language,
          pain_points: painPoints,
        })
        .select('id')
        .single()
      if (businessError || !newBusiness) throw businessError

      const { error: agentsError } = await supabase.from('agents').insert(
        agentTypes.map((type) => ({
          business_id: newBusiness.id,
          type,
          name: agentName,
          role: agentTemplate(type).description,
          status: 'active',
          config: {},
        }))
      )
      if (agentsError) throw agentsError

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ onboarding_complete: true })
        .eq('id', authUser.id)
      if (profileError) throw profileError

      navigate('/app/dashboard')
    } catch {
      setError('Something went wrong launching your AI employee. Please try again.')
    } finally {
      setLaunching(false)
    }
  }

  return (
    <div className="min-h-screen bg-offwhite py-10">
      <div className="container-page max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <Badge tone="gold">{appUser?.planId ?? 'starter'} plan</Badge>
        </div>

        <div className="card-surface p-8 sm:p-10">
          <WizardProgress step={step} />

          {step === 1 && (
            <WizardStep title="Tell us about your business" subtitle="This helps us train your AI employee.">
              <BusinessProfileForm data={profile} onChange={setProfile} />
            </WizardStep>
          )}

          {step === 2 && (
            <WizardStep title="What's slowing you down?" subtitle="Select everything that applies — this shapes which agents we recommend.">
              <PainPointsSelector selected={painPoints} onChange={setPainPoints} />
            </WizardStep>
          )}

          {step === 3 && (
            <WizardStep title="Choose your AI agents" subtitle="Pick which AI employees to deploy first.">
              <AgentSelector planId={appUser?.planId ?? 'starter'} selected={agentTypes} onChange={setAgentTypes} />
            </WizardStep>
          )}

          {step === 4 && (
            <WizardStep title="Give your AI employee a personality" subtitle="This is how your agent will sound to customers.">
              <ToneSetup
                agentName={agentName}
                tone={tone}
                language={language}
                onChange={(d) => {
                  setAgentName(d.agentName)
                  setTone(d.tone)
                  setLanguage(d.language)
                }}
              />
            </WizardStep>
          )}

          {step === 5 && (
            <WizardStep title="Review & launch" subtitle="Confirm the details below, then deploy your AI employee.">
              <div className="space-y-4">
                <SummaryRow label="Business" value={profile.name} />
                <SummaryRow label="Industry" value={profile.industry} />
                <SummaryRow label="Location" value={profile.location} />
                <SummaryRow label="Agents" value={agentTypes.map((t) => agentTemplate(t).name).join(', ')} />
                <SummaryRow label="Agent name" value={agentName} />
                <SummaryRow label="Tone" value={`${tone} · ${language}`} />
              </div>
              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </WizardStep>
          )}

          <div className="mt-10 flex items-center justify-between">
            <Button variant="ghost" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft size={16} />
              Back
            </Button>
            {step < 5 ? (
              <Button disabled={!canProceed} onClick={() => setStep((s) => s + 1)}>
                Continue
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={handleLaunch} disabled={launching}>
                <Rocket size={16} />
                {launching ? 'Launching…' : 'Deploy My AI Employee'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 pb-3">
      <span className="text-sm text-midgray">{label}</span>
      <span className="font-semibold text-textdark">{value || '—'}</span>
    </div>
  )
}
