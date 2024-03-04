'use client'
import React, { useContext } from 'react'
import NavItem from './navItem'
import Link from 'next/link'
import { ThemeContext } from '@/app/context'
import UserIcon from '../userIcon'

const PrivateNavbar = () => {

    const { data, handler } = useContext(ThemeContext)

    return (
        <div className='py-[10px] shadow-xl flex flex-col items-center justify-between w-[60px] border-[#e5e5e5] border-r-[1px] h-screen'>
            <div className='flex-col items-center flex'>
                <img src='/logo.png' width={'55px'} className='my-[7px]' />
                <NavItem icon={'/icon-message.png'} path={'/messages'} />
                <NavItem icon={'/icon-friend.png'} path={'/list-friend'} />
                <NavItem icon={'/icon-friends.png'} path={'/list-group'} />
                <NavItem icon={'/icon-adding.png'} path={'/adding'} />
                <NavItem icon={'/icon-moon.png'} />
                <NavItem icon={'/icon-logout.png'} path={'/'} type={'sign-out'} />
            </div>
            <Link href={'/editing-profile'} className='flex justify-center'>
                <UserIcon avatar={data.user?.avatar} operating={data.user?.operating} />
            </Link>
        </div>
    )
}

export default PrivateNavbar