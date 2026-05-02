import React from 'react'

function Companies() {
 const companies:string[] =["BEAC", "MTN Cameroon", "Go Africa", "AppsTech"];


  return (
    
    <div className='bg-surface-container-highest flex flex-col items-center'>
      <h3 className='mb-2 font-bold mt-5 text-muted '>Trusted by companies in Africa </h3>
      <div className="companies mb-5 flex gap-10 text-muted ">
        {companies.map((comp)=> <p key={comp}>{comp}</p>)}
      </div>
    </div>
  )
}

export default Companies
