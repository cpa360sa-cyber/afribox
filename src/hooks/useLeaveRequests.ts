import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToLeaveRequest } from '../lib/mappers'
import type { LeaveRequest, LeaveStatus, LeaveType } from '../types'

export function useLeaveRequests(businessId: string | undefined) {
  const [requests, setRequests] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setRequests([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('leave_requests')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setRequests((data ?? []).map(rowToLeaveRequest))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`leave-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leave_requests', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function requestLeave(req: { businessId: string; memberName: string; leaveType: LeaveType; startsOn: string; endsOn: string }) {
    await supabase.from('leave_requests').insert({
      business_id: req.businessId,
      member_name: req.memberName,
      leave_type: req.leaveType,
      starts_on: req.startsOn,
      ends_on: req.endsOn,
    })
  }

  async function updateLeaveStatus(requestId: string, status: LeaveStatus) {
    await supabase.from('leave_requests').update({ status }).eq('id', requestId)
  }

  return { requests, loading, requestLeave, updateLeaveStatus }
}
