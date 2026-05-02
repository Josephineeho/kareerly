import React from 'react'
import Button from '../UI/Button'

function Ready() {
    return (
        <div className='flex flex-col gap-5 text-center bg-primary-container m-3 p-3 rounded-lg text-white'>
            <h1 className='font-black text-4xl'>Ready To Architect Your Career?</h1>
            <p className='font-bold'>Join thousands of professionals and companies building their future together <br /> Start your journey Today.</p>
            <div className="cta flex justify-center gap-7">
                <Button variant='ghost'>Start Career</Button>
                <Button variant='primary'>Start Hirring</Button>
            </div>

        </div>
    )
}

export default Ready

