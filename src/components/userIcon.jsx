import React from 'react'

const UserIcon = () => {
    return (
        <div className='w-[42px] h-[42px] relative rounded-full'>
            <img src='/avatar.jpg' className='w-[100%] h-[100%] rounded-full' />
            <div className='h-[13px] bottom-[0px] right-[-1px] w-[13px] absolute bg-[#2fd12f] rounded-full'></div>
        </div>
    )
}

export default UserIcon