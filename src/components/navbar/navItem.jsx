'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItem = ({ icon, path }) => {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <Link href={`${path}`}>
            <div style={{ backgroundImage: pathname === path ? 'url(/bg-vuong.png)' : '' }} className=' cursor-pointer transition-all flex items-center justify-center rounded-full h-[45px] w-[45px] my-[1px]'>
                <i className={`bx ${icon} transition-all z-10 text-[26px] ${pathname === path ? 'text-[white]' : 'text-[#4e4e4e]'}`}></i>
            </div>
        </Link>
    )
}

export default NavItem