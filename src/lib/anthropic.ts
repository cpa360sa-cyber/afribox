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
// investor demo, but production must proxy this through a Cloud Function.
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
