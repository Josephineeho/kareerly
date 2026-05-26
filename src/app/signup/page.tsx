"use client"
import React, { useState } from 'react'
import { signUp } from "../../services/auth";
import Link from 'next/link';
import Input from '../components/UI/Input';
import { InfoIcon } from 'lucide-react';
import Button from '../components/UI/Button';
import { useRouter } from 'next/navigation';

const name: "openair" | "sms" = "openair";


function page() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [confirmPassword, setConfirmPassword] = useState("");


  // Employer fields
  const [employerEmail, setEmployerEmail] = React.useState('');
  const [employerPassword, setEmployerPassword] = React.useState('');
  const [employerFullName, setEmployerFullName] = React.useState('');
  const [employerConfirmPassword, setEmployerConfirmPassword] = useState("");
  const [employerCompanyName, setEmployerCompanyName] = useState("")
  const [employerIndustry, setEmployerIndustry] = useState("")

  const [role, setRole] = React.useState('seeker');
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = useState<"seeker" | "employer">("seeker");
  const router = useRouter();
  const activeTabStyle = "bg-white text-primary font-bold rounded-full";

  const handleSignUp = async () => {
    setLoading(true);
    if (role == "seeker"){
     const signUpResult = await signUp(email, password, fullName, role)
     if(signUpResult.error){
      console.log()
    }else{
      router.push("/dashboard")
    }

    } else{
      const signUpResult = await signUp(employerCompanyName, employerEmail, employerFullName, employerIndustry, employerPassword)
    }
    
  }
  return (
    <div className='w-screen shadow-2xl h-screen flex p-5 '>
      <div className="section1 overflow-y-hidden rounded-2xl flex-1 hidden sm:flex sm:flex-col justify-center bg-primary text-white p-5" >
        <Link className='mb-10 font-bold text-2xl' href={"/"}>Kareerly</Link>
        <h1 className='text-5xl tracking-tighter  font-bold'>Design your professional future with editorial precision.</h1>
        <p className='mt-5 text-sm'>Join an elite network of talent and industry leaders. Wheter you're seeking your next milestone or building a world-class team, start here.</p>
        <div className="stats flex justify-center gap-2 md:gap-10 mt-8">
          <div className="stats1 flex-1 bg-white/20 rounded p-2">
            <h3 className='font-bold text-2xl'>1K+</h3>
            <p className='text-sm'>ACTIVE JOBS</p>
          </div>
          <div className="stats2 flex-1 bg-white/20 rounded p-2">
            <h3 className='font-bold text-2xl'>100+</h3>
            <p  className='text-sm'>TOP EMPLOYERS</p>
          </div>
        </div>
      </div>
      <div className="section2 overflow-y-scroll flex-1 p-5 flex flex-col">
        <h2 className='font-bold text-2xl mb-1.5 mt-5'>Create your account</h2>
        <p className='text-text-muted'>step into a curated career experience.</p>
        <div className="toggle bg-surface-container-highest my-5 rounded-full p-1 flex w-full items-center">

          <div onClick={() => setActiveTab("seeker")} className={`job-seeker cursor-pointer  ${activeTab == "seeker" && activeTabStyle} flex-1 text-center`}>Job Seeker</div>
          <div onClick={() => setActiveTab("employer")} className={`employer flex-1 text-center cursor-pointer ${activeTab == "employer" && activeTabStyle}`}>Employer</div>
        </div>
        <div className={`employee-form ${activeTab == "employer" && 'hidden'}`}>
          <Input label='Full Name' onChange={(e) => {setFullName(e) }} value={fullName} type='string' placeholder='John Doe' />
          <Input label='Email Address' onChange={(e) => { setEmail(e)}} value={email} type='email' placeholder='john.doe@example.com' />
          <Input label='Password' onChange={(e) => {setPassword(e) }} value={password} type='password' placeholder='••••••••' />
          <Input label='Confirm Password' onChange={(e) => {setConfirmPassword(e) }} value={confirmPassword} type='password' placeholder='••••••••' />

        </div>
        <div className={`employers-form ${activeTab == "seeker" && 'hidden'}`}>
          <Input label='Full Name' onChange={(e) => { setEmployerFullName(e)}} value={employerFullName} type='string' placeholder='John Doe' />
          <Input label='Company Name' onChange={(e) => { setEmployerCompanyName(e)}} value={employerCompanyName} type='string' placeholder='Acme Inc.' />
          <Input label='Work Email' onChange={(e) => { setEmployerEmail(e)}} value={employerEmail} type='email' placeholder='john.doe@example.com' />
          <Input label='Industry' onChange={(e) => { setEmployerIndustry(e)}} value={employerIndustry} type='string' placeholder='Technology' />
          <Input label='Password' onChange={(e) => { setEmployerPassword(e)}} value={employerPassword} type='password' placeholder='••••••••' />
          <Input label='Confirm Password' onChange={(e) => { setEmployerConfirmPassword(e)}} value={employerConfirmPassword} type='password' placeholder='••••••••' />

        </div>
        <p className='flex gap-2 items-center text-sm text-text-muted'><InfoIcon size={16} /> At least 8 characters with a number and a symbol.</p>
        <p className='my-6 text-sm text-text-muted'> <input type="checkbox" /> I agree to the <Link href='/terms' className='text-primary font-bold'>Terms of Service</Link> and <Link className='text-primary font-bold' href='/privacy'>Privacy Policy</Link>. </p>
        <Button variant='primary' onclick={() => { handleSignUp(email, password, fullName, role, company_name) }} >Create Account</Button>
        <p className='text-center m-3 font-bold text-text-muted'>or continue with</p>
        <div className="socials-login flex justify-center gap-10">
          <Button variant='ghost'>
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            <h1>Google</h1>
          </Button>
          <Button variant="ghost">
            <img src="https://www.github.com/favicon.ico" className="w-4 h-4" alt="Github" />
            <h1>GitHub</h1>
          </Button>
        </div>
        <p className='text-center text-sm text-muted mt-5'>Already have an account? <Link href="/login" className='text-primary font-bold'> Login here</Link></p>
      </div>

    </div>
  )
}

export default page
