'use client'
import Logo from '@/components/logo'
import { TypeHTTP, api } from '@/utils/api'
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/auth/context';
import { formatPhoneByFireBase } from '@/utils/call';
import { ThemeContext } from '@/app/context';
import { signWithGoogle } from '@/components/firebase/firebase';

const SignIn = () => {
    const { listData, listHandler } = useContext(AuthContext)
    const { handler } = useContext(ThemeContext)
    const router = useRouter();
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        api({ body: { phone: formatPhoneByFireBase(phone), password }, path: '/sign-in', type: TypeHTTP.POST, sendToken: false })
            .then(res => {
                listHandler.setUser(res.user)
                if (res?.user.statusSignUp === 'Complete Step 1') {
                    router.push('/sign-up/verification')
                } else if (res?.user.statusSignUp === 'Complete Step 2') {
                    router.push('/sign-up/information')
                } else if (res?.user.statusSignUp === 'Complete Sign Up') {
                    globalThis.window.localStorage.setItem('accessToken', res?.tokens.accessToken)
                    globalThis.window.localStorage.setItem('refreshToken', res?.tokens.refreshToken)
                    globalThis.window.localStorage.setItem('user_id', res?.user._id)
                    globalThis.window.localStorage.setItem('admin', res?.user.admin)
                    handler.setUser(res?.user)
                    router.push('/messages')
                }
            })
            .catch(error => console.log(error))
    }

    const handleSignInWithGoogle = () => {
        signWithGoogle('sign-in')
            .then(res => {
                listHandler.setUser(res.user)
                if (res?.user.statusSignUp === 'Complete Step 1') {
                    router.push('/sign-up/verification')
                } else if (res?.user.statusSignUp === 'Complete Step 2') {
                    router.push('/sign-up/information')
                } else if (res?.user.statusSignUp === 'Complete Sign Up') {
                    globalThis.window.localStorage.setItem('accessToken', res?.tokens.accessToken)
                    globalThis.window.localStorage.setItem('refreshToken', res?.tokens.refreshToken)
                    globalThis.window.localStorage.setItem('user_id', res?.user._id)
                    globalThis.window.localStorage.setItem('admin', res?.user.admin)
                    handler.setUser(res?.user)
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
                    <button onClick={() => handleSignInWithGoogle()} className='font-bold w-[300px] h-[40px] border-[2px] text-[#353535] rounded-[10px]'> <i className='bx bxl-gmail text-[20px] mr-1 translate-y-[1px]'></i>  Sign in with Gmail</button>
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