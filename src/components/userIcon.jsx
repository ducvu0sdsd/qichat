import { tinhSoPhutChamIcon } from '@/utils/time'
import React from 'react'

const UserIcon = ({ avatar, operating, show }) => {
    return (
        <div className='w-[42px] h-[42px] mx-[2px] relative rounded-full'>
            <img src={avatar ? avatar : '/avatar.jpg'} className='w-[100%] h-[100%] rounded-full' />
            {operating?.status ?
                <div className='h-[13px] bottom-[0px] right-[-1px] w-[13px] absolute bg-[#2fd12f] rounded-full'></div>
                :
                show === true && <div className='py-1 px-1 bottom-[-2px] right-[-5px] bg-[black] absolute text-[9px] font-poppins font-bold text-[white] rounded-full'>{!tinhSoPhutChamIcon(operating?.time) ? '0s' : tinhSoPhutChamIcon(operating?.time)}</div>
            }
        </div>
    )
}

export default UserIcon