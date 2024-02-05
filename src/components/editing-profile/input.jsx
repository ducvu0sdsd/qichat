import React from 'react'

const Input = ({ title }) => {
    return (
        <div className='flex flex-col mb-[10px]'>
            <span className='mb-1 text-[15px] font-poppins'>{title}</span>
            <input className='w-[320px] focus:outline-0 px-[10px] h-[35px] border-[#999] border-[1px] rounded-md' />
        </div>
    )
}

export default Input