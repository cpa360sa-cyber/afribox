import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToNotification } from '../lib/mappers'

export function useNotifications(businessId: string | undefined) {
  const [notifications, setNotifications] = useState<ReturnType<typeof rowToNotification>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setNotifications([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
        .limit(20)
      setNotifications((data ?? []).map(rowToNotification))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`notifications-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function markAllRead(businessId: string) {
    await supabase.from('notifications').update({ read: true }).eq('business_id', businessId).eq('read', false)
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return { notifications, loading, unreadCount, markAllRead }
}
