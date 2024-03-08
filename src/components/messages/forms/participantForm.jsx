import UserIcon from '@/components/userIcon'
import React from 'react'

const ParticipantForm = ({ participants }) => {
    return (
        <div style={{ height: participants.length === 0 ? '0' : '400px', width: participants.length === 0 ? '0' : '600px' }} className='z-50 fixed transition-all top-[50%] left-[50%] translate-x-[-50%] flex translate-y-[-50%] overflow-hidden rounded-xl bg-slate-50'>
            <div className='w-[50%] h-screen border-[#e5e5e5] border-r-[1px] p-6' >
                <span className='font-semibold text-[20]'>12 Participants</span>
                <div className='relative'>
                    <input type='text' placeholder='Search' className='text-[10px] pl-[30px] pr-[10px] font-poppins w-[250px] h-[33px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]' />
                    <i className='top-[57%] translate-y-[-50%] left-[8px] bx bx-search text-[#999] text-[15px] absolute'></i>
                </div>

                <div className='my-5 '>
                    <div className='flex gap-2 items-center my-2' >
                        <UserIcon />
                        <span className='text-[14px] font-semibold'>Vu Tien Duc</span>
                    </div>
                    <div className='flex gap-2 items-center my-2' >
                        <UserIcon />
                        <span className='text-[14px] font-semibold' >Vu Tien Duc</span>
                    </div>
                    <div className='flex gap-2 items-center my-2' >
                        <UserIcon />
                        <span className='text-[14px] font-semibold'>Vu Tien Duc</span>
                    </div>

                </div>
            </div>
            <div className='w-[50%] h-screen p-4 ' >
                <div className='relative mb-3'>
                    <input type='text' placeholder='Search' className='text-[10px] pl-[30px] pr-[10px] font-poppins w-[250px] h-[33px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]' />
                    <i className='top-[57%] translate-y-[-50%] left-[8px] bx bx-search text-[#999] text-[15px] absolute'></i>
                </div>
                <span className='font-semibold'>People</span>
                <div className='my-2 '>
                    <div className='flex gap-2 items-center  my-2 justify-between' >
                        <div className='flex items-center gap-2 justify-center '>
                            <UserIcon />
                            <span className='text-[14px] font-semibold '>Vu Tien Duc</span>
                        </div>
                        <div className=''>
                            <button className='text-[10px] font-poppins py-[2px] font-semibold px-2 border-[green] border-[2px] rounded-lg text-[green]'>Add</button>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center  my-2 justify-between' >
                        <div className='flex items-center gap-2 justify-center '>
                            <UserIcon />
                            <span className='text-[14px] font-semibold '>Vu Tien Duc</span>
                        </div>
                        <div className=''>
                            <button className='text-[10px] font-poppins py-[2px] font-semibold px-2 border-[green] border-[2px] rounded-lg text-[green]'>Add</button>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center  my-2 justify-between' >
                        <div className='flex items-center gap-2 justify-center '>
                            <UserIcon />
                            <span className='text-[14px] font-semibold '>Vu Tien Duc</span>
                        </div>
                        <div className=''>
                            <button className='text-[10px] font-poppins py-[2px] font-semibold px-2 border-[green] border-[2px] rounded-lg text-[green]'>Add</button>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center  my-2 justify-between' >
                        <div className='flex items-center gap-2 justify-center '>
                            <UserIcon />
                            <span className='text-[14px] font-semibold '>Vu Tien Duc</span>
                        </div>
                        <div className=''>
                            <button className='text-[10px] font-poppins py-[2px] font-semibold px-2 border-[green] border-[2px] rounded-lg text-[green]'>Add</button>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center  my-2 justify-between' >
                        <div className='flex items-center gap-2 justify-center '>
                            <UserIcon />
                            <span className='text-[14px] font-semibold '>Vu Tien Duc</span>
                        </div>
                        <div className=''>
                            <button className='text-[10px] font-poppins py-[2px] font-semibold px-2 border-[green] border-[2px] rounded-lg text-[green]'>Add</button>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center  my-2 justify-between' >
                        <div className='flex items-center gap-2 justify-center '>
                            <UserIcon />
                            <span className='text-[14px] font-semibold '>Vu Tien Duc</span>
                        </div>
                        <div className=''>
                            <button className='text-[10px] font-poppins py-[2px] font-semibold px-2 border-[green] border-[2px] rounded-lg text-[green]'>Add</button>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default ParticipantForm