import { Globe, ExternalLink, Sparkles } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { useBusiness } from '../../hooks/useBusiness'

export default function Website() {
  const { business } = useBusiness()

  if (!business) {
    return (
      <AppShell title="Website">
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      </AppShell>
    )
  }

  return (
    <AppShell title="Website" subtitle="Your business profile, ready to share as a simple online presence.">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <Badge tone="gold">Coming Soon — Full Builder</Badge>
          </CardHeader>
          <div className="overflow-hidden rounded-2xl border border-black/5">
            <div className="bg-navy p-6 text-white">
              <p className="font-display text-xl font-bold">{business.name}</p>
              <p className="mt-1 text-sm text-white/70">{business.description}</p>
            </div>
            <div className="p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-midgray">Services</p>
              <div className="flex flex-wrap gap-2">
                {business.services.map((s) => (
                  <Badge key={s} tone="emerald">
                    {s}
                  </Badge>
                ))}
              </div>
              <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-midgray">Location</p>
              <p className="text-sm text-textdark">{business.location}</p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What's here today</CardTitle>
          </CardHeader>
          <p className="text-sm text-midgray">
            AfriBox builds a simple preview of your business from the profile you filled in during onboarding —
            name, description, services and location. Update those in Settings and this preview updates
            automatically.
          </p>
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-gold/10 p-4">
            <Sparkles className="mt-0.5 shrink-0 text-[#8a6f1f]" size={18} />
            <p className="text-sm text-[#8a6f1f]">
              A full drag-and-drop website builder with pages, blocks, and publishing is on the roadmap — this
              preview is the foundation it'll build on.
            </p>
          </div>
          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald hover:text-emerald-dark"
            >
              <Globe size={16} />
              Visit your website
              <ExternalLink size={14} />
            </a>
          )}
        </Card>
      </div>
    </AppShell>
  )
}
