import React from 'react'
import Link from 'next/link'
import Button from '../UI/Button'
import { ArrowRight, Sparkles } from 'lucide-react'

function Ready() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-4xl mx-auto relative overflow-hidden bg-primary rounded-3xl p-10 md:p-16 text-center shadow-[0_20px_80px_rgba(0,64,161,0.25)]">

        {/* Decorative blobs inside the card */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={13} />
            Join 2,000+ professionals
          </div>

          <h2 className="font-black text-4xl md:text-5xl text-white leading-tight tracking-tight mb-5">
            Ready to Architect<br />Your Career?
          </h2>
          <p className="text-white/75 text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Join thousands of professionals and companies building their future together. Start your journey today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <button className="flex items-center gap-2 bg-white text-primary font-bold px-7 py-3.5 rounded-xl hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-md text-sm">
                Start My Career
                <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/signup?role=employer">
              <button className="flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-white/20 active:scale-95 transition-all duration-200 text-sm">
                Start Hiring
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ready
