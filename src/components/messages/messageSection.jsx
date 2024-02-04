import React from 'react'
import MessageItem from './messageItem'
import UserIcon from '../userIcon'

const MessageSection = ({ style }) => {
    return (
        <div style={{ justifyContent: style }} className='flex gap-3 items-end my-[1rem]'>
            {style === 'start' && (<UserIcon />)}
            <div className='flex flex-col gap-1'>
                {style === 'start' && (<span className='text-[12px] font-bold'>Vu Tien Duc</span>)}
                <MessageItem message={'hello this is 6 minutes English'} />
                <MessageItem message={'hello this is 6 minutes English'} />
            </div>
        </div>
    )
}

export default MessageSection