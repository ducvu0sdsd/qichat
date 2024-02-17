import React from 'react'
import UserIcon from '../userIcon'

const CreateGroupPage = () => {
    return (
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
    )
}

export default CreateGroupPage