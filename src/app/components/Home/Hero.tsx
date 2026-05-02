"use client"
import { Locate, Search } from 'lucide-react'
import React from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import Image from 'next/image'
import { HeroSidePicProps } from '@/types'
import HeroSidePic from './HeroSidePic'

function Hero() {

  const sidePics: HeroSidePicProps[] = [
    {
      img: "https://picsum.photos/50/50",
      descriptor: "Product Design",
      description: "Creative Internship"
    },
    {
      img: "https://picsum.photos/50/50",
      descriptor: "Operations",
      description: "Junior Strategist"
    },
    {
      img: "https://picsum.photos/50/50",
      descriptor: "Marketing",
      description: "Growth Associate"
    },
    {
      img: "https://picsum.photos/50/50",
      descriptor: "Engineering",
      description: "Frontend Intern"
    }

  ]

  return (
    <div className='p-9 flex justify-center items-center'>
      <div className="section1 flex-1">
        <h1 className='font-bold text-6xl mt-10 tracking-tighter'>Connect with Your <span className='text-primary '> Future Career</span></h1>
        <p className='text-lg mt-10'>Discover exclusive internship opportunities and high-impact roles at the world's most innovative companies. Curated for the next generation of architects. </p>
        <div className="cta flex mt-10 ">
          <div className="action1 shadow-lg  flex items-center bg-surface-container-low  rounded gap-2 border border-slate-300">
            <Search className='text-muted m-2' />
            <input placeholder='Job title or keyword' value='' onChange={() => { }} />
            <Button variant='primary'>Search</Button>

          </div>
        </div>
        <div className="stats flex items-center mt-5 gap-6">
          <div className="small-pics flex ">
            <Image src={"https://picsum.photos/50/50"} alt='' width={50} height={50} className='border-3 border-white rounded-lg' />
            <Image src={"https://picsum.photos/50/50"} alt='' width={50} height={50} className='border-3 -ml-4 border-white rounded-lg' />

            <Image src={"https://picsum.photos/50/50"} alt='' width={50} height={50} className='border-3 -ml-4 border-white rounded-lg' />

          </div>
          <p className='text-muted'>Joined by <span className='text-primary text-lg font-bold'>2,000+</span> recent graduates</p>
        </div>
      </div>
      <div className="section2 flex-1 hidden sm:grid sm:grid-cols-2">
        {
          sidePics.map((pics) => (
            <HeroSidePic key={pics.description} img={pics.img} descriptor={pics.descriptor} description={pics.description} />
          ))
        }
      </div>
    </div>
  )
}

export default Hero
