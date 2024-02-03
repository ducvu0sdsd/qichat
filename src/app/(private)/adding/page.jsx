'use client'
import dynamic from 'next/dynamic'
const VideoRoom = dynamic(() => import('@/components/call/videoRoom'), { ssr: false });
import React, { useState } from 'react'

const AddingPage = () => {
    const [joined, setJoined] = useState(false)

    return (
        <div className='w-full flex flex-col items-center justify-center h-screen' >
            {!joined && (<button onClick={() => setJoined(true)}>Join</button>)}
            {joined && (<VideoRoom setJoined={setJoined} />)}
        </div>
    )
}

export default AddingPage