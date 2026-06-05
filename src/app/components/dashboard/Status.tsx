import React from 'react'

function Status({num, text}: {num:number, text: string}) {
  return (
    <div className=' rounded bg-secondary-container p-4 flex flex-col items-center gap-2'>
    <h3 className='text-secondary'>{num}</h3>
    <p className='text-sm uppercase'>{text}</p>
    </div>
  )
}

export default Status
