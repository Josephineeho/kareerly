"use client"
import { Search, Sparkles } from 'lucide-react'
import React from 'react'
import Button from '../UI/Button'
import Image from 'next/image'
import { HeroSidePicProps } from '@/types'
import HeroSidePic from './HeroSidePic'

function Hero() {
  const sidePics: HeroSidePicProps[] = [
    { img: "https://picsum.photos/seed/design/50/50", descriptor: "Product Design", description: "Creative Internship" },
    { img: "https://picsum.photos/seed/ops/50/50", descriptor: "Operations", description: "Junior Strategist" },
    { img: "https://picsum.photos/seed/mkt/50/50", descriptor: "Marketing", description: "Growth Associate" },
    { img: "https://picsum.photos/seed/eng/50/50", descriptor: "Engineering", description: "Frontend Intern" },
  ]

  return (
    <section className="relative overflow-hidden px-6 md:px-12 lg:px-20 py-16 md:py-24">
      {/* Subtle background orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* Left — Text */}
        <div className="flex-1 animate-fade-in-up">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={13} />
            AI-Powered Career Matching
          </div>

          <h1 className="font-black text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tighter text-on-surface">
            Connect with Your{' '}
            <span className="text-primary relative inline-block">
              Future Career
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 9C60 3 180 3 298 9" stroke="#0040a1" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
              </svg>
            </span>
          </h1>

          <p className="text-on-surface-variant text-lg mt-8 max-w-lg leading-relaxed">
            Discover exclusive internship opportunities and high-impact roles at the world&apos;s most innovative companies. Curated for the next generation of professionals.
          </p>

          {/* Search bar */}
          <div className="flex items-center mt-10 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,64,161,0.10)] border border-slate-100 overflow-hidden max-w-lg">
            <Search className="text-muted ml-4 flex-shrink-0" size={18} />
            <input
              placeholder="Job title or keyword…"
              className="flex-1 px-3 py-4 text-sm text-on-surface placeholder:text-muted bg-transparent outline-none"
              defaultValue=""
              onChange={() => {}}
            />
            <div className="pr-2">
              <Button variant="primary">Search</Button>
            </div>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex">
              {[1, 2, 3].map((i) => (
                <Image
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/40/40`}
                  alt=""
                  width={38}
                  height={38}
                  className={`rounded-full border-2 border-white object-cover ${i > 1 ? '-ml-3' : ''}`}
                />
              ))}
            </div>
            <p className="text-sm text-on-surface-variant">
              Joined by{' '}
              <span className="text-primary font-black text-base">2,000+</span>{' '}
              recent graduates
            </p>
          </div>
        </div>

        {/* Right — Side cards */}
        <div className="flex-1 hidden lg:grid grid-cols-2 gap-4 animate-fade-in-right">
          {sidePics.map((pic) => (
            <HeroSidePic key={pic.description} img={pic.img} descriptor={pic.descriptor} description={pic.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
