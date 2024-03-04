'use client'
import { ThemeContext } from '@/app/context'
import { AuthContext } from '@/components/auth/context'
import { TypeHTTP, api } from '@/utils/api'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const EmailVerification = () => {
    const [verify, setVerify] = useState(false)
    const { listData, listHandler } = useContext(AuthContext);
    const { handler } = useContext(ThemeContext)

    useEffect(() => {
        const user_id = globalThis.window.localStorage.getItem('currentUser')
        api({ type: TypeHTTP.PUT, body: { statusSignUp: 'Complete Step 2' }, path: `/users/${user_id}`, sendToken: false })
            .then(res => {
                if (res) {
                    listHandler.setUser(res)
                    globalThis.window.localStorage.removeItem('currentEmail')
                    globalThis.window.localStorage.removeItem('currentUser')
                    handler.notify(notifyType.SUCCESS, 'Verify account successfully')
                    setVerify(true)
                }
            })
    }, [])

    return (
        <section className='h-screen w-full flex justify-center items-center'>
            {verify ?
                (<div className='flex flex-col items-center'>
                    <h2>Your Email verified</h2>
                    <Link href={'/sign-up/information'}>
                        <button className='px-2 py-1 bg-[black] text-[white]'>Next Step</button>
                    </Link>
                </div>)
                :
                (<>
                    <h2>Your email is being authenticated</h2>
                </>)
            }
        </section>
    )
}

export default EmailVerification