'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MessageItem from './messageItem'
import UserIcon from '../userIcon'
import { emoji, emojiStatus } from '../emoji/emoji'
import { TypeHTTP, api, baseURL } from '@/utils/api'
import { MessagesContext } from './context'
import { io } from 'socket.io-client'
import { returnImage, returnRemainingObject } from '@/utils/room'
import { ThemeContext } from '@/app/context'
import { motion } from 'framer-motion'
const socket = io.connect(baseURL)

const MessageSection = ({ style, message, handleShowUserInformation }) => {
    const emojiRef = useRef()
    const { listData, listHandler } = useContext(MessagesContext)
    const { data } = useContext(ThemeContext)

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
        socket.emit('send_emoji_or_disable', messageSend)
    }

    const handleSendDisable = () => {
        const messageSend = { ...message, disabled: true }
        socket.emit('send_emoji_or_disable', messageSend)
    }

    // useEffect(() => {
    //     console.log(listData.usersSeen.filter(item => (item._id !== data.user?._id && item.seen === message._id)))
    // })

    return (
        <>{message.user ?
            <div style={{ alignItems: style }} className='hover:z-10 z-0 flex flex-col my-[1rem]'>
                <div className='flex gap-1 items-end'>
                    {style === 'start' && (<div onClick={() => handleShowUserInformation(message.user._id)} className='cursor-pointer'><UserIcon avatar={message.user?.avatar} /></div>)}
                    {message.disabled ?
                        <div>
                            {style === 'start' && (<span className='text-[10px] translate-y-[3px] font-semibold'>{message.user?.fullName.split(' ')[message.user?.fullName.split(' ').length - 1]} </span>)}
                            <div className='bg-[#f5f5f5c3] py-2 px-3 rounded-lg text-[13px]'>
                                <i className="fa-solid cursor-pointer fa-delete-left text-[#999]"></i> The message has been revoked
                            </div>
                        </div>
                        :
                        <div onMouseEnter={handleMouseHover} onMouseLeave={handleMouseOut} style={{ alignItems: style }} className='flex relative flex-col gap-1'>
                            {style === 'start' && (<span className='text-[10px] translate-y-[3px] font-semibold'>{message.user?.fullName.split(' ')[message.user?.fullName.split(' ').length - 1]}</span>)}
                            {message.reply?._id && (
                                <div style={{ overflowWrap: 'break-word' }} className='overflow-wrap text-[12px] py-2 max-w-[250px] bg-[#e9e9e994] rounded-lg translate-y-[8px] px-2'>
                                    {message.reply.information}
                                </div>
                            )}
                            <MessageItem style={style} message={message.information} type={message.typeMessage} />
                            {message.emojis.length > 0 &&
                                <div style={{ left: '5px' }} className='z-0 p-1 flex rounded-full bg-[#EFF5FD] absolute bottom-[-15px]'>
                                    {message.emojis.map((e, index) => {
                                        if (index <= 3)
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
                                <div className='flex gap-2 justify-start mt-1 text-[15px] w-full'>
                                    {message.typeMessage === 'text' && <button onClick={() => listHandler.setReply(message)}><i className="fa-solid cursor-pointer fa-reply text-[#999]"></i></button>}
                                    {style === 'end' && <button onClick={() => handleSendDisable()}><i className="fa-solid cursor-pointer fa-delete-left text-[#999]"></i></button>}
                                    <button><i className="fa-solid cursor-pointer ml-[2px] fa-flag text-[#999]"></i></button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div style={{ alignSelf: 'end' }} className='flex bg-red'>
                    {listData.usersSeen.filter(item => (item._id !== data.user?._id && item.seen === message._id)).map((user, index) =>
                        <motion.img
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            src={user.avatar}
                            className='h-[15px] w-[15px] rounded-full bg-[red]' />
                    )}
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