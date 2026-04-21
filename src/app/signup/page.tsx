"use client"
import React from 'react'
import { signUp } from "../../services/auth";

function page() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [role, setRole] = React.useState('job_seeker');
  const [loading, setLoading] = React.useState(false);

  const handleSignUp = async (email: string, password: string, fullName: string, role: string  ) => {
    setLoading(true);
    const data = await signUp(email, password, fullName, role);
    console.log(data);
    setLoading(false);
  }

  return (
    <div>
        <div className="form">
          <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='Enter Password' onChange={(e)=> setPassword(e.target.value)}/>
          <input type="text" placeholder='Enter Full Name' onChange={(e)=> setFullName(e.target.value)}/>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          <button onClick={()=>handleSignUp(email, password, fullName, role)} disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </div>
    </div>
  )
}

export default page
