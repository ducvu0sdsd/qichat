import { ThemeContext } from '@/app/context'
import UserIcon from '@/components/userIcon'
import React, { useContext, useEffect, useState } from 'react'
import { MessagesContext } from '../context'
import { TypeHTTP, api, baseURL, systemID } from '@/utils/api'
import { io } from 'socket.io-client'
const socket = io.connect(baseURL)

const ParticipantForm = ({ participants }) => {

    const { data, handler } = useContext(ThemeContext)
    const { listData, listHandler } = useContext(MessagesContext)
    const [list, setList] = useState(participants)
    const [leftUsers, setLeftUsers] = useState([])
    const [nameList, setNameList] = useState('')
    const [nameFriends, setNameFriends] = useState('')

    useEffect(() => {
        setList(participants)
    }, [participants])

    const handleSubmit = () => {
        const room = listData.currentRoom
        room.users = list
        api({ type: TypeHTTP.PUT, sendToken: true, path: `/rooms/${data.user?._id}`, body: room })
            .then(newRooms => {
                const currentRoom = newRooms.filter(item => item._id === room._id)[0]
                if (!currentRoom) {
                    listHandler.setDisplayInfo(false)
                }
                listHandler.setCurrentRoom(currentRoom)
                listHandler.setRooms(newRooms)
                listHandler.setParticipants([])
                const usersJoinGroup = list.filter(item => !participants.map(i => i._id).includes(item._id))
                if (usersJoinGroup.length > 0) {
                    const body = {
                        room_id: listData.currentRoom._id,
                        reply: null,
                        information: `${data.user?.fullName} invited ${usersJoinGroup.map(item => item.fullName).join(', ')} to join the group`,
                        typeMessage: 'notify',
                        user_id: systemID
                    }
                    socket.emit('send_message', body)
                }
                if (leftUsers.length > 0) {
                    const body = {
                        room_id: listData.currentRoom._id,
                        reply: null,
                        information: `${data.user?.fullName} invited ${leftUsers.map(item => item.fullName).join(', ')} out of the group`,
                        typeMessage: 'notify',
                        user_id: systemID
                    }
                    socket.emit('send_message', body)
                }
                setLeftUsers([])
            })
            .catch(error => { })
    }

    return (
        <div style={{ height: participants.length === 0 ? '0' : '400px', width: participants.length === 0 ? '0' : '600px' }} className='z-50 fixed transition-all top-[50%] left-[50%] translate-x-[-50%] flex translate-y-[-50%] overflow-hidden rounded-xl bg-slate-50'>
            <div className='w-[45%] h-screen border-[#e5e5e5] border-r-[1px] pl-4 py-6' >
                <span className='font-semibold text-[20]'>{participants.length} Participants</span>
                <div className='relative'>
                    <input onChange={e => setNameList(e.target.value)} value={nameList} type='text' placeholder='Search' className='text-[12px] pl-[30px] pr-[10px] w-[200px] h-[33px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]' />
                    <i className='top-[57%] translate-y-[-50%] left-[8px] bx bx-search text-[#999] text-[15px] absolute'></i>
                </div>
                <div className='my-1 h-[300px] w-[100%] overflow-y-auto'>
                    {list.map((participant, index) => {
                        if (participant.fullName.toLowerCase().includes(nameList.toLowerCase()) || nameList === '')
                            return (
                                <div key={index} className='flex items-center justify-between pr-2 my-2'>
                                    <div key={index} className='flex gap-2 items-center' >
                                        <UserIcon operating={participant.operating} avatar={participant.avatar} />
                                        <div className='flex flex-col'>
                                            <span className='text-[13px] font-semibold'>{participant.fullName}</span>
                                            <span className='text-[11px]'>{participant._id === listData.currentRoom?.creator ? 'Admin' : 'Member'}</span>
                                        </div>
                                    </div>
                                    {/* kiểm tra xem tài khoản của bạn có phải là admin của nhóm đó hay không */}
                                    {listData.currentRoom?.creator === data.user?._id ?
                                        // nếu đúng, sẽ hiển thị btn kick thành viên, ngoại trừ bạn
                                        participant._id !== data.user?._id && (
                                            <button onClick={() => {
                                                setList(prev => prev.filter(item => item._id !== participant._id))
                                                if (participants.map(item => item._id).includes(participant._id)) {
                                                    setLeftUsers(prev => [...prev, participant])
                                                }
                                            }} className='font-poppins h-[20px] w-[20px] flex items-center justify-center font-semibold border-[green] border-[2px] rounded-lg text-[green]'>
                                                <i className='text-[16px] bx bx-x'></i>
                                            </button>
                                        )
                                        :
                                        // nếu sai, thì chỉ hiển thị btn kick khi trong quá trình bạn thêm thành viên khách vào nhóm
                                        !participant.operating &&
                                        <button onClick={() => setList(prev => prev.filter(item => item._id !== participant._id))} className='font-poppins h-[20px] w-[20px] flex items-center justify-center font-semibold border-[green] border-[2px] rounded-lg text-[green]'>
                                            <i className='text-[16px] bx bx-x'></i>
                                        </button>
                                    }
                                </div>
                            )
                    })}
                </div>
            </div>
            <div className='w-[55%] h-screen pl-4 py-4 ' >
                <div className='relative mb-3'>
                    <input onChange={e => setNameFriends(e.target.value)} value={nameFriends} type='text' placeholder='Search' className='text-[12px] pl-[30px] pr-[10px] w-[250px] h-[33px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]' />
                    <i className='top-[57%] translate-y-[-50%] left-[8px] bx bx-search text-[#999] text-[15px] absolute'></i>
                </div>
                <span className='font-semibold'>Friends</span>
                <div className='flex gap-2 items-start flex-col my-2 h-[250px] overflow-y-auto justify-start' >
                    {data.user?.friends.map((friend, index) => {
                        if (!list.map(item => item._id).includes(friend._id))
                            if (friend.fullName.toLowerCase().includes(nameFriends.toLowerCase()) || nameFriends === '')
                                return (
                                    <div key={index} className='flex items-center'>
                                        <div key={index} className='flex w-[260px] items-center gap-2 justify-start '>
                                            <UserIcon avatar={friend.avatar} />
                                            <span className='text-[13px] font-semibold '>{friend.fullName}</span>
                                        </div>
                                        <button onClick={() => {
                                            setList(prev => [friend, ...prev])
                                            if (leftUsers.map(item => item._id).includes(friend._id)) {
                                                setLeftUsers(prev => prev.filter(item => item._id !== friend._id))
                                            }
                                        }} className='text-[10px] font-poppins py-[2px] font-semibold px-2 border-[green] border-[2px] rounded-lg text-[green]'>Add</button>
                                    </div>
                                )
                    })}
                </div>
            </div>
            {(list.length !== participants.length || leftUsers.length !== 0) && <button onClick={() => handleSubmit()} style={{ backgroundImage: 'url(/bg.webp)', backgroundSize: 'cover' }} className='bottom-2 right-2 absolute rounded-md text-[white] text-[13px] font-poppins w-[100px] h-[30px] mt-[10px] shadow'>Submit</button>}
            <button onClick={() => listHandler.setParticipants([])} className='text-[#999] absolute top-2 right-2'><i className='text-[28px] bx bx-x'></i></button>
        </div>
    )
}

export default ParticipantForm