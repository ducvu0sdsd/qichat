'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItem = ({ icon, path }) => {
    const pathname = usePathname()
    return (
        <Link href={`${path}`}>
            <div style={{ backgroundImage: pathname === path ? 'url(/bg-vuong.png)' : '' }} className=' cursor-pointer transition-all flex items-center justify-center rounded-full h-[40px] w-[40px] my-[1px]'>
                <i className={`bx ${icon} transition-all z-10 text-[25px] ${pathname === path ? 'text-[white]' : 'text-[#4e4e4e]'}`}></i>
            </div>
        </Link>
    )
}

export default NavItem