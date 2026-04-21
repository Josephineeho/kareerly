"use client"
import React from 'react'
import Link from 'next/link';
import { Eye, ShieldCheck } from 'lucide-react';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

function Login() {
  return (
    <div className='shadow m-5 w-fit rounded-lg flex justify-center'>
      <div className="section1 hidden sm:flex sm:flex-col gap-10 p-3 bg-primary text-white">
        <Link href={"/"} className='font-bold text-2xl'>Kareerly</Link>
        <h1>Build your professional career with precision.</h1>
        <p>Welcome to Kareerly! Sign in to get started.</p>
        <div className="trusted-by bg-white/20 rounded p-3 flex justify-center gap-5 items-center">
          <ShieldCheck size={40}/>
          <p>Trusted by 1000+ industry leading professionals in Africa.</p>
        </div>
      </div>
      <div className="section2 flex flex-col gap-5 p-3">
        <h2 className='font-bold text-3xl'>Welcome back </h2>
        <p className='font-bold'>Please enter your credentials to access your dashboard.</p>
        <div className="socials-login flex justify-center gap-10">
          <Button variant='ghost'>
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            <h1>Google</h1>
          </Button>
          <Button variant="ghost">
            <img src="https://www.linkedin.com/favicon.ico" className="w-4 h-4" alt="LinkedIn" />
            <h1>LinkedIn</h1>
          </Button>
        </div>
        <p className='font-bold text-xs'>OR LOGIN WITH EMAIL</p>
      <Input label="ENTER EMAIL" type='email' placeholder='example@gmail.com' value='' onChange={(e)=>{}}></Input>
      <Input label="ENTER PASSWORD" type='password' placeholder='..........' value='' onChange={(e)=>{}}>
      </Input>
      <Button variant={'primary'}>Login</Button>
      
      </div>
    </div>
  )
}

export default Login
