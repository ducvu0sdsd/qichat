import React, { useContext } from 'react'
import UserIcon from '../userIcon'
import { MessagesContext } from './context'
import { ThemeContext, notifyType } from '@/app/context'
import { returnImage, returnName, returnRemainingObject } from '@/utils/room'
import { formatTime } from '@/utils/time'

const MessageUser = ({ currentRoom }) => {

    const { listHandler } = useContext(MessagesContext)
    const { data, handler } = useContext(ThemeContext)

    return (
        <div onClick={() => { listHandler.setCurrentRoom(currentRoom) }} className='relative flex items-center w-full cursor-pointer my-[6px]'>
            <UserIcon show={currentRoom.users.length === 2 ? true : false} operating={currentRoom.users.length === 2 && returnRemainingObject(currentRoom, data.user).operating} avatar={returnImage(currentRoom, data.user)} />
            <div className='flex flex-col ml-2'>
                <span className='text-[14px] font-semibold'>{returnName(currentRoom, data.user)}</span>
                <span className='text-[12px] w-full'>
                    {`${currentRoom.lastMessage.information.substring(0, 25)}${currentRoom.lastMessage.information.length >= 26 ? '...' : ''}`}
                </span>
            </div>
            <span className='absolute bg-red text-[9px] right-0 top-1'>{formatTime(currentRoom.lastMessage.time)}</span>
        </div>
    )
}

export default MessageUser