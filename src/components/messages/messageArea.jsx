'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MessageSection from './messageSection'
import UserIcon from '../userIcon'
import { MessagesContext } from './context'
import { TypeHTTP, api, baseURL } from '@/utils/api'
import { io } from 'socket.io-client'
import { returnImage, returnName, returnRemainingObject } from '@/utils/room'
import { ThemeContext } from '@/app/context'
import Logo from '../logo'
import { tinhSoPhutCham } from '@/utils/time'
const socket = io.connect(baseURL)

const MessageArea = () => {

    const { listData, listHandler } = useContext(MessagesContext)
    const { data } = useContext(ThemeContext)
    const messageRef = useRef()
    const [information, setInformation] = useState('')

    useEffect(() => {
        messageRef.current?.scrollTo({
            top: messageRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [messageRef.current?.offsetHeight, listData.messages])

    useEffect(() => {
        socket.on(listData.currentRoom?._id, (messages) => {
            listHandler.setMessages(messages)
        })

    }, [socket, listData.currentRoom?._id])

    const sendMessage = () => {
        const body = {
            room_id: listData.currentRoom._id,
            reply: null,
            information,
            typeMessage: 'text',
            user_id: data.user._id
        }
        socket.emit('send_message', body)
        setInformation('')
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage()
        }
    };

    return (
        <div className='h-full w-full transition-all border-[#e5e5e5] border-r-[1px] flex flex-col'>
            {listData.currentRoom ?
                <>
                    <div className=' flex items-center h-[10%] w-full justify-between px-[15px] py-2 border-[#e5e5e5] border-b-[1px]'>
                        <div className='flex'>
                            <UserIcon operating={returnRemainingObject(listData.currentRoom, data.user).operating.status} avatar={returnImage(listData.currentRoom, data.user)} />
                            <div className='flex flex-col ml-[10px]'>
                                <span className='font-semibold text-[15px]'>{returnName(listData.currentRoom, data.user)}</span>
                                {listData.currentRoom.users.length === 2 ?
                                    <span className='font-semibold text-[12px]'>{returnRemainingObject(listData.currentRoom, data.user).operating.status ? <span className='text-[#3e9042] text-[12px]'>Active Now</span> : `Operated in ${tinhSoPhutCham(returnRemainingObject(listData.currentRoom, data.user).operating.time)} ago`}</span>
                                    :
                                    <span className='font-semibold text-[12px]'>{listData.currentRoom.users.length} participants</span>
                                }
                            </div>
                        </div>
                        <div className='text-[30px] flex gap-2 text-[#3f3f3f]'>
                            <i onClick={() => sayHello()} className='bx bx-phone cursor-pointer' ></i>
                            <i onClick={() => listHandler.setJoined(true)} className='bx bx-video cursor-pointer' ></i>
                            <i onClick={() => listHandler.setDisplayInfo(!listData.displayInfo)} className='bx bx-info-circle cursor-pointer' ></i>
                        </div>
                    </div>
                    <div ref={messageRef} className='h-[80%] relative w-full px-[1rem] py-[0.5rem] overflow-y-auto message'>
                        {listData.messages.length === 0 ?
                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] flex flex-col items-center gap-3 translate-y-[-50%] text-center text-[20px]'>
                                <img src={returnImage(listData.currentRoom, data.user)} className='w-[200px] h-[200px] rounded-full' />
                                <span>{"You don't have a message with"} {returnName(listData.currentRoom, data.user)} yet, start messaging now !!!</span>
                            </div>
                            :
                            <>
                                {listData.messages.map((message, index) => (
                                    <MessageSection style={message.user._id !== data.user._id ? 'start' : 'end'} message={message} key={index} />
                                ))}
                            </>
                        }
                    </div>
                    <div className='mt-1 relative w-full px-[1rem] flex items-center'>
                        <i className='absolute cursor-pointer text-[20px] text-[#999] left-[27px] bx bx-microphone' ></i>
                        <input onKeyDown={handleKeyDown} onChange={e => setInformation(e.target.value)} value={information} placeholder='Type your message...' type='text' className='pr-[65px] text-[14px] rounded-md focus:outline-0 pl-[35px] w-full h-[45px] border-[#f1f1f1] border-[2px]' />
                        <div className='absolute right-6 flex gap-2 items-center'>
                            <i className=" text-[20px] cursor-pointer text-[rgb(168,168,168)] fa-solid fa-paperclip"></i>
                            <i onClick={sendMessage} className='bx bx-send text-[23px] cursor-pointer text-[#a5a5a5]'></i>
                        </div>
                    </div>
                </>
                :
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <Logo />
                    <span className='text-[18px]'>{"It's A Good Platform For Message Sharing!!!"}</span>
                </div>
            }
        </div>
    )
}

export default MessageArea