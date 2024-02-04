import React from 'react'
import UserIcon from '../userIcon'

const MessageUser = () => {
    return (
        <div className='relative flex items-center w-full cursor-pointer my-[6px]'>
            <UserIcon />
            <div className='flex flex-col ml-2'>
                <span className='text-[14px] font-semibold'>Vu Tien Duc</span>
                <span className='text-[12px] w-full'>
                    Hello, how is going?
                </span>
            </div>
            <span className='absolute bg-red text-[9px] right-0 top-1'>05:09 AM</span>
        </div>
    )
}

export default MessageUser