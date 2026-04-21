"use client"
import React, { ReactNode } from 'react'



function Button({ variant = "primary", children }: { variant?: "primary" | "ghost" | "secondary", children: ReactNode}) {

   const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    ghost: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
   }

   
  return (
<button className={`flex items-center justify-center font-bold gap-2 px-4 py-2 rounded ${variants[variant]}`}>
    {children}
</button>
  )
}

export default Button
