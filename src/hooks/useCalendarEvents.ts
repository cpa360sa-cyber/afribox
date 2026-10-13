import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToCalendarEvent } from '../lib/mappers'
import type { CalendarEvent } from '../types'

export function useCalendarEvents(businessId: string | undefined) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setEvents([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('business_id', businessId)
        .order('starts_at', { ascending: true })
      setEvents((data ?? []).map(rowToCalendarEvent))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`events-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'calendar_events', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function createEvent(event: { businessId: string; title: string; startsAt: number; location?: string; allDay?: boolean }) {
    await supabase.from('calendar_events').insert({
      business_id: event.businessId,
      title: event.title,
      starts_at: new Date(event.startsAt).toISOString(),
      location: event.location ?? '',
      all_day: event.allDay ?? false,
    })
  }

  async function deleteEvent(eventId: string) {
    await supabase.from('calendar_events').delete().eq('id', eventId)
  }

  return { events, loading, createEvent, deleteEvent }
}
