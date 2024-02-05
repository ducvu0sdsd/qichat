import React from 'react'
import NavItem from './navItem'
import Link from 'next/link'

const PrivateNavbar = () => {
    return (
        <div className='py-[10px] shadow-xl flex flex-col items-center justify-between w-[60px] border-[#e5e5e5] border-r-[1px] h-screen'>
            <div className='flex-col items-center flex'>
                <img src='/logo.png' width={'55px'} className='my-[7px]' />
                <NavItem icon={'bx-chat'} path={'/messages'} />
                <NavItem icon={'bx-user'} path={'/list-friend'} />
                <NavItem icon={'bx-group'} path={'/list-group'} />
                <NavItem icon={'bx-plus'} path={'/adding'} />
                <NavItem icon={'bx-moon'} />
                <NavItem icon={'bx-exit'} />
            </div>
            <Link href={'/editing-profile'} className='flex justify-center'><img src='/avatar.jpg' className='rounded-full w-[80%]' /></Link>
        </div>
    )
}

export default PrivateNavbar