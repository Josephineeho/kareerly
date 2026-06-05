"use client"
import React from 'react'

const companies: string[] = ["BEAC", "MTN Cameroon", "Go Africa", "AppsTech", "Orange", "Camtel"]

function Companies() {
  return (
    <section className="py-14 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-muted mb-8">
          Trusted by leading companies across Africa
        </p>

        {/* Marquee ticker */}
        <div className="relative">
          {/* fade masks */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

          <div className="flex gap-10 animate-marquee whitespace-nowrap">
            {[...companies, ...companies].map((comp, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-low border border-slate-100 text-on-surface-variant font-bold text-sm flex-shrink-0 hover:border-primary/20 hover:bg-primary/5 transition-colors duration-200"
              >
                <span className="w-2 h-2 rounded-full bg-primary/40 flex-shrink-0" />
                {comp}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Companies
