import { BrowserRouter, Routes, Route } from 'react-router-dom'
import type { ReactNode } from 'react'
import { AuthProvider } from './context/AuthContext'
import { BusinessProvider } from './context/BusinessContext'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { RequireOnboarding } from './components/layout/RequireOnboarding'

import Landing from './pages/public/Landing'
import Pricing from './pages/public/Pricing'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import NotFound from './pages/public/NotFound'

import Onboarding from './pages/app/Onboarding'
import Dashboard from './pages/app/Dashboard'
import Agents from './pages/app/Agents'
import AgentDetail from './pages/app/AgentDetail'
import Analytics from './pages/app/Analytics'
import Billing from './pages/app/Billing'
import Settings from './pages/app/Settings'
import BrandBox from './pages/app/BrandBox'
import AiScan from './pages/app/AiScan'
import VoiceCommandCenter from './pages/app/VoiceCommandCenter'
import Sales from './pages/app/Sales'
import AiMemory from './pages/app/AiMemory'
import Automations from './pages/app/Automations'
import HR from './pages/app/HR'
import WhatsAppCenter from './pages/app/WhatsAppCenter'
import CalendarPage from './pages/app/CalendarPage'
import Customers from './pages/app/Customers'
import Marketing from './pages/app/Marketing'
import Website from './pages/app/Website'
import Tasks from './pages/app/Tasks'
import Finance from './pages/app/Finance'
import Documents from './pages/app/Documents'
import Integrations from './pages/app/Integrations'
import HelpCenter from './pages/app/HelpCenter'

import AdminOverview from './pages/admin/AdminOverview'
import ClientList from './pages/admin/ClientList'
import ClientDetail from './pages/admin/ClientDetail'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminSettings from './pages/admin/AdminSettings'

function AppPage({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <RequireOnboarding>{children}</RequireOnboarding>
    </ProtectedRoute>
  )
}

const appRoutes: { path: string; element: ReactNode }[] = [
  { path: '/app/dashboard', element: <Dashboard /> },
  { path: '/app/agents', element: <Agents /> },
  { path: '/app/agents/:id', element: <AgentDetail /> },
  { path: '/app/voice', element: <VoiceCommandCenter /> },
  { path: '/app/ai-memory', element: <AiMemory /> },
  { path: '/app/aiscan', element: <AiScan /> },
  { path: '/app/brandbox', element: <BrandBox /> },
  { path: '/app/whatsapp', element: <WhatsAppCenter /> },
  { path: '/app/calendar', element: <CalendarPage /> },
  { path: '/app/customers', element: <Customers /> },
  { path: '/app/sales', element: <Sales /> },
  { path: '/app/marketing', element: <Marketing /> },
  { path: '/app/website', element: <Website /> },
  { path: '/app/automations', element: <Automations /> },
  { path: '/app/tasks', element: <Tasks /> },
  { path: '/app/hr', element: <HR /> },
  { path: '/app/finance', element: <Finance /> },
  { path: '/app/documents', element: <Documents /> },
  { path: '/app/analytics', element: <Analytics /> },
  { path: '/app/integrations', element: <Integrations /> },
  { path: '/app/billing', element: <Billing /> },
  { path: '/app/settings', element: <Settings /> },
  { path: '/app/help', element: <HelpCenter /> },
]

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <BusinessProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/app/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />

            {appRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<AppPage>{route.element}</AppPage>} />
            ))}

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminOverview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/clients"
              element={
                <ProtectedRoute adminOnly>
                  <ClientList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/clients/:id"
              element={
                <ProtectedRoute adminOnly>
                  <ClientDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute adminOnly>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute adminOnly>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BusinessProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
