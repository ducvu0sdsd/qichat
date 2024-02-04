'use client'
import dynamic from 'next/dynamic'
const VideoRoom = dynamic(() => import('@/components/call/videoRoom'), { ssr: false });
import React, { useState } from 'react'

const AddingPage = () => {

    return (
        <div className='w-full flex flex-col items-center justify-center h-screen' >

        </div>
    )
}

export default AddingPage