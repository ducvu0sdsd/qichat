import { ThemeContext } from '@/app/context'
import React, { useContext } from 'react'

const MessageItem = ({ message, type, style }) => {

    const { handler } = useContext(ThemeContext)

    if (type === 'text') {
        return (
            <div style={{ overflowWrap: 'break-word' }} className='leading-[21px] overflow-wrap max-w-[250px] z-0 bg-[#EFF5FD] px-[10px] py-[7px] rounded-lg text-[14px]'>
                {message}
            </div>
        )
    } else if (type === 'image') {
        return <div className='max-w-[250px] py-2'>
            <div style={{ justifyContent: style }} className='leading-[30px] flex gap-1 justify-center flex-wrap items-center w-[auto] bg-[#fafcfe] z-0 py-[2px] rounded-lg text-[14px]'>
                {message.map((item, index) => (
                    <img onClick={() => handler.showImage(item)} key={index} src={item} className='rounded-xl cursor-pointer max-w-[80%]' />
                ))}
            </div>
        </div>
    } else if (type === 'video') {
        return <div className='max-w-[250px] py-2'>
            <div style={{ justifyContent: style }} className='leading-[30px] flex gap-1 justify-center flex-wrap items-center w-[auto] bg-[#fafcfe] z-0 py-[2px] rounded-lg text-[14px]'>
                {message.map((item, index) => (
                    <video controls key={index} src={item} className='rounded-xl cursor-pointer max-w-[80%]' />
                ))}
            </div>
        </div>
    }
}

export default MessageItem