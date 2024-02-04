import React, { useEffect, useRef, useState } from 'react'

const InformationArea = () => {

    const imageRef = useRef()
    const [load, setLoad] = useState(false)
    useEffect(() => setLoad(!load), [imageRef.current, globalThis.window.offsetWidth])

    return (
        <div className='w-[35%] px-[1rem] h-screen flex flex-col py-[1rem]'>
            <div className='w-full flex flex-col items-center gap-2'>
                <img src='/avatar.jpg' className='rounded-full w-[100px] h-[100px]' />
                <div className='flex flex-col items-center'>
                    <span className='text-[19px] font-semibold'>Vu Tien Duc</span>
                    <span className='text-[13px] font-semibold'>In Operation</span>
                </div>
            </div>
            <div className='my-[0.5rem] flex flex-col items-center'>
                <h2 className='w-full font-semibold font-poppins text-[18px]'>Attachments</h2>
                <div className='w-full flex items-center gap-2 font-poppins pl-[1rem]'>
                    <i className="fa-solid fa-paperclip text-[20px] text-[#606060]"></i>
                    <span className='text-[15px] my-[4px]'>qiflix - watching free.rar</span>
                </div>
                <div className='w-full flex items-center gap-2 font-poppins pl-[1rem]'>
                    <i className="fa-solid fa-paperclip text-[20px] text-[#606060]"></i>
                    <span className='text-[15px] my-[4px]'>qiflix - watching free.rar</span>
                </div>
                <div className='w-full flex items-center gap-2 font-poppins pl-[1rem]'>
                    <i className="fa-solid fa-paperclip text-[20px] text-[#606060]"></i>
                    <span className='text-[15px] my-[4px]'>qiflix - watching free.rar</span>
                </div>
                <button style={{ backgroundImage: 'url(/bg.webp)' }} className='rounded-md text-[white] font-poppins w-[80%] h-[35px] mt-[5px] shadow'>See All</button>
            </div>
            <div className='mt-[0.5rem] flex flex-col items-center'>
                <h2 className='w-full font-semibold font-poppins text-[18px]'>Pictures & Videos</h2>
                <div className='w-full grid grid-cols-4 my-[10px] gap-1 px-[1rem] justify-items-center'>
                    <div ref={imageRef} style={{ backgroundImage: 'url(/bg.webp)', height: `${imageRef.current?.offsetWidth}px` }} className='w-full rounded-md' />
                    <div style={{ backgroundImage: 'url(/bg.webp)', height: `${imageRef.current?.offsetWidth}px` }} className='w-full rounded-md' />
                    <div style={{ backgroundImage: 'url(/bg.webp)', height: `${imageRef.current?.offsetWidth}px` }} className='w-full rounded-md' />
                    <div style={{ backgroundImage: 'url(/bg.webp)', height: `${imageRef.current?.offsetWidth}px` }} className='w-full rounded-md' />
                    <div style={{ backgroundImage: 'url(/bg.webp)', height: `${imageRef.current?.offsetWidth}px` }} className='w-full rounded-md' />
                    <div style={{ backgroundImage: 'url(/bg.webp)', height: `${imageRef.current?.offsetWidth}px` }} className='w-full rounded-md' />
                    <div style={{ backgroundImage: 'url(/bg.webp)', height: `${imageRef.current?.offsetWidth}px` }} className='w-full rounded-md' />
                    <div style={{ backgroundImage: 'url(/bg.webp)', height: `${imageRef.current?.offsetWidth}px` }} className='w-full rounded-md' />
                </div>
                <button style={{ backgroundImage: 'url(/bg.webp)' }} className='rounded-md text-[white] font-poppins w-[80%] h-[35px] mt-[5px] shadow'>See All</button>
            </div>
        </div>
    )
}

export default InformationArea