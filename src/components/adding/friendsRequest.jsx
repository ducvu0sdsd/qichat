import React from 'react'
import UserIcon from '../userIcon'

const FriendsRequestPage = () => {
    return (
        <div className='w-[78%] h-screen border-[#e5e5e5] border-r-[1px]'>

            <div className='h-[10%] flex items-center w-full justify-start px-[25px] py-[17px] border-[#e5e5e5] border-b-[px]'>
                <i className='bx bx-user-check text-[30px] text-[#353535] mr-2'></i>
                <span className='font-poppins ml-2 text-[18px] font-bold'>Friends Request</span>
            </div>

            <div className=' h-full border-[#e5e5e5] border-t-[1px] py-4'>

                <span className='font-bold text-[20px] font-poppins px-8 '>
                    People
                </span>

                <div className='flex mt-[20px] w-[100%] flex-wrap overflow-y-auto h-[450px] content-start gap-[1.5rem] px-[2rem]'>
                    <div className='flex items-center'>
                        <UserIcon />
                        <span className='font-semibold px-[7px] '>Vu Tien Duc</span>
                        <i className='bx bx-check text-[22px] cursor-pointer'></i>
                        <i className='bx bx-x text-[22px] cursor-pointer'></i>
                    </div>
                    <div className='flex items-center'>
                        <UserIcon />
                        <span className='font-semibold px-[7px] '>Vu Tien Duc</span>
                        <i className='bx bx-check text-[22px] cursor-pointer'></i>
                        <i className='bx bx-x text-[22px] cursor-pointer'></i>
                    </div>
                    <div className='flex items-center'>
                        <UserIcon />
                        <span className='font-semibold px-[7px] '>Vu Tien Duc</span>
                        <i className='bx bx-check text-[22px] cursor-pointer'></i>
                        <i className='bx bx-x text-[22px] cursor-pointer'></i>
                    </div>
                    <div className='flex items-center'>
                        <UserIcon />
                        <span className='font-semibold px-[7px] '>Vu Tien Duc</span>
                        <i className='bx bx-check text-[22px] cursor-pointer'></i>
                        <i className='bx bx-x text-[22px] cursor-pointer'></i>
                    </div>
                    <div className='flex items-center'>
                        <UserIcon />
                        <span className='font-semibold px-[7px] '>Vu Tien Duc</span>
                        <i className='bx bx-check text-[22px] cursor-pointer'></i>
                        <i className='bx bx-x text-[22px] cursor-pointer'></i>
                    </div>
                    <div className='flex items-center'>
                        <UserIcon />
                        <span className='font-semibold px-[7px] '>Vu Tien Duc</span>
                        <i className='bx bx-check text-[22px] cursor-pointer'></i>
                        <i className='bx bx-x text-[22px] cursor-pointer'></i>
                    </div>
                    <div className='flex items-center'>
                        <UserIcon />
                        <span className='font-semibold px-[7px] '>Vu Tien Duc</span>
                        <i className='bx bx-check text-[22px] cursor-pointer'></i>
                        <i className='bx bx-x text-[22px] cursor-pointer'></i>
                    </div>
                    <div className='flex items-center'>
                        <UserIcon />
                        <span className='font-semibold px-[7px] '>Vu Tien Duc</span>
                        <i className='bx bx-check text-[22px] cursor-pointer'></i>
                        <i className='bx bx-x text-[22px] cursor-pointer'></i>
                    </div>
                    <div className='flex items-center'>
                        <UserIcon />
                        <span className='font-semibold px-[7px] '>Vu Tien Duc</span>
                        <i className='bx bx-check text-[22px] cursor-pointer'></i>
                        <i className='bx bx-x text-[22px] cursor-pointer'></i>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FriendsRequestPage