'use client'

import React, { useContext, useRef, useState } from 'react'
import UserIcon from '../userIcon'
import { ThemeContext, notifyType } from '@/app/context'
import { TypeHTTP, api } from '@/utils/api'

const CreateGroupPage = () => {
    const inputRef = useRef()
    const [image, setImage] = useState('https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2152974972/settings_images/a05d7f7-f3b7-0102-a18b-52050e1111ad_noun-proactive-5427471-02_2.png')
    const [name, setName] = useState('')
    const { data, handler } = useContext(ThemeContext)
    const [participants, setParticipants] = useState([
        {
            _id: data.user._id,
            fullName: data.user.fullName,
            avatar: data.user.avatar
        }
    ])

    const handleCreateGroup = () => {
        if (name === '')
            return
        if (participants.length < 3)
            return
        api({ type: TypeHTTP.POST, path: '/rooms', sendToken: true, body: { users: participants, name, type: 'Group', image, creator: data.user._id } })
            .then(room => {
                setName('')
                setImage('https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2152974972/settings_images/a05d7f7-f3b7-0102-a18b-52050e1111ad_noun-proactive-5427471-02_2.png')
                setParticipants([
                    {
                        _id: data.user._id,
                        fullName: data.user.fullName,
                        avatar: data.user.avatar
                    }
                ])
                handler.notify(notifyType.SUCCESS, 'Create Group Successfully')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='w-[78%] h-screen border-[#e5e5e5] border-r-[1px]'>
            <div className='h-[10%] flex items-center w-full justify-start px-[25px] py-[17px] border-[#e5e5e5] border-b-[px]'>
                <img src='/icon-friends.png' width={'40px'} />
                <span className='font-poppins ml-2 text-[18px] font-bold'>Create Group</span>
            </div>
            <div className=' h-full  w-[100%] border-[#e5e5e5] border-t-[1px] flex'>
                <div className='w-[70%] flex flex-col items-center pt-[1.5rem]'>
                    <div className='relative'>
                        <input onChange={e => { console.log(e.target.value) }} ref={inputRef} type='file' accept="image/png, image/jpeg, image/jpg" style={{ display: 'none' }} />
                        <img src={image} className='rounded-full h-[150px] w-[150px]' />
                        <i onClick={() => inputRef.current.click()} className='cursor-pointer bx bx-pencil top-[0rem] right-0 text-[22px] text-[#5f5f5f] absolute' ></i>
                    </div>
                    <div className='relative mt-[1rem]'>
                        <input type='text' onChange={e => setName(e.target.value)} value={name} placeholder='Group Name' className='text-[14px] w-[300px] pl-[30px] pr-[10px] font-poppins h-[35px] focus:outline-0 rounded-md border-[#cacaca] border-[1px]' />
                        <i className='top-[50%] translate-y-[-50%] left-[8px] bx bx-pencil text-[#999] text-[19px] absolute'></i>
                    </div>
                    <div className='mt-[1.5rem] w-full'>
                        <span className='font-bold ml-[45px] text-[18px] font-poppins'>
                            {` Participants (${participants.length})`}
                        </span>
                        <div className='mt-[1rem] px-[2rem] grid grid-cols-3 justify-items-center gap-5'>
                            {participants.map((participant, index) => (
                                <div key={index} className='flex items-center w-[200px]'>
                                    <div className='flex items-center'>
                                        <UserIcon avatar={participant.avatar} operating={participant.operating?.status} />
                                        <span className='font-semibold px-[10px] text-[14px]'>{participant.fullName}</span>
                                    </div>
                                    {data.user._id !== participant._id && <button onClick={() => setParticipants(prev => prev.filter(item => item._id !== participant._id))} className='cursor-pointer'><i className='bx bx-x text-[20px]'></i></button>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => handleCreateGroup()} style={{ backgroundImage: 'url(/bg.webp)', backgroundSize: 'cover' }} className='rounded-md text-[white] font-poppins w-[100px] h-[35px] mt-[10px] shadow'>Create</button>
                </div>
                <div className='h-[100%] px-[1rem] border-l-[1px] w-[30%] flex flex-col items-center'>
                    <div className='relative w-full mt-[1rem]'>
                        <input type='text' placeholder='Search' className='text-[14px] pl-[30px] pr-[10px] font-poppins w-full h-[35px] focus:outline-0 rounded-md border-[#cacaca] mt-[5px] border-[1px]' />
                        <i className='top-[57%] translate-y-[-50%] left-[8px] bx bx-search text-[#999] text-[19px] absolute'></i>
                    </div>
                    <span className='font-bold mt-[15px] text-[18px] mb-2 font-poppins w-[100%] '>
                        People
                    </span>
                    <div className='w-full'>
                        {data.user.friends.map((friend, index) => (
                            <div key={index} className='flex justify-between w-full my-2 items-center'>
                                <div className='flex items-center'>
                                    <UserIcon avatar={friend.avatar} />
                                    <span className='font-semibold text-[14px] px-[10px] '>{friend.fullName}</span>
                                </div>
                                {participants.map(item => item._id).includes(friend._id) ?
                                    (<div className='text-[11px] bg-[green] text-[white] py-1 px-1 rounded-md font-semibold'>Added</div>)
                                    :
                                    (<button onClick={() => setParticipants(prev => [...prev, friend])} className='text-[25px] translate-y-[-5px] cursor-pointer'>+</button>)
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreateGroupPage