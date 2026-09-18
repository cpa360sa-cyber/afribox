import { Input } from '../ui/Input'
import { TONES, LANGUAGES } from '../../constants/industries'
import { cn } from '../../lib/utils'
import type { AgentTone, AgentLanguage } from '../../types'

interface Props {
  agentName: string
  tone: AgentTone
  language: AgentLanguage
  onChange: (data: { agentName: string; tone: AgentTone; language: AgentLanguage }) => void
}

export function ToneSetup({ agentName, tone, language, onChange }: Props) {
  return (
    <div className="space-y-6">
      <Input
        label="Give your AI employee a name"
        name="agentName"
        placeholder="e.g. Thandi"
        required
        value={agentName}
        onChange={(e) => onChange({ agentName: e.target.value, tone, language })}
      />

      <div>
        <p className="mb-2 text-sm font-semibold text-textdark">Communication style</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {TONES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ agentName, tone: t.id, language })}
              aria-pressed={tone === t.id}
              className={cn(
                'rounded-xl border-2 p-4 text-left transition',
                tone === t.id ? 'border-emerald bg-emerald/5' : 'border-black/10 hover:border-emerald/40'
              )}
            >
              <p className={cn('font-semibold', tone === t.id ? 'text-emerald-dark' : 'text-textdark')}>{t.label}</p>
              <p className="mt-0.5 text-xs text-midgray">{t.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-textdark">Language preference</p>
        <div className="flex flex-wrap gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => onChange({ agentName, tone, language: lang })}
              aria-pressed={language === lang}
              className={cn(
                'rounded-full border-2 px-5 py-2 text-sm font-medium transition',
                language === lang
                  ? 'border-emerald bg-emerald text-white'
                  : 'border-black/10 text-textdark hover:border-emerald/40'
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
