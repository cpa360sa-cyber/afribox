import { type SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, placeholder, id, ...props }, ref) => {
    const selectId = id ?? props.name
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="mb-1.5 block text-sm font-semibold text-textdark">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-textdark focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)
Select.displayName = 'Select'
