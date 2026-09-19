import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToBooking } from '../lib/mappers'
import type { Booking, BookingStatus, PaymentProvider } from '../types'

export function useBookings(businessId: string | undefined) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setBookings([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('business_id', businessId)
        .order('scheduled_at', { ascending: true })
      setBookings((data ?? []).map(rowToBooking))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`bookings-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function createBooking(booking: {
    businessId: string
    customerName: string
    customerPhone: string
    service: string
    scheduledAt: number
    paymentProvider?: PaymentProvider
    amountZAR?: number
  }) {
    await supabase.from('bookings').insert({
      business_id: booking.businessId,
      customer_name: booking.customerName,
      customer_phone: booking.customerPhone,
      service: booking.service,
      scheduled_at: new Date(booking.scheduledAt).toISOString(),
      payment_provider: booking.paymentProvider ?? null,
      amount_zar: booking.amountZAR ?? null,
    })
  }

  async function updateBookingStatus(bookingId: string, status: BookingStatus) {
    await supabase.from('bookings').update({ status }).eq('id', bookingId)
  }

  return { bookings, loading, createBooking, updateBookingStatus }
}
