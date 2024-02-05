import Input from '@/components/editing-profile/input'
import React from 'react'

const EditingProfile = () => {
    return (
        <section className='overflow-y-auto h-screen pb-[2rem]'>
            <div className='w-full relative flex items-center justify-center'>
                <img className='w-full' src='/background-avatar.png' />
                <div className='h-[130px] w-[130px] absolute left-[3rem] translate-y-[50%] bottom-0'>
                    <img className='rounded-full h-[100%] w-[100%]' src='/avatar.jpg' />
                    <div className='flex flex-col absolute right-[-140px] bottom-0'>
                        <span className='text-[20px] font-semibold'>Vu Tien Duc</span>
                        <span className='text-[14px]'>369 Friends</span>
                    </div>
                    <i className='bx bx-pencil text-[25px] absolute right-[-5px] cursor-pointer bottom-[-5px]'></i>
                </div>
            </div>
            <div className='w-full flex justify-end px-[2rem] py-[1rem]'>
                <button style={{ backgroundImage: 'url(/bg.webp)', backgroundSize: 'cover' }} className='rounded-md text-[white] font-poppins w-[100px] h-[35px] mt-[5px] shadow'>Change</button>
            </div>
            <div className='w-full px-[12rem] pt-[2rem]'>
                <h2 className='text-[21px] font-semibold font-poppins'>Information</h2>
                <div className='mt-[1rem] px-[2rem] grid grid-cols-2'>
                    <Input title={'FullName'} />
                    <Input title={'Date Of Birth'} />
                    <Input title={'Phone'} />
                    <Input title={'Email'} />
                    <div className='flex flex-col mb-[10px]'>
                        <span className='mb-1 text-[15px] font-poppins'>Bio</span>
                        <textarea className='p-[10px] w-[320px] h-[200px] focus:outline-0 border-[#999] border-[1px] rounded-md' />
                    </div>
                </div>
            </div>
            <div className='w-full px-[12rem] pt-[2rem]'>
                <h2 className='text-[21px] font-semibold font-poppins'>Change Password</h2>
                <div className='mt-[1rem] px-[2rem] grid grid-cols-2'>
                    <Input title={'Current Password'} />
                    <Input title={'New Password'} />
                    <Input title={'Confirm Password'} />
                    <div />
                    <button style={{ backgroundImage: 'url(/bg.webp)', backgroundSize: 'cover' }} className='rounded-md text-[white] font-poppins w-[100px] h-[35px] text-[15px] mt-[5px] shadow'>Change</button>
                </div>
            </div>
        </section>
    )
}

export default EditingProfile