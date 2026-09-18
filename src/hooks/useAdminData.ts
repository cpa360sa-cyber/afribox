import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToAgent, rowToAppUser, rowToBusiness, rowToConversation } from '../lib/mappers'
import type { AppUser, Business, Agent, Conversation } from '../types'

export function useAdminData() {
  const [users, setUsers] = useState<AppUser[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [profilesRes, businessesRes, agentsRes, conversationsRes] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('businesses').select('*'),
        supabase.from('agents').select('*'),
        supabase.from('conversations').select('*'),
      ])
      setUsers((profilesRes.data ?? []).map(rowToAppUser))
      setBusinesses((businessesRes.data ?? []).map(rowToBusiness))
      setAgents((agentsRes.data ?? []).map(rowToAgent))
      setConversations((conversationsRes.data ?? []).map(rowToConversation))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel('admin-data')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'businesses' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agents' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { users, businesses, agents, conversations, loading }
}
