import { CircleCheck, MoveRight } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

interface UserTypesParamsType {
  icon: React.ReactNode
  title: string
  description: string
  points: string[]
  actionText: string
}

function UserTypes({ icon, title, description, points, actionText }: UserTypesParamsType) {
  return (
    <div className="group flex flex-col gap-6 bg-white rounded-3xl p-8 shadow-[0_4px_32px_rgba(0,64,161,0.07)] border border-slate-100 hover:shadow-[0_8px_48px_rgba(0,64,161,0.13)] hover:-translate-y-1 transition-all duration-300">

      {/* Icon */}
      <div className="w-fit">
        {icon}
      </div>

      {/* Text */}
      <div>
        <h2 className="font-black text-2xl text-on-surface mb-2">{title}</h2>
        <p className="text-on-surface-variant text-sm leading-relaxed">{description}</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100" />

      {/* Points */}
      <ul className="flex flex-col gap-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-center gap-3">
            <CircleCheck size={18} className="text-secondary flex-shrink-0" />
            <span className="text-sm font-medium text-on-surface">{point}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/"
        className="mt-auto inline-flex items-center gap-2 text-primary-container font-bold text-sm group-hover:gap-3 transition-all duration-200"
      >
        {actionText}
        <MoveRight size={16} />
      </Link>
    </div>
  )
}

export default UserTypes
