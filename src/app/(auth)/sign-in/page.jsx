'use client'
import Logo from '@/components/logo'
import { TypeHTTP, api } from '@/utils/api'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const router = useRouter();
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        api({ body: { phone, password }, path: '/sign-in', type: TypeHTTP.GET, sendToken: false })
            .then(res => {
                if (res.statusSignUp === 'Complete Step 1') {
                    router.push('/sign-up/verification')
                } else if (res.statusSignUp === 'Complete Step 2') {
                    router.push('/sign-up/information')
                } else if (res.statusSignUp === 'Complete Sign Up') {
                    router.push('/messages')
                }
            })
    }

    return (
        <div className='h-screen w-[100%] flex pl-[4rem]' >
            <div className='w-[55%] h-full' >
                <div className='flex py-[2rem]'>
                    <Logo text={'black'} />
                </div>
                <div className='flex flex-col items-start gap-4 h-full font-poppins'>
                    <h1 className='text-[#120505] font-bold text-[25px] py-[1rem]'>Sign In</h1>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" placeholder='Phone' className='focus:outline-0 bg-[#f3f3f3] shadow-sm w-[80%] h-[50px] rounded-[10px] px-6' />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='focus:outline-0 bg-[#f3f3f3] shadow-sm w-[80%] h-[50px] rounded-[10px] px-6' />
                    <button className='font-bold text-[15px]'>Forgot password ?</button>
                    <button onClick={() => handleSignIn()} className='bg-[#e77373] w-[300px] h-[40px] rounded-[10px] text-[white]'>Sign in</button>
                    <span className='font-bold'>Or</span>
                    <button className='font-bold w-[300px] h-[40px] border-[2px] text-[#353535] rounded-[10px]'> <i className='bx bxl-gmail text-[20px] mr-1 translate-y-[1px]'></i>  Sign in with Gmail</button>
                </div>
            </div>
            <div style={{ backgroundImage: 'url(/bg-dung.jpg)' }} className='bg-[rgb(214,114,114)] font-poppins rounded-lg px-[4rem] flex items-center justify-center h-screen bg-cover w-[50%]'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-[35px] text-[white]'>Hello, Friend!</h1>
                    <span className='text-[white] mt-[10px]'>Enter your personal information </span>
                    <span className='text-[white] mb-[20px]'>and start the experience</span>
                    <button className='text-[white] font-medium w-[350px] h-[45px] border-[3px] rounded-[10px]'>Create an account</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn