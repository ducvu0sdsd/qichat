'use client'
import React, { useContext, useEffect } from 'react'
import UserIcon from '../userIcon'
import MessageUser from './messageUser'
import { ThemeContext } from '@/app/context'
import { MessagesContext } from './context'
import Link from 'next/link'

const LeftSection = () => {

    const { data, handler } = useContext(ThemeContext)
    const { listData, listHandler } = useContext(MessagesContext)

    return (
        <section className='w-[25%] h-screen border-[#e5e5e5] border-r-[1px]'>
            <div className='h-[10%] flex items-center w-full justify-start px-[15px] py-2 border-[#e5e5e5] border-b-[1px]'>
                <UserIcon avatar={data.user?.avatar} operating={data.user?.operating} />
                <div className='flex flex-col ml-[10px]'>
                    <span className='font-semibold text-[15px]'>{data.user?.fullName}</span>
                    <span className='font-semibold text-[12px]'>My Account</span>
                </div>
            </div>
            <div className='px-[15px] pt-[15px] h-[16%] overflow-hidden w-[100%]'>
                <h2 className='font-poppins font-semibold text-[16px]'>Online Now</h2>
                <div className='mt-2 flex gap-1 w-[100%] overflow-hidden'>
                    <div className='flex gap-1 w-[100%] overflow-x-auto'>
                        {listData.friendsOperation.length === 0 ?
                            <div className='flex w-full items-center justify-center font-poppins text-[14px] font-semibold'>
                                No One Online
                            </div>
                            :
                            <div className='flex'>
                                {listData.friendsOperation.map((friend, index) => (
                                    <UserIcon avatar={friend.avatar} operating={{ status: true }} key={index} />
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='px-[15px] h-[74%] py-[5px] overflow-hidden'>
                <div className='h-[15%]'>
                    <h2 className='font-poppins font-semibold text-[16px]'>Messages</h2>
                    <div className='relative'>
                        <input type='text' placeholder='Search' className='text-[14px] pl-[30px] pr-[10px] font-poppins w-full h-[35px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]' />
                        <i className='top-[57%] translate-y-[-50%] left-[8px] bx bx-search text-[#999] text-[19px] absolute'></i>
                    </div>
                </div>
                <div className='my-[10px] h-[85%] overflow-y-auto message'>
                    {listData.rooms.length === 0 ?
                        <div className='font-poppins w-full px-6 text-center h-full flex justify-center flex-col items-center'>
                            <span>There are no friends yet. Make friends to chat together!</span>
                            <Link href={'/adding'}><button style={{ backgroundImage: 'url(/bg.webp)' }} className='text-[14px] py-2 my-4 text-[white] rounded-md w-[170px]'>Add Friend</button></Link>
                        </div>
                        :
                        listData.rooms.map((room, index) => (
                            <MessageUser key={index} currentRoom={room} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default LeftSection