import { type ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className={cn('w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl', className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="font-display text-xl font-bold text-textdark">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto rounded-full p-1.5 text-midgray hover:bg-black/5 hover:text-textdark"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
