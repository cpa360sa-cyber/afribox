import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToAgent } from '../lib/mappers'
import type { Agent, AgentStatus, AgentType } from '../types'

export function useAgents(businessId: string | undefined) {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setAgents([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase.from('agents').select('*').eq('business_id', businessId)
      setAgents((data ?? []).map(rowToAgent))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`agents-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agents', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function createAgent(businessId: string, type: AgentType, name: string, role: string) {
    await supabase.from('agents').insert({
      business_id: businessId,
      type,
      name,
      role,
      status: 'active',
      config: {},
    })
  }

  async function toggleAgentStatus(agentId: string, status: AgentStatus) {
    await supabase.from('agents').update({ status }).eq('id', agentId)
  }

  async function updateAgentConfig(agentId: string, config: Partial<Agent['config']>) {
    await supabase.from('agents').update({ config }).eq('id', agentId)
  }

  return { agents, loading, createAgent, toggleAgentStatus, updateAgentConfig }
}
