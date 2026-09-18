import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { INDUSTRIES } from '../../constants/industries'

export interface BusinessProfileData {
  name: string
  industry: string
  location: string
  website: string
  logoUrl: string
  description: string
  services: string
}

interface Props {
  data: BusinessProfileData
  onChange: (data: BusinessProfileData) => void
}

export function BusinessProfileForm({ data, onChange }: Props) {
  function set<K extends keyof BusinessProfileData>(key: K, value: BusinessProfileData[K]) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-5">
      <Input label="Business name" name="businessName" required value={data.name} onChange={(e) => set('name', e.target.value)} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Industry"
          name="industry"
          required
          placeholder="Select an industry"
          options={INDUSTRIES.map((i) => ({ value: i, label: i }))}
          value={data.industry}
          onChange={(e) => set('industry', e.target.value)}
        />
        <Input label="Location" name="location" placeholder="e.g. Soweto, Gauteng" required value={data.location} onChange={(e) => set('location', e.target.value)} />
      </div>
      <Input label="Website (optional)" name="website" value={data.website} onChange={(e) => set('website', e.target.value)} />
      <Input label="Logo URL (optional)" name="logoUrl" value={data.logoUrl} onChange={(e) => set('logoUrl', e.target.value)} />
      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-textdark">
          Short business description
        </label>
        <textarea
          id="description"
          required
          rows={3}
          placeholder="e.g. Your neighbourhood grocery delivery service"
          value={data.description}
          onChange={(e) => set('description', e.target.value)}
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-textdark focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"
        />
      </div>
      <div>
        <label htmlFor="services" className="mb-1.5 block text-sm font-semibold text-textdark">
          Services offered (comma-separated)
        </label>
        <textarea
          id="services"
          rows={2}
          placeholder="e.g. Same-day delivery, Bulk orders, Weekly produce boxes"
          value={data.services}
          onChange={(e) => set('services', e.target.value)}
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-textdark focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"
        />
      </div>
    </div>
  )
}
