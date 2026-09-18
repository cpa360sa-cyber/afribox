import { useEffect, useState } from 'react'
import { Plus, Save, Trash2 } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { useBusiness } from '../../hooks/useBusiness'
import { supabase } from '../../lib/supabase'
import { INDUSTRIES, TONES, LANGUAGES } from '../../constants/industries'
import type { AgentLanguage, AgentTone, FAQ } from '../../types'

export default function Settings() {
  const { business } = useBusiness()
  const [name, setName] = useState('')
  const [industry, setIndustry] = useState('')
  const [location, setLocation] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [servicesText, setServicesText] = useState('')
  const [tone, setTone] = useState<AgentTone>('friendly')
  const [language, setLanguage] = useState<AgentLanguage>('English')
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!business) return
    setName(business.name)
    setIndustry(business.industry)
    setLocation(business.location)
    setWebsite(business.website ?? '')
    setDescription(business.description)
    setServicesText(business.services.join(', '))
    setTone(business.tone)
    setLanguage(business.language)
    setFaqs(business.faqs)
  }, [business])

  function updateFaq(index: number, field: keyof FAQ, value: string) {
    setFaqs((prev) => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)))
  }

  function removeFaq(index: number) {
    setFaqs((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSave() {
    if (!business) return
    setSaving(true)
    setSaved(false)
    try {
      await supabase
        .from('businesses')
        .update({
          name,
          industry,
          location,
          website,
          description,
          services: servicesText.split(',').map((s) => s.trim()).filter(Boolean),
          tone,
          language,
          faqs: faqs.filter((f) => f.q.trim() && f.a.trim()),
        })
        .eq('id', business.id)
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  if (!business) {
    return (
      <AppShell title="Settings">
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      </AppShell>
    )
  }

  return (
    <AppShell title="Settings">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
          </CardHeader>
          <div className="space-y-5">
            <Input label="Business name" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Select
                label="Industry"
                options={INDUSTRIES.map((i) => ({ value: i, label: i }))}
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
              <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <Input label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-textdark">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-textdark focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-textdark">Services (comma-separated)</label>
              <textarea
                rows={2}
                value={servicesText}
                onChange={(e) => setServicesText(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-textdark focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"
              />
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agent Tone & Language</CardTitle>
          </CardHeader>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold text-textdark">Tone</p>
              <div className="flex flex-wrap gap-2">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`rounded-full border-2 px-4 py-1.5 text-sm font-medium transition ${
                      tone === t.id ? 'border-emerald bg-emerald text-white' : 'border-black/10 text-textdark'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-textdark">Language</p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`rounded-full border-2 px-4 py-1.5 text-sm font-medium transition ${
                      language === lang ? 'border-emerald bg-emerald text-white' : 'border-black/10 text-textdark'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setFaqs((prev) => [...prev, { q: '', a: '' }])}>
              <Plus size={14} />
              Add FAQ
            </Button>
          </CardHeader>
          <div className="space-y-4">
            {faqs.length === 0 && <p className="text-sm text-midgray">No FAQs yet — add some to train your ChatBot Agent.</p>}
            {faqs.map((faq, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-black/5 p-4">
                <div className="flex-1 space-y-2">
                  <Input placeholder="Question" value={faq.q} onChange={(e) => updateFaq(i, 'q', e.target.value)} />
                  <Input placeholder="Answer" value={faq.a} onChange={(e) => updateFaq(i, 'a', e.target.value)} />
                </div>
                <button onClick={() => removeFaq(i)} aria-label="Remove FAQ" className="mt-2 text-midgray hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={saving}>
            <Save size={16} />
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
          {saved && <span className="text-sm font-medium text-emerald">Saved!</span>}
        </div>
      </div>
    </AppShell>
  )
}
