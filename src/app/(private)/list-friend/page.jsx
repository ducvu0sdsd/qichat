'use client'
import { ThemeContext } from '@/app/context'
import { layouts } from '@/components/adding/context'
import UserIcon from '@/components/userIcon'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const ListFriendPage = () => {
    const router = useRouter()
    const [friends, setFriends] = useState([])
    const { data } = useContext(ThemeContext)

    useEffect(() => {
        if (data.user)
            setFriends(data.user.friends)
    }, [data.user])

    return (
        <section>
            <div className='h-[10%] flex items-center w-full justify-between px-[2rem] py-2 border-[#e5e5e5] border-b-[1px]'>
                <div className='h-full flex items-center'>
                    <span className='font-bold text-[22px] font-poppins mr-[0.5rem]'>List Friend</span>
                    <img src='/icon-friend.png' width={'40px'} />
                </div>
                <i className='text-[25px] bx bx-plus' ></i>
            </div>
            <div className='w-full flex mt-[2rem] gap-[1rem] px-[2rem]'>
                <div className='relative'>
                    <input type='text' placeholder='Search' className='text-[14px] pl-[30px] pr-[10px] font-poppins w-[300px] h-[35px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]' />
                    <i className='top-[57%] translate-y-[-50%] left-[8px] bx bx-search text-[#999] text-[19px] absolute'></i>
                </div>
                <select className='text-[14px] pl-[10px] pr-[10px] font-poppins w-[300px] h-[35px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]'>
                    <option>A-Z</option>
                </select>
            </div>
            <div className='flex mt-[40px] relative w-[100%] flex-wrap gap-[1.5rem] px-[2rem]'>
                {friends.length === 0 ?
                    <div className='absolute flex gap-1 items-center flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                        <span>{"You don't have friends yet"}</span>
                        <button onClick={() => {
                            globalThis.window.localStorage.setItem('adding', layouts.ADD_FRIEND_PAGE)
                            router.push('/adding')
                        }} style={{ backgroundImage: 'url(/bg.webp)' }} className='w-[150px] text-[white] py-1 px-2 text-[13px] rounded-lg'>Add Friend Now</button>
                    </div>
                    :
                    friends.map((friend, index) => (
                        <div key={index} className='flex items-center '>
                            <UserIcon avatar={friend.avatar} />
                            <span className='font-semibold px-[10px] text-[14px]'>{friend.fullName}</span>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default ListFriendPage