import React from 'react'
import Link from 'next/link'
import { User2 } from 'lucide-react'
import Button from './Button'
interface NavItems {
    name: string,
    to: string,
    active: boolean
}

function NavBar() {

    const navitems: NavItems[] = [
        {
            name: "Home",
            to: "/",
            active: true
        },
        {
            name: "Jobs",
            to: "/jobs",
            active: false,
        },
        {
            name: "Companies",
            to: "/companies",
            active: false,
        },
        {
            name: "FAQs",
            to: "/faqs",
            active: false,
        },
        {
            name: "About",
            to: "/about-us",
            active: false,
        }
    ]
  return (
    <div className='flex items-center justify-between p-4'>
      <div className="logo font-bold tracking-tighter text-2xl">Kareerly</div>
      <div className="nav">
        <ul className='sm:flex hidden items-center justify-between gap-4'>
            {navitems.map((item)=>(
                <Link key={item.to} href={item.to}><li className={`font-bold ${item.active && 'text-primary-container underline' }`}>{item.name}</li></Link>
            ))}
        </ul>
      </div>
      <div className="actions">
        <div className="profile flex gap-4 items-center">
            <div className="logedin border rounded-full p-2">
                <User2/>
            </div>
            
            <Link href={"/login"}><Button variant='ghost'>Login</Button></Link>
            <Link href={"/signup"}><Button variant='primary'>Sign Up</Button></Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar
