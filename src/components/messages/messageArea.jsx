'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MessageSection from './messageSection'
import UserIcon from '../userIcon'
import { MessagesContext } from './context'
import { TypeHTTP, api } from '@/utils/api'
import { io } from 'socket.io-client'
const socket = io.connect('http://localhost:8080')

const MessageArea = () => {

    const { listData, listHandler } = useContext(MessagesContext)
    const messageRef = useRef()

    useEffect(() => {
        // messageRef.current.scrollTop = messageRef.current.scrollHeight;
        messageRef.current.scrollTo({
            top: messageRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [messageRef.current?.offsetHeight])

    useEffect(() => {
        socket.on('receive_message', (data) => {
            alert(data.message)
        })
    }, [socket])

    const sayHello = () => {
        api({ type: TypeHTTP.GET, path: '/hello', sendToken: true })
            .then(res => console.log(res))
    }

    const sendMessage = () => {
        socket.emit('send_message', { message: 'hello' })
    }

    return (
        <div className='h-full w-full transition-all border-[#e5e5e5] border-r-[1px] flex flex-col'>
            <div className=' flex items-center h-[10%] w-full justify-between px-[15px] py-2 border-[#e5e5e5] border-b-[1px]'>
                <div className='flex'>
                    <UserIcon />
                    <div className='flex flex-col ml-[10px]'>
                        <span className='font-bold'>Vu Tien Duc</span>
                        <span className='font-semibold text-[13px]'>In Operation</span>
                    </div>
                </div>
                <div className='text-[30px] flex gap-2 text-[#3f3f3f]'>
                    <i onClick={() => sayHello()} className='bx bx-phone cursor-pointer' ></i>
                    <i onClick={() => listHandler.setJoined(true)} className='bx bx-video cursor-pointer' ></i>
                    <i onClick={() => listHandler.setDisplayInfo(!listData.displayInfo)} className='bx bx-info-circle cursor-pointer' ></i>
                </div>
            </div>
            <div ref={messageRef} className='h-[80%] w-full px-[1rem] py-[0.5rem] overflow-y-auto message'>
                <MessageSection style={'start'} />
                <MessageSection style={'end'} />
                <MessageSection style={'start'} />
                <MessageSection style={'start'} />
                <MessageSection style={'end'} />
                <MessageSection style={'start'} />
            </div>
            <div className='mt-1 relative w-full px-[1rem] flex items-center'>
                <i className='absolute cursor-pointer text-[20px] text-[#999] left-[27px] bx bx-microphone' ></i>
                <input placeholder='Type your message...' type='text' className='pr-[65px] text-[14px] rounded-md focus:outline-0 pl-[35px] w-full h-[45px] border-[#f1f1f1] border-[2px]' />
                <div className='absolute right-6 flex gap-2 items-center'>
                    <i className=" text-[20px] cursor-pointer text-[rgb(168,168,168)] fa-solid fa-paperclip"></i>
                    <i onClick={sendMessage} className='bx bx-send text-[23px] cursor-pointer text-[#a5a5a5]'></i>
                </div>
            </div>
        </div>
    )
}

export default MessageArea