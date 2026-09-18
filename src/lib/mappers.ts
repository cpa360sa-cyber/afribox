import type { Agent, AppUser, Business, Conversation, Lead } from '../types'

export function rowToAppUser(row: any): AppUser {
  return {
    uid: row.id,
    email: row.email,
    displayName: row.display_name ?? '',
    role: row.role,
    createdAt: new Date(row.created_at).getTime(),
    planId: row.plan_id,
    onboardingComplete: row.onboarding_complete,
  }
}

export function rowToBusiness(row: any): Business {
  return {
    id: row.id,
    ownerId: row.owner_id,
    name: row.name,
    industry: row.industry,
    location: row.location,
    website: row.website ?? '',
    logoUrl: row.logo_url ?? '',
    description: row.description ?? '',
    services: row.services ?? [],
    faqs: row.faqs ?? [],
    tone: row.tone,
    language: row.language,
    painPoints: row.pain_points ?? [],
    createdAt: new Date(row.created_at).getTime(),
  }
}

export function rowToAgent(row: any): Agent {
  return {
    id: row.id,
    businessId: row.business_id,
    type: row.type,
    name: row.name,
    role: row.role ?? '',
    status: row.status,
    config: row.config ?? {},
    createdAt: new Date(row.created_at).getTime(),
    conversationCount: row.conversation_count,
    leadsCount: row.leads_count,
  }
}

export function rowToConversation(row: any): Conversation {
  return {
    id: row.id,
    agentId: row.agent_id,
    businessId: row.business_id,
    messages: row.messages ?? [],
    status: row.status,
    createdAt: new Date(row.created_at).getTime(),
    customerName: row.customer_name ?? undefined,
  }
}

export function rowToLead(row: any): Lead {
  return {
    id: row.id,
    agentId: row.agent_id,
    businessId: row.business_id,
    name: row.name,
    phone: row.phone ?? '',
    email: row.email ?? '',
    queryType: row.query_type ?? 'general',
    createdAt: new Date(row.created_at).getTime(),
    status: row.status,
  }
}
