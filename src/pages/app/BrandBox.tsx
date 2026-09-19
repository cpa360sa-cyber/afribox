import { useState } from 'react'
import { Palette, Sparkles, Trash2, Copy, Check } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useBusiness } from '../../hooks/useBusiness'
import { useBrandAssets } from '../../hooks/useBrandAssets'
import { generateBio, generateLogoConcept, generateSlogan } from '../../lib/anthropic'
import { formatRelativeTime } from '../../lib/utils'
import type { BrandAssetType } from '../../types'

const ASSET_LABELS: Record<BrandAssetType, string> = { logo: 'Logo Concept', bio: 'Business Bio', slogan: 'Slogan' }

export default function BrandBox() {
  const { business } = useBusiness()
  const { assets, loading, saveAsset, deleteAsset } = useBrandAssets(business?.id)
  const [generating, setGenerating] = useState<BrandAssetType | null>(null)
  const [error, setError] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function handleGenerate(assetType: BrandAssetType) {
    if (!business) return
    setError('')
    setGenerating(assetType)
    try {
      if (assetType === 'bio') {
        const bio = await generateBio(business)
        await saveAsset(business.id, 'bio', bio)
      } else if (assetType === 'slogan') {
        const slogan = await generateSlogan(business)
        await saveAsset(business.id, 'slogan', slogan)
      } else {
        const { initials, colors } = await generateLogoConcept(business)
        await saveAsset(business.id, 'logo', initials, { colors })
      }
    } catch {
      setError(
        import.meta.env.VITE_ANTHROPIC_API_KEY
          ? 'Could not generate that right now. Please try again.'
          : 'Add VITE_ANTHROPIC_API_KEY to your .env to generate real brand assets.'
      )
    } finally {
      setGenerating(null)
    }
  }

  function handleCopy(id: string, content: string) {
    navigator.clipboard.writeText(content).catch(() => {})
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  if (!business) {
    return (
      <AppShell title="BrandBox">
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      </AppShell>
    )
  }

  return (
    <AppShell title="BrandBox">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-textdark">Create your brand assets</h2>
        <p className="text-sm text-midgray">Generate a logo concept, bio, and slogan for {business.name} in seconds.</p>
      </div>

      {error && <p className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>}

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {(['logo', 'bio', 'slogan'] as BrandAssetType[]).map((type) => (
          <Card key={type} className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
              {type === 'logo' ? <Palette size={20} /> : <Sparkles size={20} />}
            </div>
            <p className="font-semibold text-textdark">{ASSET_LABELS[type]}</p>
            <Button size="sm" onClick={() => handleGenerate(type)} disabled={generating !== null}>
              {generating === type ? 'Generating…' : `Generate ${ASSET_LABELS[type]}`}
            </Button>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Brand Assets</CardTitle>
        </CardHeader>
        {loading ? (
          <div className="h-32 animate-pulse rounded-xl bg-black/5" />
        ) : assets.length === 0 ? (
          <p className="py-8 text-center text-sm text-midgray">
            Nothing generated yet — click a button above to create your first brand asset.
          </p>
        ) : (
          <ul className="space-y-3">
            {assets.map((asset) => (
              <li key={asset.id} className="flex items-center gap-4 rounded-xl border border-black/5 p-4">
                {asset.assetType === 'logo' ? (
                  <LogoPreview initials={asset.content} colors={(asset.meta.colors as [string, string]) ?? ['#1A936F', '#C9A84C']} />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                    <Sparkles size={20} />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald">{ASSET_LABELS[asset.assetType]}</p>
                  <p className="truncate text-sm text-textdark">
                    {asset.assetType === 'logo' ? `Monogram "${asset.content}"` : asset.content}
                  </p>
                  <p className="text-xs text-midgray">{formatRelativeTime(asset.createdAt)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => handleCopy(asset.id, asset.content)}
                    aria-label="Copy"
                    className="rounded-lg p-2 text-midgray hover:bg-black/5 hover:text-textdark"
                  >
                    {copiedId === asset.id ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                  </button>
                  <button
                    onClick={() => deleteAsset(asset.id)}
                    aria-label="Delete"
                    className="rounded-lg p-2 text-midgray hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </AppShell>
  )
}

function LogoPreview({ initials, colors }: { initials: string; colors: [string, string] }) {
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white"
      style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
    >
      {initials}
    </div>
  )
}
