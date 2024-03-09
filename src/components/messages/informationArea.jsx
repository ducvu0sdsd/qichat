import React, { useContext, useEffect, useRef, useState } from 'react'
import { MessagesContext } from './context'
import { returnImage, returnName, returnRemainingObject } from '@/utils/room'
import { ThemeContext } from '@/app/context'
import { tinhSoPhutCham } from '@/utils/time'
import { TypeHTTP, api } from '@/utils/api'
import UserIcon from '../userIcon'
import { shuffleArray } from '@/utils/other'

const InformationArea = () => {

    const { listData, listHandler } = useContext(MessagesContext)
    const { data, handler } = useContext(ThemeContext)
    const [images, setImages] = useState([])

    useEffect(() => {
        if (listData.displayInfo === true) {
            api({ type: TypeHTTP.GET, sendToken: true, path: `/messages/${listData.currentRoom._id}` })
                .then(media => setImages(media))
        }
    }, [listData.displayInfo, listData.currentRoom])

    return (
        <div style={{ width: `${listData.displayInfo ? '450' : '0'}px`, paddingLeft: listData.displayInfo && '1rem', paddingRight: listData.displayInfo && '1rem' }} className='transition-all relative overflow-y-auto h-screen flex flex-col py-[1rem]'>
            <i onClick={() => listHandler.setDisplayInfo(false)} className='text-[#424242] bx bx-x text-[30px] absolute top-2 cursor-pointer right-2'></i>
            <div className='w-full flex flex-col items-center gap-2'>
                <img src={returnImage(listData.currentRoom, data.user)} className='rounded-full w-[100px] h-[100px]' />
                <div className='flex flex-col items-center'>
                    <span className='text-[19px] font-semibold'>{returnName(listData.currentRoom, data.user)}</span>
                    {listData.currentRoom?.type === 'Group' ?
                        <span className='font-semibold text-[12px]'>{listData.currentRoom?.users.length} Participants</span>
                        :
                        <span className='font-semibold text-[12px]'>{returnRemainingObject(listData.currentRoom, data.user)?.operating.status ? <span className='text-[#3e9042] text-[12px]'>Active Now</span> : `Operated in ${tinhSoPhutCham(returnRemainingObject(listData.currentRoom, data.user)?.operating.time) ? tinhSoPhutCham(returnRemainingObject(listData.currentRoom, data.user).operating.time) : '0 second'} ago`}</span>
                    }
                </div>
            </div>
            {listData.currentRoom?.type === 'Group' && (
                <div className='my-[0.5rem] flex flex-col items-center'>
                    <h2 className='w-full font-semibold font-poppins text-[16px] flex items-center justify-between'>
                        <span>{listData.currentRoom?.users.length} Participants</span>
                        <i className='bx bx-user-plus text-[25px] cursor-pointer'></i>
                    </h2>
                    {shuffleArray(listData.currentRoom?.users)?.map((user, index) => {
                        if (index <= 1) {
                            return <div key={index} className='flex w-full px-4 my-1 items-center '>
                                <UserIcon avatar={user.avatar} operating={user.operating} />
                                <span className='font-semibold px-[5px] text-[14px]'>{user.fullName}</span>
                            </div>
                        }
                    })}
                    <div onClick={() => {
                        listHandler.setParticipants(shuffleArray(listData.currentRoom?.users));
                    }} className='cursor-pointer flex w-full px-4 my-1 items-center '>
                        <UserIcon avatar={'https://cdn3.iconfinder.com/data/icons/zeir-minimalism-1/25/more_dots_three_detail_show-256.png'} />
                        <span className='font-semibold px-[5px] text-[14px]'>{'See All...'}</span>
                    </div>
                </div>
            )}
            {/* <div className='my-[5px] flex flex-col items-center'>
                <h2 className='w-full font-semibold font-poppins text-[16px]'>Attachments</h2>
                <div className='w-full flex items-center gap-2 font-poppins pl-[1rem]'>
                    <i className="fa-solid fa-paperclip text-[20px] text-[#606060]"></i>
                    <span className='text-[15px] my-[4px]'>qiflix - watching free.rar</span>
                </div>
                <div className='w-full flex items-center gap-2 font-poppins pl-[1rem]'>
                    <i className="fa-solid fa-paperclip text-[20px] text-[#606060]"></i>
                    <span className='text-[15px] my-[4px]'>qiflix - watching free.rar</span>
                </div>
                <div className='w-full flex items-center gap-2 font-poppins pl-[1rem]'>
                    <i className="fa-solid fa-paperclip text-[20px] text-[#606060]"></i>
                    <span className='text-[15px] my-[4px]'>qiflix - watching free.rar</span>
                </div>
                <button style={{ backgroundImage: 'url(/bg.webp)' }} className='rounded-md text-[white] font-poppins w-[80%] h-[35px] mt-[5px] shadow'>See All</button>
            </div> */}
            <div className='mt-[0.5rem] flex flex-col items-center'>
                <h2 className='w-full font-semibold font-poppins text-[16px]'>Pictures & Videos</h2>
                {images.length === 0 ?
                    <div className='w-full my-[10px] px-[1rem] mt-[3rem] flex justify-center font-semibold font-poppins'>
                        No Pictures & Videos
                    </div>
                    :
                    <>
                        <div className='w-full grid grid-cols-4 my-[10px] gap-1 px-[1rem] justify-items-center'>
                            {images.map((image, index) => {
                                if (index >= images.length - 8) {
                                    return <div onClick={() => handler.showImage(image)} key={index} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }} className='cursor-pointer aspect-square w-full rounded-md' />
                                }
                            })}
                        </div>
                        <button onClick={() => {
                            listHandler.setPictureVideos(images);
                        }} style={{ backgroundImage: 'url(/bg.webp)' }} className='rounded-md text-[white] font-poppins w-[80%] h-[35px] mt-[5px] shadow'>See All</button>
                    </>
                }
            </div>
        </div>
    )
}

export default InformationArea