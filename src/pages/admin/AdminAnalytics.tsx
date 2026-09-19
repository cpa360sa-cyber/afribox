import { useMemo } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AdminShell } from '../../components/layout/AdminShell'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { useAdminData } from '../../hooks/useAdminData'

const COLORS = ['#1A936F', '#C9A84C', '#00B4A6', '#0D1B2A']

export default function AdminAnalytics() {
  const { businesses, agents, loading } = useAdminData()

  const industryData = useMemo(() => {
    const counts: Record<string, number> = {}
    businesses.forEach((b) => {
      counts[b.industry] = (counts[b.industry] ?? 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [businesses])

  const agentTypeData = useMemo(() => {
    const counts: Record<string, number> = { salesbot: 0, adminbot: 0, brandbot: 0 }
    agents.forEach((a) => {
      counts[a.type] = (counts[a.type] ?? 0) + 1
    })
    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  }, [agents])

  return (
    <AdminShell title="Platform Analytics">
      {loading ? (
        <div className="h-96 animate-pulse rounded-2xl bg-black/5" />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Agents Deployed by Type</CardTitle>
            </CardHeader>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={agentTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#8A9BAE" />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#8A9BAE" />
                <Tooltip />
                <Bar dataKey="count" fill="#1A936F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clients by Industry</CardTitle>
            </CardHeader>
            {industryData.length === 0 ? (
              <p className="py-16 text-center text-sm text-midgray">No data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={industryData} dataKey="value" nameKey="name" outerRadius={90} label>
                    {industryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>
      )}
    </AdminShell>
  )
}
