import Image from 'next/image'
import React from 'react'
import { HeroSidePicProps } from '@/types'


function HeroSidePic({img, descriptor, description}: HeroSidePicProps) {
  return (
    <div className=' relative w-full bg-white p-2 rounded-lg'>
      <Image src={img} alt='' width={300} height={300} className='rounded' />
      <p className='text-primary font-bold'>{descriptor}</p>
      <p className='font-bold text-xl'>{description}</p>
    </div>
  )
}

export default HeroSidePic
