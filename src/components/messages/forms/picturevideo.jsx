import React from 'react'

const Picturevideo = ({ picturevideos }) => {
    return (
        <div style={{ height: picturevideos.length === 0 ? '0' : '500px', width: picturevideos.length === 0 ? '0' : 'auto' }} className='z-50 fixed transition-all top-[50%] left-[50%] translate-x-[-50%] flex translate-y-[-50%] overflow-hidden rounded-xl bg-slate-50'>
            <div className='row'>
                <div className='p-4'>
                    <span className='font-semibold'>Pictures & Videos (233 items)</span>
                </div>
                <div className=' grid grid-cols-5 gap-3 row w-100% h-400px justify-center px-3'>
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                    <img src='avatar.jpg' className='w-[100px] h-[100px] rounded-lg' />
                </div>

            </div>
        </div>
    )
}

export default Picturevideo