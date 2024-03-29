'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MessageSection from './messageSection'
import UserIcon from '../userIcon'
import { MessagesContext } from './context'
import { TypeHTTP, api, baseURL } from '@/utils/api'
import { returnID, returnImage, returnName, returnRemainingObject } from '@/utils/room'
import { ThemeContext, notifyType } from '@/app/context'
import Logo from '../logo'
import { tinhSoPhutCham } from '@/utils/time'
import { io } from 'socket.io-client'
import { checkBlock } from '@/utils/other'
const socket = io.connect(baseURL)

const types = {
    TEXT: 'text',
    IMAGE: 'image',
    VIDEO: 'video',
    RECORD: 'record'
}

const MessageArea = () => {

    const { listData, listHandler } = useContext(MessagesContext)
    const { data, handler } = useContext(ThemeContext)
    const messageRef = useRef()
    const replyRef = useRef()
    const [information, setInformation] = useState('')
    const [images, setImages] = useState([])
    const [videos, setVideos] = useState([])
    const [request, setRequest] = useState()
    const [typeInput, setTypeInput] = useState(types.IMAGE)
    const [replyHeight, setReplyHeight] = useState(0)
    const [updateSeen, setUpdateSeen] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        globalThis.window.localStorage.removeItem('userForCurrentRoom')
        let updated = false
        if (listData.currentRoom && listData.messages.length > 1) {
            const user = listData.currentRoom.users.filter(item => item._id === data.user?._id)[0]
            if (user.seen !== listData.messages[listData.messages.length - 1]._id) {
                socket.emit('update_seen', { room_id: listData.currentRoom._id, user_id: data.user?._id, seen: listData.messages[listData.messages.length - 1]._id, users: listData.currentRoom.users.map(item => item._id) })
            } else {
                listHandler.setUsersSeen(listData.currentRoom.users)
            }
        }
        if (updated === false)
            listHandler.setUsersSeen(listData.currentRoom?.users)
    }, [listData.messages, listData.currentRoom])

    useEffect(() => {
        api({ type: TypeHTTP.POST, sendToken: true, path: '/requests/get-by-2-user', body: { user_id1: returnID(listData.currentRoom, data.user), user_id2: data.user?._id } })
            .then(req => setRequest(req))
    }, [listData.currentRoom])

    useEffect(() => setReplyHeight(replyRef.current?.offsetHeight), [listData.reply])

    useEffect(() => {
        setTimeout(() => {
            messageRef.current?.scrollTo({
                top: messageRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }, 500);
    }, [listData.messages?.length])

    useEffect(() => {
        socket.on(listData.currentRoom?._id, (messages) => {
            if (listData.currentRoom?._id === messages[0].room_id) {
                listHandler.setMessages(messages)
            }
        })

        return () => {
            socket.off(listData.currentRoom?._id);
        }
    }, [socket, listData.currentRoom])

    useEffect(() => {
        if (images.length === 0 && videos.length === 0)
            setTypeInput(types.TEXT)
    }, [images.length, videos.length])

    const sendMessage = () => {
        if (typeInput === types.TEXT) {
            if (information.trim() !== '') {
                const body = {
                    room_id: listData.currentRoom._id,
                    reply: {
                        _id: listData.reply ? listData.reply?._id : null,
                        information: listData.reply ? listData.reply?.information : null
                    },
                    information,
                    typeMessage: 'text',
                    user_id: data.user._id,
                    users: listData.currentRoom?.users.map(item => item._id)
                }
                socket.emit('send_message', body)
                listHandler.setMessages([...listData.messages, body])
                setInformation('')
                listHandler.setReply(undefined)
            }
        }
        else {
            const formData = new FormData();
            // Thêm các trường dữ liệu vào formData
            formData.append('room_id', listData.currentRoom._id);
            formData.append('reply', null);
            formData.append('typeMessage', typeInput);
            formData.append('user_id', data.user._id);

            // Gom tất cả các file hình ảnh vào một mảng và thêm vào formData
            if (typeInput === types.IMAGE) {
                const imageFiles = images.map(item => item.file);
                imageFiles.forEach((file, index) => {
                    formData.append(`information`, file);
                });
            } else if (typeInput === types.VIDEO) {
                const videoFiles = videos.map(item => item.file);
                videoFiles.forEach((file, index) => {
                    formData.append(`information`, file);
                });
            }

            api({ body: formData, path: '/messages', type: TypeHTTP.POST, sendToken: true })
                .then(res => {
                    if (images.length > 0) {
                        socket.emit('update-message', { room_id: listData.currentRoom._id, information: images.length, type: 'image' })
                    } else if (videos.length > 0) {
                        socket.emit('update-message', { room_id: listData.currentRoom._id, information: videos.length, type: 'video' })
                    }
                    setImages([])
                    setVideos([])
                    listHandler.setReply(undefined)
                })
        }
        setUpdateSeen(!updateSeen)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage()
        }
    };


    const handleFiles = (e) => {
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            if (files[i]) {
                const url = URL.createObjectURL(files[i])
                const file = files[i]
                if (file.type.split('/')[0] === 'image') {
                    setVideos([])
                    setTypeInput(types.IMAGE)
                    setImages(prev => {
                        return [...prev, {
                            path: url,
                            file: file
                        }]
                    })
                } else if (file.type.split('/')[0] === 'video') {
                    setImages([])
                    setTypeInput(types.VIDEO)
                    setVideos(prev => {
                        return [...prev, {
                            path: url,
                            file: file
                        }]
                    })
                }
            }
        }
        e.target.value = ''
    }

    const handleShowUserInformation = (id) => {
        api({ sendToken: true, type: TypeHTTP.GET, path: `/users/${id}` })
            .then(user => handler.showUserInformation(user))
    }

    const handleCreateRequest = () => {
        const fromUser = {
            _id: data.user._id,
            fullName: data.user.fullName,
            avatar: data.user.avatar
        }
        const toUser = {
            _id: returnID(listData.currentRoom, data.user),
            fullName: returnName(listData.currentRoom, data.user),
            avatar: returnRemainingObject(listData.currentRoom, data.user)?.avatar
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

    const handleAcceptRequest = () => {
        api({ type: TypeHTTP.POST, sendToken: true, path: `/requests/accept-request`, body: { request } })
            .then(res => {
                handler.setUser(res.user)
                setRequest(undefined)
                socket.emit('update-room', data.user?.friends(item => item._id))
                handler.notify(notifyType.SUCCESS, 'Accept Request Successfully')
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='h-full w-full transition-all border-[#e5e5e5] border-r-[1px] flex flex-col'>
            <input onChange={handleFiles} ref={inputRef} multiple type='file' style={{ display: 'none' }} />
            {listData.currentRoom ?
                <>
                    <div className=' flex items-center h-[10%] w-full justify-between px-[15px] py-2 border-[#e5e5e5] border-b-[1px]'>
                        <div className='flex'>
                            <div onClick={() => handleShowUserInformation(returnRemainingObject(listData.currentRoom, data.user)?._id)} className='cursor-pointer'><UserIcon operating={returnRemainingObject(listData.currentRoom, data.user)?.operating.status} avatar={returnImage(listData.currentRoom, data.user)} /></div>
                            <div className='flex flex-col ml-[10px]'>
                                <span className='font-semibold text-[15px] h-[22px]'>
                                    {returnName(listData.currentRoom, data.user)}
                                    {/* {!data.user?.friends.map(item => item._id).includes(returnID(listData.currentRoom, data.user)) &&
                                        <>
                                            {!request ? <button onClick={() => handleCreateRequest()} style={{ backgroundImage: 'url(/bg.webp)' }} className='ml-3 text-[white] py-1 px-2 text-[12px] rounded-lg'>Add Friend</button>
                                                :
                                                request.toUser._id === data.user?._id ?
                                                    <>
                                                        <button onClick={() => handleAcceptRequest(request)} className='text-[12px] bg-[#24be24] font-poppins py-1 ml-3 px-3 text-[white] rounded-lg font-semibold'>Accept</button>
                                                        <button onClick={() => handleRefuseRequest(request._id)} className='text-[12px] bg-[red] font-poppins py-1 ml-1 px-3 text-[white] rounded-lg font-semibold'>Refuse</button>
                                                    </>
                                                    :
                                                    <button className='text-[12px] bg-[green] font-poppins py-1 px-3 text-[white] rounded-lg font-semibold ml-3'>Friend request sent</button>
                                            }
                                        </>
                                    } */}
                                </span>
                                {listData.currentRoom.type !== 'Group' ?
                                    data.user.friends.map(item => item._id).includes(returnID(listData.currentRoom, data.user)) ?
                                        <span className='font-semibold text-[12px]'>{returnRemainingObject(listData.currentRoom, data.user).operating.status ? <span className='text-[#3e9042] text-[12px]'>Active Now</span> : `Operated in ${tinhSoPhutCham(returnRemainingObject(listData.currentRoom, data.user).operating.time) ? tinhSoPhutCham(returnRemainingObject(listData.currentRoom, data.user).operating.time) : '0 second'} ago`}</span>
                                        :
                                        <span className='font-semibold text-[12px] text-[green]'>Stranger</span>
                                    :
                                    <span className='font-semibold text-[12px]'>{listData.currentRoom.users.length} participants</span>
                                }
                            </div>
                        </div>
                        <div className='text-[30px] flex gap-2 text-[#3f3f3f]'>
                            <i onClick={() => sayHello()} className='bx bx-phone cursor-pointer' ></i>
                            <i onClick={() => listHandler.setJoined(true)} className='bx bx-video cursor-pointer' ></i>
                            <i onClick={() => listHandler.setDisplayInfo(!listData.displayInfo)} className='bx bx-info-circle cursor-pointer' ></i>
                        </div>
                    </div>
                    <div ref={messageRef} className='h-[80%] relative w-full px-[1rem] py-[0.5rem] overflow-y-auto message'>
                        {listData.messages.length === 0 ?
                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] flex flex-col items-center gap-3 translate-y-[-50%] text-center text-[20px]'>
                                <img src={returnImage(listData.currentRoom, data.user)} className='w-[200px] h-[200px] rounded-full' />
                                <span>{"You don't have a message with"} {returnName(listData.currentRoom, data.user)} yet, start messaging now !!!</span>
                            </div>
                            :
                            <>
                                {listData.messages.map((message, index) => (
                                    <MessageSection handleShowUserInformation={handleShowUserInformation} style={message.user_id !== data.user._id ? 'start' : 'end'} message={message} key={index} />
                                ))}
                            </>
                        }
                    </div>
                    {checkBlock(data.user, returnRemainingObject(listData.currentRoom, data.user)) === null ?
                        <div className='relative w-full px-[1rem] flex items-center'>
                            <div style={{ top: listData.reply ? `-${replyHeight}px` : '10px' }} className='px-3 flex items-center text-[13px] bg-[#f6f6f6] w-[auto] transition-all rounded-xl absolute left-[1rem]'>
                                <i className="fa-solid cursor-pointer text-[16px] fa-reply text-[#1097ff] mr-2"></i>
                                <span ref={replyRef} style={{ overflowWrap: 'break-word' }} className='max-w-[600px] py-2'>{listData.reply?.information}</span>
                                <i onClick={() => listHandler.setReply(undefined)} className='bx bx-x text-[22px] ml-3 cursor-pointer text-[#999]'></i>
                            </div>
                            {typeInput === types.TEXT ?
                                <>
                                    <i className='z-20 absolute cursor-pointer text-[20px] text-[#999] left-[27px] bx bx-microphone' ></i>
                                    <input onKeyDown={handleKeyDown} onChange={e => setInformation(e.target.value)} value={information} placeholder='Type your message...' type='text' className='pr-[65px] z-0 text-[14px] rounded-md focus:outline-0 pl-[35px] w-full h-[45px] border-[#f1f1f1] border-[2px]' />
                                </>
                                :
                                typeInput === types.IMAGE ?
                                    <div className='pr-1 z-20 flex gap-2 bg-[white] items-center rounded-md focus:outline-0 pl-1 w-full h-[60px] border-[#f1f1f1] border-[2px]'>
                                        {images.map((image, index) => {
                                            return <div key={index} className='relative'>
                                                <img key={index} src={image.path} className='h-[45px] rounded-lg transition-all' />

                                                <div onClick={() => setImages(prev => prev.filter(i => i.path !== image.path))}
                                                    className='absolute top-[-5px] cursor-pointer right-[-5px] h-[17px] w-[17px] flex justify-center items-center z-10 bg-[black] rounded-full'>
                                                    <i className='text-[white] bx bx-x'></i>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    :
                                    <div className='pr-1 z-20 flex gap-2 bg-[white] items-center rounded-md focus:outline-0 pl-1 w-full h-[60px] border-[#f1f1f1] border-[2px]'>
                                        {videos.map((video, index) => {
                                            return <div key={index} className='relative'>
                                                <video key={index} src={video.path} className='h-[45px] rounded-lg transition-all' />

                                                <div onClick={() => setVideos(prev => prev.filter(i => i.path !== video.path))}
                                                    className='absolute top-[-5px] cursor-pointer right-[-5px] h-[17px] w-[17px] flex justify-center items-center z-10 bg-[black] rounded-full'>
                                                    <i className='text-[white] bx bx-x'></i>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                            }
                            <div className='absolute right-6 flex gap-1 z-20 items-center'>
                                <i onClick={() => inputRef.current.click()} className=" text-[20px] cursor-pointer text-[rgb(168,168,168)] fa-solid fa-paperclip"></i>
                                <i onClick={() => sendMessage()} className='bx bx-send text-[23px] cursor-pointer text-[#a5a5a5]'></i>
                            </div>
                        </div>
                        :
                        <div className='w-full flex justify-center items-center translate-y-[70%] font-semibold text-[#999]'>
                            <i className='bx bx-block text-[25px] mr-1'></i> {checkBlock(data.user, returnRemainingObject(listData.currentRoom, data.user))}
                        </div>
                    }
                </>
                :
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <Logo />
                    <span className='text-[18px]'>{"It's A Good Platform For Message Sharing!!!"}</span>
                </div>
            }
        </div >
    )
}

export default MessageArea