"use client"
import React, { ReactNode } from 'react'

function Button({
  variant = 'primary',
  children,
  onclick,
  fullWidth,
}: {
  variant?: 'primary' | 'ghost' | 'secondary'
  children: ReactNode
  onclick?: () => void
  fullWidth?: boolean
}) {
  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary/90 shadow-[0_4px_14px_rgba(0,64,161,0.3)] hover:shadow-[0_6px_20px_rgba(0,64,161,0.4)] active:scale-95',
    ghost:
      'bg-white border border-slate-200 text-on-surface-variant hover:bg-surface-container-low hover:border-slate-300 active:scale-95',
    secondary:
      'bg-secondary text-white hover:bg-secondary/90 shadow-[0_4px_14px_rgba(0,107,94,0.3)] active:scale-95',
  }

  return (
    <button
      onClick={onclick}
      className={`flex items-center justify-center font-semibold gap-2 px-5 py-2.5 rounded-xl text-sm transition-all duration-200 ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  )
}

export default Button
