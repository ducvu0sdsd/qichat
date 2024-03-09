import React, { useContext } from 'react'
import { MessagesContext } from '../context'
import { ThemeContext } from '@/app/context'

const PictureVideo = ({ pictureVideos }) => {
    const { handler } = useContext(ThemeContext)
    const { listData, listHandler } = useContext(MessagesContext)

    return (
        <div style={{ height: pictureVideos?.length !== 0 ? '500px' : '0', width: pictureVideos?.length !== 0 ? 'auto' : '0' }} className='z-10 fixed transition-all top-[50%] left-[50%] translate-x-[-50%] flex translate-y-[-50%] overflow-hidden rounded-xl bg-slate-50'>
            <div className='row'>
                <div className='p-4'>
                    <span className='font-semibold'>{`Pictures & Videos (${pictureVideos?.length} items)`}</span>
                </div>
                <div className='h-[85%] w-[100% overflow-y-auto'>
                    <div className=' grid grid-cols-5 gap-3 row w-100% justify-center px-3'>
                        {pictureVideos.map((item, index) => {
                            return (
                                <img onClick={() => handler.showImage(item)} key={index} src={item} className='cursor-pointer w-[100px] h-[100px] rounded-lg' />
                            )
                        })}
                    </div>
                </div>

            </div>
            <button onClick={() => listHandler.setPictureVideos([])} className='text-[#999] absolute top-2 right-2'><i className='text-[28px] bx bx-x'></i></button>
        </div>
    )
}

export default PictureVideo