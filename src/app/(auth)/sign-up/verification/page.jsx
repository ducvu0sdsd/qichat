import Logo from '@/components/logo'
import React from 'react'

const Verification = () => {
    return (
        <section className='w-[100%] flex font-poppins' >
            <div style={{ backgroundImage: 'url(/bg-dung.jpg)' }} className='w-[50%] flex items-center relative h-screen justify-center bg-cover' >
                <div className='flex items-center left-[2rem] absolute top-[2rem]'>
                    <Logo text={'white'} />
                </div>
                <div className='flex flex-col items-center text-[white] font-poppins'>
                    <h1 className='text-[white] font-bold text-[30px] leading-[60px] justify-center text-center '>Welcome Back!</h1>
                    <span>To keep connected with us</span>
                    <span>please sign in your personal info</span>
                    <button className=' border-[2px] mt-[20px] h-[40px] rounded-full text-[white] px-[80px] text-center '>Sign In</button>
                </div>
            </div>
            <div className='w-[50%] px-[80px] flex flex-col justify-center'>
                <h1 className='font-bold text-[25px] mb-[10px]'>Verification</h1>
                <span className='font-medium'>We sent a code to your Phone Number/ Gmai</span>
                <input type='text' placeholder='Enter OTP' className='focus:outline-0 px-[15px] mt-[15px] bg-[#f5f2f2] w-[500px] h-[45px] rounded-[5px] ' />

                <button type='submit' className='bg-[#e77373] w-[300px] h-[40px] rounded-[10px] text-[white] mt-[15px]'>Submit</button>
            </div>

        </section>
    )
}

export default Verification