'use client'
import { ThemeContext } from '@/app/context'
import { baseURL } from '@/utils/api'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { io } from 'socket.io-client'
const socket = io.connect(baseURL)

const NavItem = ({ icon, path, type }) => {
    const pathname = usePathname()
    const router = useRouter()
    const { data } = useContext(ThemeContext)

    const navigate = () => {
        if (type === 'sign-out') {
            socket.emit('close_operating', { _id: data.user._id, operating: { status: false, time: new Date() } })
            socket.emit('update-room')
            globalThis.window.localStorage.removeItem('accessToken')
            globalThis.window.localStorage.removeItem('refreshToken')
            globalThis.window.localStorage.removeItem('user_id')
            globalThis.window.localStorage.removeItem('admin')
            router.push('/')
        } else {
            router.push(`${path}`)
        }
    }

    return (
        <div onClick={() => navigate()} style={{ backgroundImage: pathname === path ? 'url(/bg-vuong.png)' : '' }} className=' cursor-pointer transition-all flex items-center justify-center rounded-full h-[40px] w-[40px] my-[1px]'>
            <img src={icon} width={'70%'} />
        </div>
    )
}

export default NavItem