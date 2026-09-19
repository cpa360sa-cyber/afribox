import type { Agent, Business, Message } from '../types'

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-6'

function buildSystemPrompt(agent: Agent, business: Business): string {
  const faqs = business.faqs.map((faq) => `Q: ${faq.q}\nA: ${faq.a}`).join('\n')
  return `You are ${agent.name}, an AI assistant for ${business.name} — ${business.description}.

Your role: ${agent.role}

Business services: ${business.services.join(', ')}
Tone: ${business.tone} (${business.language})
Escalation trigger: If the customer asks to speak to a human, or if you cannot answer with confidence, reply: "Let me connect you with our team — please hold."

FAQs:
${faqs}

Always respond in ${business.language}. Keep responses concise and helpful.`
}

// Client-side calls expose VITE_ANTHROPIC_API_KEY in the bundle — fine for the
// investor demo, but production must proxy this through a Supabase Edge Function.
async function complete(system: string, userPrompt: string, maxTokens: number): Promise<string> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text ?? ''
}

export async function sendChatMessage(
  agent: Agent,
  business: Business,
  history: Message[],
  maxTokens = 500
): Promise<string> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: buildSystemPrompt(agent, business),
      messages: history.map((m) => ({ role: m.role, content: m.content })),
    }),
  })

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text ?? "Let me connect you with our team — please hold."
}

export async function qualifyLead(agent: Agent, business: Business, history: Message[]): Promise<string> {
  return sendChatMessage(agent, business, history, 200)
}

const BRANDBOX_SYSTEM = 'You are BrandBox, AfriBox\'s branding assistant for South African startups. Write copy that is punchy, locally grounded, and free of clichés. Return ONLY the requested text — no preamble, no quotation marks, no markdown.'

export async function generateBio(business: Business): Promise<string> {
  const prompt = `Write a 2-3 sentence business bio for "${business.name}", a ${business.industry} business in ${business.location}. What they do: ${business.description}. Services: ${business.services.join(', ')}. Tone: ${business.tone}.`
  return (await complete(BRANDBOX_SYSTEM, prompt, 200)).trim()
}

export async function generateSlogan(business: Business): Promise<string> {
  const prompt = `Write ONE short, memorable slogan (under 8 words) for "${business.name}", a ${business.industry} business. What they do: ${business.description}. Tone: ${business.tone}.`
  return (await complete(BRANDBOX_SYSTEM, prompt, 60)).trim()
}

export async function generateLogoConcept(business: Business): Promise<{ initials: string; colors: [string, string] }> {
  const prompt = `Business name: "${business.name}", industry: ${business.industry}. Respond with ONLY two lines: line 1 is 1-2 uppercase letters to use as a monogram (pick the strongest initials); line 2 is two hex colors separated by a comma that suit this brand (e.g. "#1A936F,#C9A84C").`
  const raw = await complete(BRANDBOX_SYSTEM, prompt, 40)
  const lines = raw.trim().split('\n').map((l) => l.trim()).filter(Boolean)
  const initials = (lines[0] ?? business.name.slice(0, 2)).replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || 'AB'
  const colorMatch = (lines[1] ?? '').match(/#[0-9a-fA-F]{6}/g)
  const colors: [string, string] =
    colorMatch && colorMatch.length >= 2 ? [colorMatch[0], colorMatch[1]] : ['#1A936F', '#C9A84C']
  return { initials, colors }
}

const AISCAN_SYSTEM =
  'You are AiScan, AfriBox\'s online-presence auditor for South African startups. Respond with ONLY valid JSON matching this shape, no markdown fences, no commentary: {"score": <0-100 integer>, "findings": [{"area": string, "issue": string, "recommendation": string}, ...]}. Give 4-6 findings, specific and actionable, based only on the information provided.'

export async function generateScan(
  business: Business,
  inputs: { website?: string; facebook?: string; instagram?: string }
): Promise<{ score: number; findings: { area: string; issue: string; recommendation: string }[] }> {
  const links = [
    inputs.website && `Website: ${inputs.website}`,
    inputs.facebook && `Facebook: ${inputs.facebook}`,
    inputs.instagram && `Instagram: ${inputs.instagram}`,
  ]
    .filter(Boolean)
    .join('\n')

  const prompt = `Business: ${business.name}, a ${business.industry} business in ${business.location}. Description: ${business.description}. Services: ${business.services.join(', ')}.

Online presence provided:
${links || 'None provided — base findings on having no verifiable online presence yet.'}

Audit this business's online presence for a South African small-business audience and return the JSON.`

  const raw = await complete(AISCAN_SYSTEM, prompt, 800)
  const cleaned = raw.trim().replace(/^```json?\n?/, '').replace(/```$/, '')
  const parsed = JSON.parse(cleaned)
  return { score: parsed.score, findings: parsed.findings }
}
