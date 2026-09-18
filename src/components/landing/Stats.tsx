const stats = [
  { value: '12+', label: 'Clients served' },
  { value: 'R450K+', label: 'In value delivered' },
  { value: '5', label: 'Industries automated' },
]

export function Stats() {
  return (
    <section className="bg-emerald py-16">
      <div className="container-page grid gap-8 text-center sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">{s.value}</p>
            <p className="mt-2 text-sm font-medium text-white/80">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
