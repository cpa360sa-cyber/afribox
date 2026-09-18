import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import Inbox from './pages/app/Inbox'
import Analytics from './pages/app/Analytics'
import Leads from './pages/app/Leads'
import Billing from './pages/app/Billing'
import Settings from './pages/app/Settings'

import AdminOverview from './pages/admin/AdminOverview'
import ClientList from './pages/admin/ClientList'
import ClientDetail from './pages/admin/ClientDetail'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminSettings from './pages/admin/AdminSettings'

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
            <Route
              path="/app/dashboard"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <Dashboard />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/agents"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <Agents />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/agents/:id"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <AgentDetail />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/inbox"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <Inbox />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/analytics"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <Analytics />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/leads"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <Leads />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/billing"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <Billing />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/settings"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <Settings />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />

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
