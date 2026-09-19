import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic, MicOff, AlertTriangle } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { cn } from '../../lib/utils'

interface VoiceCommand {
  phrases: string[]
  label: string
  action: (navigate: ReturnType<typeof useNavigate>) => void
}

const COMMANDS: VoiceCommand[] = [
  { phrases: ['dashboard', 'home'], label: '"Go to dashboard"', action: (nav) => nav('/app/dashboard') },
  { phrases: ['agents', 'bots'], label: '"Show my agents"', action: (nav) => nav('/app/agents') },
  { phrases: ['leads'], label: '"Show leads"', action: (nav) => nav('/app/leads') },
  { phrases: ['inbox', 'conversations', 'messages'], label: '"Open inbox"', action: (nav) => nav('/app/inbox') },
  { phrases: ['bookings', 'appointments'], label: '"Open bookings"', action: (nav) => nav('/app/bookings') },
  { phrases: ['brandbox', 'brand'], label: '"Open BrandBox"', action: (nav) => nav('/app/brandbox') },
  { phrases: ['scan', 'aiscan', 'audit'], label: '"Run AiScan"', action: (nav) => nav('/app/aiscan') },
  { phrases: ['analytics', 'reports'], label: '"Show reports"', action: (nav) => nav('/app/analytics') },
  { phrases: ['billing', 'plan'], label: '"Open billing"', action: (nav) => nav('/app/billing') },
  { phrases: ['settings'], label: '"Open settings"', action: (nav) => nav('/app/settings') },
]

export default function VoiceCommandCenter() {
  const navigate = useNavigate()
  const [supported, setSupported] = useState(true)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [lastMatch, setLastMatch] = useState('')
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setSupported(false)
      return
    }
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-ZA'

    recognition.onresult = (event: any) => {
      const text = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join('')
      setTranscript(text)
      if (event.results[0].isFinal) {
        handleCommand(text)
      }
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition

    return () => recognition.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleCommand(text: string) {
    const lower = text.toLowerCase()
    const match = COMMANDS.find((c) => c.phrases.some((p) => lower.includes(p)))
    if (match) {
      setLastMatch(match.label)
      match.action(navigate)
    } else {
      setLastMatch('')
    }
  }

  function toggleListening() {
    if (!recognitionRef.current) return
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
    } else {
      setTranscript('')
      setLastMatch('')
      recognitionRef.current.start()
      setListening(true)
    }
  }

  return (
    <AppShell title="Voice Command Center">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-textdark">Control AfriBox with your voice</h2>
        <p className="text-sm text-midgray">Say a command below to jump straight to that part of your dashboard.</p>
      </div>

      {!supported && (
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-gold/10 px-4 py-3 text-sm text-[#8a6f1f]">
          <AlertTriangle size={18} className="shrink-0" />
          Voice commands need a Chrome or Edge browser — this browser doesn't support speech recognition.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col items-center justify-center gap-5 py-12 text-center">
          <button
            onClick={toggleListening}
            disabled={!supported}
            aria-label={listening ? 'Stop listening' : 'Start listening'}
            className={cn(
              'flex h-20 w-20 items-center justify-center rounded-full text-white transition disabled:cursor-not-allowed disabled:opacity-40',
              listening ? 'animate-pulse bg-red-500' : 'bg-emerald hover:bg-emerald-dark'
            )}
          >
            {listening ? <MicOff size={30} /> : <Mic size={30} />}
          </button>
          <p className="font-semibold text-textdark">{listening ? 'Listening…' : 'Tap to speak a command'}</p>
          {transcript && <p className="max-w-xs text-sm text-midgray">"{transcript}"</p>}
          {lastMatch && <p className="text-sm font-medium text-emerald">Matched: {lastMatch}</p>}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Try saying…</CardTitle>
          </CardHeader>
          <ul className="space-y-2.5">
            {COMMANDS.map((c) => (
              <li key={c.label} className="rounded-lg bg-black/[0.03] px-4 py-2.5 text-sm text-textdark">
                {c.label}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  )
}
