import React from 'react'
import UserIcon from '../userIcon'
import MessageUser from './messageUser'

const LeftSection = () => {
    return (
        <section className='w-[25%] h-screen border-[#e5e5e5] border-r-[1px]'>
            <div className='h-[10%] flex items-center w-full justify-start px-[15px] py-2 border-[#e5e5e5] border-b-[1px]'>
                <img src='/avatar.jpg' className='rounded-full h-[48px] w-[48px]' />
                <div className='flex flex-col ml-[10px]'>
                    <span className='font-bold'>Vu Tien Duc</span>
                    <span className='font-semibold text-[13px]'>My Account</span>
                </div>
            </div>
            <div className='px-[15px] pt-[15px] h-[16%] overflow-hidden w-[100%]'>
                <h2 className='font-poppins font-semibold text-[16px]'>Online Now</h2>
                <div className='mt-2 flex gap-1 w-[100%] overflow-hidden'>
                    <div className='flex gap-1 w-[100%] overflow-x-auto'>
                        <div className='flex'>
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                            <UserIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-[15px] h-[74%] py-[5px] overflow-hidden'>
                <div className='h-[15%]'>
                    <h2 className='font-poppins font-semibold text-[16px]'>Messages</h2>
                    <div className='relative'>
                        <input type='text' placeholder='Search' className='text-[14px] pl-[30px] pr-[10px] font-poppins w-full h-[35px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]' />
                        <i className='top-[57%] translate-y-[-50%] left-[8px] bx bx-search text-[#999] text-[19px] absolute'></i>
                    </div>
                </div>
                <div className='py-[5px] h-[85%] overflow-y-auto message'>
                    <MessageUser />
                    <MessageUser />
                    <MessageUser />
                    <MessageUser />
                    <MessageUser />
                    <MessageUser />
                    <MessageUser />
                    <MessageUser />
                    <MessageUser />
                    <MessageUser />
                    <MessageUser />
                    <MessageUser />
                </div>
            </div>
        </section>
    )
}

export default LeftSection