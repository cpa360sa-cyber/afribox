import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageWrapper } from '../../components/layout/PageWrapper'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' })

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <PageWrapper>
      <section className="bg-navy py-20 text-white">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Let's talk</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Questions about AfriBox, Enterprise plans, or partnerships? Reach out and the Etaerc team will
            respond within one business day.
          </p>
        </div>
      </section>

      <section className="bg-offwhite py-20">
        <div className="container-page grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="font-display text-xl font-bold text-textdark">Contact details</h2>
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 text-emerald" size={20} />
                <p className="text-midgray">Pretoria, Gauteng, South Africa</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 text-emerald" size={20} />
                <p className="text-midgray">hello@afribox.co.za</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 text-emerald" size={20} />
                <p className="text-midgray">+27 12 000 0000</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="card-surface p-8">
              {submitted ? (
                <div className="py-8 text-center">
                  <h3 className="font-display text-xl font-bold text-emerald-dark">Message sent!</h3>
                  <p className="mt-2 text-midgray">Thanks for reaching out — we'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Full name"
                      name="name"
                      required
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                  <Input
                    label="Business name"
                    name="business"
                    value={form.business}
                    onChange={(e) => handleChange('business', e.target.value)}
                  />
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-textdark">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-textdark focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
