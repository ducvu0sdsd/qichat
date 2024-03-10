'use client'
import React, { useContext, useRef, useState } from 'react'
import MessageItem from './messageItem'
import UserIcon from '../userIcon'
import { emoji, emojiStatus } from '../emoji/emoji'
import { TypeHTTP, api, baseURL } from '@/utils/api'
import { MessagesContext } from './context'
import { io } from 'socket.io-client'
const socket = io.connect(baseURL)

const MessageSection = ({ style, message, handleShowUserInformation }) => {
    const emojiRef = useRef()
    const { listData, listHandler } = useContext(MessagesContext)

    const handleMouseHover = () => {
        emojiRef.current.style.display = 'flex'
        setTimeout(() => {
            emojiRef.current.style.opacity = 1
        }, 150);
    }

    const handleMouseOut = () => {
        emojiRef.current.style.opacity = 0
        setTimeout(() => {
            emojiRef.current.style.display = 'none'
        }, 150);
    }

    const handleSendEmoji = (status) => {
        const emoji = {
            status,
            user: {
                _id: message.user._id,
                fullName: message.user.fullName,
                avatar: message.user.avatar
            }
        }
        const messageSend = { ...message, emojis: [...message.emojis, emoji] }
        socket.emit('send_emoji', messageSend)
    }

    return (
        <>{message.user ?
            <div style={{ justifyContent: style }} className='hover:z-10 z-0 flex gap-2 items-end my-[1rem]'>
                {style === 'start' && (<div onClick={() => handleShowUserInformation(message.user._id)} className='cursor-pointer'><UserIcon avatar={message.user?.avatar} /></div>)}
                <div onMouseEnter={handleMouseHover} onMouseLeave={handleMouseOut} className='flex relative flex-col gap-1'>
                    {style === 'start' && (<span className='text-[10px] font-semibold'>{message.user?.fullName.split(' ')[message.user?.fullName.split(' ').length - 1]}</span>)}
                    <MessageItem style={style} message={message.information} type={message.typeMessage} />
                    {message.emojis.length > 0 &&
                        <div className='z-0 p-1 flex rounded-full bg-[#EFF5FD] absolute left-[5px] bottom-[-15px]'>
                            {message.emojis.map((e, index) => {
                                if (index <= 2)
                                    return <span key={index} className='text-[13px]'>{emoji(e.status)}</span>
                            })}
                        </div>
                    }
                    <div ref={emojiRef} style={style === 'end' ? { left: '-182px' } : { right: '-182px' }} className='transition-all hidden opacity-[0] absolute flex-col items-center px-3 border-[#f4f4f4] border-[2px] rounded-lg bottom-0 py-1'>
                        <div className='flex gap-1'>
                            <button onClick={() => handleSendEmoji('likelike')} >{emojiStatus.likelike}</button>
                            <button onClick={() => handleSendEmoji('like')} >{emojiStatus.like}</button>
                            <button onClick={() => handleSendEmoji('smile')} >{emojiStatus.smile}</button>
                            <button onClick={() => handleSendEmoji('wow')} >{emojiStatus.wow}</button>
                            <button onClick={() => handleSendEmoji('sad')} >{emojiStatus.sad}</button>
                            <button onClick={() => handleSendEmoji('angry')} >{emojiStatus.angry}</button>
                        </div>
                        <div className='flex gap-1'>

                        </div>
                    </div>
                </div>
            </div >
            :
            <div className='flex items-center justify-center my-[1rem] text-[13px]'>
                {message.information}
            </div>
        }</>
    )
}

export default MessageSection