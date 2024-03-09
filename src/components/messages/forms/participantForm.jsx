import { ThemeContext } from '@/app/context'
import UserIcon from '@/components/userIcon'
import React, { useContext, useEffect, useState } from 'react'
import { MessagesContext } from '../context'
import { TypeHTTP, api } from '@/utils/api'

const ParticipantForm = ({ participants }) => {

    const { data, handler } = useContext(ThemeContext)
    const { listData, listHandler } = useContext(MessagesContext)
    const [list, setList] = useState(participants)

    useEffect(() => {
        setList(participants)
    }, [participants])

    const handleSubmit = () => {
        const room = listData.currentRoom
        room.users = list
        api({ type: TypeHTTP.PUT, sendToken: true, path: `/rooms/${data.user?._id}`, body: room })
            .then(newRooms => {
                listHandler.setCurrentRoom(newRooms.filter(item => item._id === room._id)[0])
                listHandler.setRooms(newRooms)
                listHandler.setParticipants([])
            })
            .catch(error => { })
    }

    return (
        <div style={{ height: participants.length === 0 ? '0' : '400px', width: participants.length === 0 ? '0' : '600px' }} className='z-50 fixed transition-all top-[50%] left-[50%] translate-x-[-50%] flex translate-y-[-50%] overflow-hidden rounded-xl bg-slate-50'>
            <div className='w-[45%] h-screen border-[#e5e5e5] border-r-[1px] pl-4 py-6' >
                <span className='font-semibold text-[20]'>{participants.length} Participants</span>
                <div className='relative'>
                    <input type='text' placeholder='Search' className='text-[10px] pl-[30px] pr-[10px] font-poppins w-[200px] h-[33px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]' />
                    <i className='top-[57%] translate-y-[-50%] left-[8px] bx bx-search text-[#999] text-[15px] absolute'></i>
                </div>
                <div className='my-1 h-[300px] w-[100%] overflow-y-auto'>
                    {list.map((participant, index) => {
                        return (
                            <div key={index} className='flex items-center justify-between pr-2 my-2'>
                                <div key={index} className='flex gap-2 items-center' >
                                    <UserIcon operating={participant.operating} avatar={participant.avatar} />
                                    <span className='text-[13px] font-semibold'>{participant.fullName}</span>
                                </div>
                                {!participant.operating && <button onClick={() => setList(prev => prev.filter(item => item._id !== participant._id))} className='font-poppins h-[20px] w-[20px] flex items-center justify-center font-semibold border-[green] border-[2px] rounded-lg text-[green]'><i className='text-[16px] bx bx-x'></i></button>}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='w-[55%] h-screen pl-4 py-4 ' >
                <div className='relative mb-3'>
                    <input type='text' placeholder='Search' className='text-[10px] pl-[30px] pr-[10px] font-poppins w-[250px] h-[33px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]' />
                    <i className='top-[57%] translate-y-[-50%] left-[8px] bx bx-search text-[#999] text-[15px] absolute'></i>
                </div>
                <span className='font-semibold'>Friends</span>
                <div className='flex gap-2 items-start flex-col my-2 h-[250px] overflow-y-auto justify-start' >
                    {data.user?.friends.map((friend, index) => {
                        if (!list.map(item => item._id).includes(friend._id))
                            return (
                                <div key={index} className='flex items-center'>
                                    <div key={index} className='flex w-[260px] items-center gap-2 justify-start '>
                                        <UserIcon avatar={friend.avatar} />
                                        <span className='text-[13px] font-semibold '>{friend.fullName}</span>
                                    </div>
                                    <button onClick={() => setList(prev => [friend, ...prev])} className='text-[10px] font-poppins py-[2px] font-semibold px-2 border-[green] border-[2px] rounded-lg text-[green]'>Add</button>
                                </div>
                            )
                    })}
                </div>
            </div>
            {list.length !== participants.length && <button onClick={() => handleSubmit()} style={{ backgroundImage: 'url(/bg.webp)', backgroundSize: 'cover' }} className='bottom-2 right-2 absolute rounded-md text-[white] text-[13px] font-poppins w-[100px] h-[30px] mt-[10px] shadow'>Submit</button>}
            <button onClick={() => listHandler.setParticipants([])} className='text-[#999] absolute top-2 right-2'><i className='text-[28px] bx bx-x'></i></button>
        </div>
    )
}

export default ParticipantForm