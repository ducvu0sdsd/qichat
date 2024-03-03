import React from 'react'

const MessageItem = ({ message }) => {
    return (
        <span className='leading-[30px] flex justify-center items-center flex-wrap max-w-[250px] z-20 bg-[#EFF5FD] px-[10px] py-[2px] rounded-lg text-[14px]'>
            {message}
        </span>
    )
}

export default MessageItem