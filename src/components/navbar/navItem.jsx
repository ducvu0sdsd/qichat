'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const NavItem = ({ icon, path, type }) => {
    const pathname = usePathname()
    const router = useRouter()

    const navigate = () => {
        if (type === 'sign-out') {
            globalThis.window.localStorage.removeItem('accessToken')
            globalThis.window.localStorage.removeItem('refreshToken')
            globalThis.window.localStorage.removeItem('user_id')
            globalThis.window.localStorage.removeItem('admin')
        }
        router.push(`${path}`)
    }

    return (
        <div onClick={() => navigate()} style={{ backgroundImage: pathname === path ? 'url(/bg-vuong.png)' : '' }} className=' cursor-pointer transition-all flex items-center justify-center rounded-full h-[40px] w-[40px] my-[1px]'>
            <i className={`bx ${icon} transition-all z-10 text-[25px] ${pathname === path ? 'text-[white]' : 'text-[#4e4e4e]'}`}></i>
        </div>
    )
}

export default NavItem