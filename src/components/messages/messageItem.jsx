import React from 'react'

const MessageItem = ({ message, type }) => {

    if (type === 'text') {
        return (
            <span className='leading-[30px] flex justify-center items-center flex-wrap max-w-[250px] z-0 bg-[#EFF5FD] px-[10px] py-[2px] rounded-lg text-[14px]'>
                {message}
            </span>
        )
    } else if (type === 'image') {
        return <div className='leading-[30px] flex gap-1 justify-center flex-wrap items-center max-w-[250px] z-0 py-[2px] rounded-lg text-[14px]'>
            {message.map((item, index) => (
                <img key={index} src={item} className='rounded-xl max-w-[50%]' />
            ))}
        </div>
    }
}

export default MessageItem