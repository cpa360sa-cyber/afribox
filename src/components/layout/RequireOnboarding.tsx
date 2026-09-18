import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function RequireOnboarding({ children }: { children: ReactNode }) {
  const { appUser } = useAuth()
  if (appUser && !appUser.onboardingComplete) {
    return <Navigate to="/app/onboarding" replace />
  }
  return <>{children}</>
}
