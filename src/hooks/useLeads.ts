import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToLead } from '../lib/mappers'
import type { Lead, LeadStatus } from '../types'

export function useLeads(businessId: string | undefined) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setLeads([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setLeads((data ?? []).map(rowToLead))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`leads-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) {
    await supabase.from('leads').insert({
      agent_id: lead.agentId,
      business_id: lead.businessId,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      query_type: lead.queryType,
      status: 'new',
    })
  }

  async function updateLeadStatus(leadId: string, status: LeadStatus) {
    await supabase.from('leads').update({ status }).eq('id', leadId)
  }

  return { leads, loading, createLead, updateLeadStatus }
}
