import { useState } from 'react'
import { ScanSearch, AlertCircle } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { useBusiness } from '../../hooks/useBusiness'
import { useScanReports } from '../../hooks/useScanReports'
import { generateScan } from '../../lib/anthropic'
import { formatRelativeTime } from '../../lib/utils'
import type { ScanReport } from '../../types'

export default function AiScan() {
  const { business } = useBusiness()
  const { reports, loading, saveReport } = useScanReports(business?.id)
  const [inputs, setInputs] = useState({ website: '', facebook: '', instagram: '' })
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState('')
  const [latest, setLatest] = useState<ScanReport | null>(null)

  async function handleScan() {
    if (!business) return
    setScanning(true)
    setError('')
    try {
      const { score, findings } = await generateScan(business, inputs)
      const saved = await saveReport(business.id, inputs, score, findings)
      setLatest(saved)
    } catch {
      setError(
        import.meta.env.VITE_ANTHROPIC_API_KEY
          ? 'The scan failed — please try again.'
          : 'Add VITE_ANTHROPIC_API_KEY to your .env to run a real AiScan.'
      )
    } finally {
      setScanning(false)
    }
  }

  const displayed = latest ?? reports[0]

  if (!business) {
    return (
      <AppShell title="AiScan">
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      </AppShell>
    )
  }

  return (
    <AppShell title="AiScan">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-textdark">Audit your online presence</h2>
        <p className="text-sm text-midgray">
          Give AiScan your links and get an AI-powered audit with specific improvements for {business.name}.
        </p>
      </div>

      <Card className="mb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Website"
            placeholder="https://yourbusiness.co.za"
            value={inputs.website}
            onChange={(e) => setInputs({ ...inputs, website: e.target.value })}
          />
          <Input
            label="Facebook"
            placeholder="facebook.com/yourbusiness"
            value={inputs.facebook}
            onChange={(e) => setInputs({ ...inputs, facebook: e.target.value })}
          />
          <Input
            label="Instagram"
            placeholder="instagram.com/yourbusiness"
            value={inputs.instagram}
            onChange={(e) => setInputs({ ...inputs, instagram: e.target.value })}
          />
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <Button onClick={handleScan} disabled={scanning} className="mt-5">
          <ScanSearch size={16} />
          {scanning ? 'Scanning…' : 'Run AiScan'}
        </Button>
      </Card>

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : displayed ? (
        <Card>
          <CardHeader>
            <CardTitle>Latest Scan — {formatRelativeTime(displayed.createdAt)}</CardTitle>
            {displayed.score !== null && <ScoreBadge score={displayed.score} />}
          </CardHeader>
          <ul className="space-y-4">
            {displayed.findings.map((f, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-black/5 p-4">
                <AlertCircle className="mt-0.5 shrink-0 text-gold" size={18} />
                <div>
                  <p className="text-sm font-semibold text-textdark">{f.area}</p>
                  <p className="text-sm text-midgray">{f.issue}</p>
                  <p className="mt-1 text-sm text-emerald-dark">→ {f.recommendation}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <ScanSearch className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No scans yet</p>
          <p className="max-w-sm text-sm text-midgray">Run your first AiScan above to get an AI-powered audit.</p>
        </div>
      )}
    </AppShell>
  )
}

function ScoreBadge({ score }: { score: number }) {
  const tone = score >= 70 ? 'emerald' : score >= 40 ? 'gold' : 'red'
  return <Badge tone={tone}>{score}/100</Badge>
}
