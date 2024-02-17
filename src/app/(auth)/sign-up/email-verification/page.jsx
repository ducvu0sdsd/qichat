'use client'
import { AuthContext } from '@/components/auth/context'
import { TypeHTTP, api } from '@/utils/api'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const EmailVerification = () => {
    const [verify, setVerify] = useState(false)
    const { listData, listHandler } = useContext(AuthContext);

    useEffect(() => {
        const user_id = globalThis.window.localStorage.getItem('currentUser')
        api({ type: TypeHTTP.PUT, body: { statusSignUp: 'Complete Step 2' }, path: `/users/${user_id}`, sendToken: false })
            .then(res => {
                if (res) {
                    listHandler.setUser(res)
                    globalThis.window.localStorage.removeItem('currentEmail')
                    globalThis.window.localStorage.removeItem('currentUser')
                    setVerify(true)
                }
            })
    }, [])

    return (
        <section className='h-screen w-full flex justify-center items-center'>
            {verify ?
                (<>
                    <h2>Your Email verified</h2>
                    <Link href={'/sign-up/information'}>
                        <button>Next Step</button>
                    </Link>
                </>)
                :
                (<>
                    <h2>Your email is being authenticated</h2>
                </>)
            }
        </section>
    )
}

export default EmailVerification