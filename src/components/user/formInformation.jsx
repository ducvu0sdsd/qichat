import { ThemeContext, notifyType } from '@/app/context'
import { TypeHTTP, api } from '@/utils/api'
import { formatDateOfBirth } from '@/utils/time'
import React, { useContext, useEffect, useState } from 'react'

const FormInformation = ({ user }) => {

    const { handler, data } = useContext(ThemeContext)
    const [request, setRequest] = useState()

    const handleCreateRequest = (toUser) => {
        const fromUser = {
            _id: data.user._id,
            fullName: data.user.fullName,
            avatar: data.user.avatar
        }
        api({ type: TypeHTTP.POST, body: { toUser, fromUser }, path: '/requests', sendToken: true })
            .then(result => {
                setRequest(result)
                handler.notify(notifyType.SUCCESS, `Sended Request To ${user?.fullName} successfully`)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleRefuseRequest = (id) => {
        api({ type: TypeHTTP.DELETE, sendToken: true, path: `/requests/${id}` })
            .then(res => {
                setRequest(undefined)
                handler.notify(notifyType.SUCCESS, 'Refuse Request Successfully')
            })
            .catch(error => console.log(error))
    }

    const handleAcceptRequest = (request) => {
        api({ type: TypeHTTP.POST, sendToken: true, path: `/requests/accept-request`, body: { request } })
            .then(res => {
                handler.setUser(res.user)
                setRequest(undefined)
                handler.notify(notifyType.SUCCESS, 'Accept Request Successfully')
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (user)
            api({ type: TypeHTTP.POST, sendToken: true, path: '/requests/get-by-2-user', body: { user_id1: user?._id, user_id2: data.user?._id } })
                .then(req => setRequest(req))
    }, [user])

    return (
        <div style={{ width: user ? '400px' : '0', height: user ? 'auto' : '0', paddingBottom: user ? '20px' : 0 }} className='flex flex-col gap-2 overflow-hidden transition-all z-20 fixed top-[50%] bg-[white] rounded-lg shadow-md left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='relative'>
                <img src='/background-avatar.png' width={'100%'} />
                <img src={user?.avatar} className='left-[20px] translate-y-[-50%] rounded-full absolute' width={'80px'} />
            </div>
            <div className='pl-[110px] flex gap-1'>
                {data.user?.friends.map(item => item._id).includes(user?._id) ?
                    <button className='text-[13px] font-poppins py-[2px] font-semibold px-2 border-[green] border-[2px] rounded-lg text-[green]'>Friend</button>
                    :
                    request ?
                        request.fromUser._id === data.user._id ?
                            <button className='text-[12px] bg-[green] font-poppins py-[6px] px-3 text-[white] rounded-lg font-semibold'>Friend request sent</button>
                            :
                            <div className='flex gap-1'>
                                <button onClick={() => handleAcceptRequest(request)} className='text-[12px] bg-[green] font-poppins py-[6px] px-3 text-[white] rounded-lg font-semibold'>Accept</button>
                                <button onClick={() => handleRefuseRequest(request._id)} className='text-[12px] bg-[red] font-poppins py-[6px] px-3 text-[white] rounded-lg font-semibold'>Refuse</button>
                            </div>
                        :
                        <button onClick={() => handleCreateRequest({ _id: user._id, fullName: user.fullName, avatar: user.avatar })} style={{ backgroundImage: 'url(/bg.webp)' }} className='text-[12px] font-poppins py-[6px] w-[100px] text-[white] rounded-lg font-semibold'>Add Friend</button>
                }
            </div>
            <div className='h-3' />
            <div className='text-[14px] flex px-6'>
                <div className='w-[100px] font-semibold'>Full Name:</div>
                <span className='text-[14px]'>{user?.fullName}</span>
            </div>
            <div className='text-[14px] flex px-6'>
                <div className='w-[100px] font-semibold'>{user?.email ? 'Email:' : 'Phone:'}</div>
                <span className='text-[14px]'>{user?.email ? user?.email : user?.phone}</span>
            </div>
            <div className='text-[14px] flex px-6'>
                <div className='w-[100px] font-semibold'>Date Of Birth:</div>
                <span className='text-[14px]'>{formatDateOfBirth(user?.dateOfBirth)}</span>
            </div>
            <div className='text-[14px] flex px-6'>
                <div className='w-[100px] font-semibold'>Gender:</div>
                <span className='text-[14px]'>{user?.gender}</span>
            </div>
            <div className='text-[14px] flex px-6'>
                <div className='w-[100px] font-semibold'>Bio:</div>
                <span className='text-[14px]'>{user?.bio}</span>
            </div>
            {data.user?.friends.map(item => item._id).includes(user?._id) &&
                <div className='text-[14px] justify-end mt-2 flex px-6'>
                    <button className='text-[13px] font-poppins py-[6px] w-[100px] text-[white] bg-[black] rounded-lg font-semibold'>UnFriend</button>
                </div>
            }
            <i onClick={() => handler.hiddenUserInformation()} className='bx bx-x text-[30px] text-[white] absolute top-1 right-1 cursor-pointer'></i>
        </div>
    )
}

export default FormInformation