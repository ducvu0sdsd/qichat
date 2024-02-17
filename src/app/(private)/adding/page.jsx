'use client'
import AddFriendPage from '@/components/adding/addFriend'
import { AddingContext, layouts } from '@/components/adding/context'
import CreateGroupPage from '@/components/adding/createGroup'
import FriendsRequestPage from '@/components/adding/friendsRequest'
import React, { useContext, useState } from 'react'

const AddingPage = () => {

    const { listData, listHandler } = useContext(AddingContext)

    return (
        <section className='h-screen w-[100%] flex '>
            <div className='w-[22%] h-screen border-[#e5e5e5] border-r-[1px]'>
                <div className='h-[10%] flex items-center w-full justify-start px-[15px] py-2 border-[#e5e5e5] border-b-[1px]'>
                    <img src='/avatar.jpg' className='rounded-full h-[48px] w-[48px]' />
                    <div className='flex flex-col ml-[10px]'>
                        <span className='font-bold'>Vu Tien Duc</span>
                        <span className='font-semibold text-[13px]'>My Account</span>
                    </div>
                </div>
                <div className='px-[15px] pt-[15px] h-full overflow-hidden flex flex-col items-center w-[100%] border-t-[1px] '>
                    <button onClick={() => listHandler.setCurrentLayout(layouts.ADD_FRIEND_PAGE)} className='font-semibold bg-[#f3f2f2] my-[3px] w-[98%] justify-start px-[10px] font-poppins py-2 rounded-[8px] flex items-center'>
                        <i className='bx bx-user-plus text-[30px] text-[#353535] mr-2'></i>
                        <span className='text-[#353535] text-[15px]'>Add Friends</span>
                    </button>
                    <button onClick={() => listHandler.setCurrentLayout(layouts.CREATE_GROUP)} className='font-semibold bg-[#f3f2f2] my-[3px] w-[98%] justify-start px-[10px] font-poppins py-2 rounded-[8px] flex items-center'>
                        <i className='bx bx-group text-[30px] text-[#353535] mr-2'></i>
                        <span className='text-[#353535] text-[15px]'>Create Group</span>
                    </button>
                    <button onClick={() => listHandler.setCurrentLayout(layouts.FRIEND_REQUEST)} className='font-semibold bg-[#f3f2f2] my-[3px] w-[98%] justify-start px-[10px] font-poppins py-2 rounded-[8px] flex items-center'>
                        <i className='bx bx-user-check text-[30px] text-[#353535] mr-2'></i>
                        <span className='text-[#353535] text-[15px]'>Friends Request</span>
                    </button>
                </div>
            </div>
            {
                listData.currentLayout === layouts.ADD_FRIEND_PAGE ?
                    (<AddFriendPage />)
                    :
                    listData.currentLayout === layouts.CREATE_GROUP ?
                        (<CreateGroupPage />)
                        :
                        (<FriendsRequestPage />)
            }
        </section>
    )
}

export default AddingPage