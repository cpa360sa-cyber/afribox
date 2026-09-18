import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToConversation } from '../lib/mappers'
import type { Conversation, Message } from '../types'

export function useConversations(businessId: string | undefined) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setConversations([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setConversations((data ?? []).map(rowToConversation))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`conversations-${businessId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'conversations', filter: `business_id=eq.${businessId}` },
        load
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function createConversation(agentId: string, businessId: string, messages: Message[]) {
    const { data } = await supabase
      .from('conversations')
      .insert({ agent_id: agentId, business_id: businessId, messages, status: 'open' })
      .select('id')
      .single()
    return data?.id as string
  }

  return { conversations, loading, createConversation }
}
