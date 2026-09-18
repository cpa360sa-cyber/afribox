import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function ProtectedRoute({ children, adminOnly = false }: { children: ReactNode; adminOnly?: boolean }) {
  const { authUser, appUser, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald/20 border-t-emerald" />
      </div>
    )
  }

  if (!authUser) return <Navigate to="/login" replace />
  if (adminOnly && appUser?.role !== 'admin') return <Navigate to="/app/dashboard" replace />

  return <>{children}</>
}
