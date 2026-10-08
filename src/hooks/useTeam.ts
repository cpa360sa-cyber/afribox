import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToTeamMember } from '../lib/mappers'
import type { TeamMember } from '../types'

export function useTeam(businessId: string | undefined) {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setMembers([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('team_members')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: true })
      setMembers((data ?? []).map(rowToTeamMember))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`team-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_members', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function inviteMember(businessId: string, name: string, role: string, email: string) {
    await supabase.from('team_members').insert({ business_id: businessId, name, role, email, status: 'invited' })
  }

  async function removeMember(memberId: string) {
    await supabase.from('team_members').delete().eq('id', memberId)
  }

  return { members, loading, inviteMember, removeMember }
}
