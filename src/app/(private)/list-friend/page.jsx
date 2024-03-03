'use client'
import { ThemeContext } from '@/app/context'
import UserIcon from '@/components/userIcon'
import React, { useContext, useEffect, useState } from 'react'

const ListFriendPage = () => {
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
                    <i className='text-[25px] bx bx-user-plus'></i>
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
            <div className='flex mt-[40px] w-[100%] flex-wrap gap-[1.5rem] px-[2rem]'>
                {friends.map((friend, index) => (
                    <div key={index} className='flex items-center '>
                        <UserIcon avatar={friend.avatar} />
                        <span className='font-semibold px-[10px] '>{friend.fullName}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ListFriendPage