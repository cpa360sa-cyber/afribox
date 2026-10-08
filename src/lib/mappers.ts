import type {
  Agent,
  AppUser,
  Automation,
  Booking,
  BrandAsset,
  Business,
  Conversation,
  Deal,
  KnowledgeArticle,
  Lead,
  ScanReport,
  TeamMember,
} from '../types'

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

export function rowToBooking(row: any): Booking {
  return {
    id: row.id,
    businessId: row.business_id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone ?? '',
    service: row.service ?? '',
    scheduledAt: new Date(row.scheduled_at).getTime(),
    status: row.status,
    paymentProvider: row.payment_provider,
    paymentStatus: row.payment_status,
    amountZAR: row.amount_zar,
    createdAt: new Date(row.created_at).getTime(),
  }
}

export function rowToBrandAsset(row: any): BrandAsset {
  return {
    id: row.id,
    businessId: row.business_id,
    assetType: row.asset_type,
    content: row.content,
    meta: row.meta ?? {},
    createdAt: new Date(row.created_at).getTime(),
  }
}

export function rowToScanReport(row: any): ScanReport {
  return {
    id: row.id,
    businessId: row.business_id,
    inputs: row.inputs ?? {},
    score: row.score,
    findings: row.findings ?? [],
    createdAt: new Date(row.created_at).getTime(),
  }
}

export function rowToDeal(row: any): Deal {
  return {
    id: row.id,
    businessId: row.business_id,
    leadId: row.lead_id,
    title: row.title,
    customerName: row.customer_name ?? '',
    valueZAR: row.value_zar,
    stage: row.stage,
    notes: row.notes ?? '',
    createdAt: new Date(row.created_at).getTime(),
    updatedAt: new Date(row.updated_at).getTime(),
  }
}

export function rowToKnowledgeArticle(row: any): KnowledgeArticle {
  return {
    id: row.id,
    businessId: row.business_id,
    title: row.title,
    content: row.content,
    createdAt: new Date(row.created_at).getTime(),
    updatedAt: new Date(row.updated_at).getTime(),
  }
}

export function rowToAutomation(row: any): Automation {
  return {
    id: row.id,
    businessId: row.business_id,
    templateId: row.template_id,
    name: row.name,
    status: row.status,
    runCount: row.run_count,
    lastRunAt: row.last_run_at ? new Date(row.last_run_at).getTime() : null,
    createdAt: new Date(row.created_at).getTime(),
  }
}

export function rowToTeamMember(row: any): TeamMember {
  return {
    id: row.id,
    businessId: row.business_id,
    name: row.name,
    role: row.role ?? '',
    email: row.email ?? '',
    status: row.status,
    createdAt: new Date(row.created_at).getTime(),
  }
}
