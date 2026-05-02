import { CircleCheck, GraduationCap, MoveRight } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

interface UserTypesParamsType {
    icon: React.ReactNode;
    title: string;
    description: string;
    points: string[];
    actionText: string;
}


function UserTypes({ icon, title, description, points, actionText }: UserTypesParamsType) {
  return (
    <div className='flex flex-col gap-8 bg-lowest rounded-2xl m-10 shadow-2xl p-10'>
    {icon}
    <h2 className='font-bold text-2xl'>{title}</h2>
    <p className='text-muted'>{description} </p>
      <div className="users-description">
        {points.map((point, index) => (
          <div key={index} className="check flex gap-2 mb-2">
            <CircleCheck className='bg-secondary rounded-full text-white' />
            <p>{point}</p>
          </div>
        ))}
      </div>
        <Link href='/' className='text-primary-container flex gap-2 hover:underline font-bold text-sm'>{actionText}<MoveRight/></Link>

    </div>
  )
}

export default UserTypes
