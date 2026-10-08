import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToAutomation } from '../lib/mappers'
import type { Automation, AutomationStatus } from '../types'

export function useAutomations(businessId: string | undefined) {
  const [automations, setAutomations] = useState<Automation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setAutomations([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('automations')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setAutomations((data ?? []).map(rowToAutomation))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`automations-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'automations', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function enableAutomation(businessId: string, templateId: string, name: string) {
    await supabase.from('automations').insert({ business_id: businessId, template_id: templateId, name, status: 'active' })
  }

  async function toggleAutomation(automationId: string, status: AutomationStatus) {
    await supabase.from('automations').update({ status }).eq('id', automationId)
  }

  async function removeAutomation(automationId: string) {
    await supabase.from('automations').delete().eq('id', automationId)
  }

  return { automations, loading, enableAutomation, toggleAutomation, removeAutomation }
}
