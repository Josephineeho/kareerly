import Image from 'next/image'
import React from 'react'
import { HeroSidePicProps } from '@/types'
import { ArrowRight } from 'lucide-react'

function HeroSidePic({ img, descriptor, description }: HeroSidePicProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-4 shadow-[0_4px_24px_rgba(0,64,161,0.08)] border border-slate-100 hover:shadow-[0_8px_32px_rgba(0,64,161,0.14)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-3">
        <Image
          src={img}
          alt={descriptor}
          width={44}
          height={44}
          className="rounded-xl object-cover flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-primary text-xs font-bold uppercase tracking-wide truncate">{descriptor}</p>
          <p className="font-bold text-sm text-on-surface truncate">{description}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted">View details</span>
        <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
      </div>
    </div>
  )
}

export default HeroSidePic
