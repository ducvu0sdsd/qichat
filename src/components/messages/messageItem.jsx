import React from 'react'

const MessageItem = ({ message }) => {
    return (
        <span className='leading-[30px] bg-[#EFF5FD] px-[10px] py-[2px] rounded-md text-[14px]'>
            {message}
        </span>
    )
}

export default MessageItem