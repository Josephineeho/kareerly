"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { Eye, Loader, ShieldCheck } from 'lucide-react';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { login } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { error } from 'console';


function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [loading, setLoading ] = useState(false);
  

  const [formError, setFormError] = useState("")


  const authenticateUser = async ()=>{
    setLoading(true)
    if (email == "" || password ==""){
      setFormError("All fields are required");
    } else{
     const loginResults = await login(email, password);
     if (loginResults.error){
      setFormError(loginResults.error)
     } else{
        router.push("/dashboard");
     }
     setLoading(false)
     
    }
     setLoading(false) 
  }



  return (
    <div className='shadow p-5 w-screen rounded-lg flex justify-center items-center h-screen'>
      <div className="section1 flex-1 rounded-l-lg shadow-lg hidden sm:flex flex-col justify-center h-full gap-5 p-3 bg-primary text-white">
        <Link href={"/"} className='font-bold mb-5 text-3xl tracking-tighter'>Kareerly</Link>
        <h1>

          Join the curated marketplace where top-tier talent meets innovative global opportunities. </h1>
        <p className='font-bold tracking-tighter text-5xl w-max-[40%]'>Welcome to Kareerly!<br /> Sign in to get started.</p>
        <div className="trusted-by bg-white/20 rounded p-3 flex justify-center gap-5 items-center mt-10">
          <ShieldCheck size={40} />
          <p className='font-bold'>Trusted by 1000+ industry leading professionals in Africa.</p>
        </div>
      </div>
      <div className="section2  flex-1 flex flex-col gap-5 p-5">
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
        <p className='font-bold text-xs text-center'>OR LOGIN WITH EMAIL</p>
        <Input label="ENTER EMAIL" type='email' placeholder='example@gmail.com' value={email} onChange={(e)=>setEmail(e)}></Input>
        <Input label="ENTER PASSWORD" type='password' placeholder='..........' value={password} onChange={(e) =>setPassword(e)}>
        </Input>
        {formError? <p className='text-error font-bold'>{formError}</p>: ""}
        <Button onclick={()=>{authenticateUser()}} variant={'primary'}>{ loading ? <Loader className='animate-spin'/> : "Login"}</Button>
        <p className='text-center'>Don't have an account yet? <Link href={'/signup'}><span className='text-primary underline '>create one</span></Link></p>
      </div>
    </div>
  )
}


export default Login
