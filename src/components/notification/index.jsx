import { notifyType } from '@/app/context'
import React, { useEffect, useState } from 'react'

const Notification = ({ status, message }) => {

    const [info, setInfo] = useState({ status: 'none', message: '' })
    useEffect(() => {
        setInfo({ status, message })
    }, [status])

    return (
        <div style={{ right: info.status === 'none' ? '-500px' : '8px', transition: '0.3s', backgroundColor: info.status === notifyType.SUCCESS ? 'white' : info.status === notifyType.FAIL ? 'red' : 'yellow', color: info.status === notifyType.SUCCESS ? 'black' : info.status === notifyType.FAIL ? 'white' : '#6b6b6b' }} className='items-center px-3 flex w-[270px] z-50 rounded-md shadow-md h-[70px] fixed top-4'>
            {info.status === notifyType.SUCCESS ?
                <i className='bx bx-check-circle text-[green] text-[40px] mr-3'></i>
                :
                info.status === notifyType.FAIL ?
                    <i className='bx bx-bug-alt text-[40px] mr-3 text-[white]' ></i>
                    :
                    <i className='bx bx-info-circle text-[40px] mr-3 text-[#6b6b6b]' ></i>

            }
            <div className='flex flex-col justify-center'>
                <span className='text-[14px] font-semibold'>{info.status === notifyType.SUCCESS ? 'Successfully' : info.status === notifyType.FAIL ? 'Error' : 'Warning'}</span>
                <span className='text-[13px]'>{info.message}</span>
            </div>
            <i className='bx bx-x absolute top-1 right-1 text-[21px] text-[#585858] cursor-pointer' ></i>
        </div>
    )
}

export default Notification