'use client'
import UserIcon from '@/components/userIcon'
import React, { useState } from 'react'

const AddingPage = () => {

    return (
        <section className='h-screen w-[100%] flex '>
            <div className='w-[22%] h-screen border-[#e5e5e5] border-r-[1px]'>
                <div className='h-[10%] flex items-center w-full justify-start px-[15px] py-2 border-[#e5e5e5] border-b-[1px]'>
                    <img src='/avatar.jpg' className='rounded-full h-[48px] w-[48px]' />
                    <div className='flex flex-col ml-[10px]'>
                        <span className='font-bold'>Vu Tien Duc</span>
                        <span className='font-semibold text-[13px]'>My Account</span>
                    </div>
                </div>
                <div className='px-[15px] pt-[15px] h-full overflow-hidden flex flex-col items-center w-[100%] border-t-[1px] '>
                    <button className='font-semibold bg-[#f3f2f2] my-[3px] w-[98%] justify-start px-[10px] font-poppins py-2 rounded-[8px] flex items-center'>
                        <i className='bx bx-user-plus text-[30px] text-[#353535] mr-2'></i>
                        <span className='text-[#353535] text-[15px]'>Add Friends</span>
                    </button>
                    <button className='font-semibold bg-[#f3f2f2] my-[3px] w-[98%] justify-start px-[10px] font-poppins py-2 rounded-[8px] flex items-center'>
                        <i className='bx bx-group text-[30px] text-[#353535] mr-2'></i>
                        <span className='text-[#353535] text-[15px]'>Create Group</span>
                    </button>
                    <button className='font-semibold bg-[#f3f2f2] my-[3px] w-[98%] justify-start px-[10px] font-poppins py-2 rounded-[8px] flex items-center'>
                        <i className='bx bx-user-check text-[30px] text-[#353535] mr-2'></i>
                        <span className='text-[#353535] text-[15px]'>Friends Request</span>
                    </button>
                </div>
            </div>
            <div className='w-[78%] h-screen border-[#e5e5e5] border-r-[1px]'>
                <div className='h-[10%] flex items-center w-full justify-start px-[25px] py-[17px] border-[#e5e5e5] border-b-[px]'>
                    <i className='bx bx-group text-[30px]'></i>
                    <span className='font-poppins ml-2 text-[18px] font-bold'>Create Group</span>
                </div>
                <div className=' h-full  w-[100%] border-[#e5e5e5] border-t-[1px] flex'>
                    <div className='w-[70%] flex flex-col items-center pt-[1.5rem]'>
                        <div className='relative'>
                            <img src='/avatar.jpg' className='rounded-full h-[150px] w-[150px]' />
                            <i className='bx bx-pencil top-[0rem] right-0 text-[22px] text-[#5f5f5f] absolute' ></i>
                        </div>
                        <div className='relative mt-[1rem]'>
                            <input type='text' placeholder='Group Name' className='text-[14px] w-[300px] pl-[30px] pr-[10px] font-poppins h-[35px] focus:outline-0 rounded-md border-[#cacaca] border-[1px]' />
                            <i className='top-[50%] translate-y-[-50%] left-[8px] bx bx-pencil text-[#999] text-[19px] absolute'></i>
                        </div>
                        <div className='mt-[1.5rem] w-full'>
                            <span className='font-bold ml-[45px] text-[18px] font-poppins'>
                                Participants(3)
                            </span>
                            <div className='mt-[1rem] px-[2rem] grid grid-cols-3 justify-items-center gap-3'>
                                <div className='flex items-center '>
                                    <UserIcon />
                                    <span className='font-bold px-[10px] '>Vu Tien Duc</span>
                                </div>
                                <div className='flex items-center '>
                                    <UserIcon />
                                    <span className='font-bold px-[10px] '>Vu Tien Duc</span>
                                </div>
                                <div className='flex items-center '>
                                    <UserIcon />
                                    <span className='font-bold px-[10px] '>Vu Tien Duc</span>
                                </div>
                                <div className='flex items-center '>
                                    <UserIcon />
                                    <span className='font-bold px-[10px] '>Vu Tien Duc</span>
                                </div>
                                <div className='flex items-center '>
                                    <UserIcon />
                                    <span className='font-bold px-[10px] '>Vu Tien Duc</span>
                                </div>
                                <div className='flex items-center '>
                                    <UserIcon />
                                    <span className='font-bold px-[10px] '>Vu Tien Duc</span>
                                </div>
                                <div className='flex items-center '>
                                    <UserIcon />
                                    <span className='font-bold px-[10px] '>Vu Tien Duc</span>
                                </div>
                            </div>
                        </div>
                        <button style={{ backgroundImage: 'url(/bg.webp)', backgroundSize: 'cover' }} className='rounded-md text-[white] font-poppins w-[100px] h-[35px] mt-[10px] shadow'>Create</button>
                    </div>
                    <div className='h-[100%] px-[1rem] border-l-[1px] w-[30%] flex flex-col items-center'>
                        <div className='relative w-full mt-[1rem]'>
                            <input type='text' placeholder='Search' className='text-[14px] pl-[30px] pr-[10px] font-poppins w-full h-[35px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]' />
                            <i className='top-[57%] translate-y-[-50%] left-[8px] bx bx-search text-[#999] text-[19px] absolute'></i>
                        </div>
                        <span className='font-bold mt-[15px] text-[18px] mb-2 font-poppins w-[100%] '>
                            People
                        </span>
                        <div className='w-full'>
                            <div className='flex justify-between w-full my-1 items-center'>
                                <div className='flex items-center '>
                                    <UserIcon />
                                    <span className='font-bold px-[10px] '>Vu Tien Duc</span>
                                </div>
                                <span className='text-[30px]'>+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddingPage