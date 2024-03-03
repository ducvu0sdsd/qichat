import React, { useContext, useEffect, useState } from 'react'
import UserIcon from '../userIcon'
import axios from 'axios'
import { TypeHTTP, api } from '@/utils/api'
import { ThemeContext } from '@/app/context'

const FriendsRequestPage = () => {

    const { data, handler } = useContext(ThemeContext)
    const [requests, setRequests] = useState([])

    useEffect(() => {
        api({ type: TypeHTTP.GET, sendToken: true, path: `/requests/${data.user._id}` })
            .then(res => {
                setRequests(res)
            })
    }, [])

    const handleRefuseRequest = (id) => {
        api({ type: TypeHTTP.DELETE, sendToken: true, path: `/requests/${id}` })
            .then(res => setRequests(res))
            .catch(error => console.log(error))
    }

    const handleAcceptRequest = (request) => {
        api({ type: TypeHTTP.POST, sendToken: true, path: `/requests/accept-request`, body: { request } })
            .then(res => {
                handler.setUser(res.user)
                setRequests(res.requests)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='w-[78%] h-screen border-[#e5e5e5] border-r-[1px]'>
            <div className='h-[10%] flex items-center w-full justify-start px-[25px] py-[17px] border-[#e5e5e5] border-b-[px]'>
                <i className='bx bx-user-check text-[30px] text-[#353535] mr-2'></i>
                <span className='font-poppins ml-2 text-[18px] font-bold'>Friends Request</span>
            </div>

            <div className=' h-full relative border-[#e5e5e5] border-t-[1px] py-4'>
                {requests.length !== 0 ?
                    (<>
                        <span className='font-bold text-[20px] font-poppins px-8 '>
                            People
                        </span>
                        <div className='flex mt-[20px] w-[100%] flex-wrap overflow-y-auto h-[450px] content-start gap-[1.5rem] px-[2rem]'>
                            {requests.map((item, index) => (
                                <div key={index} className='flex items-center'>
                                    {console.log(item)}
                                    <UserIcon avatar={item.fromUser.avatar} />
                                    <span className='font-semibold px-[7px] '>{item.fromUser.fullName}</span>
                                    <i onClick={() => handleAcceptRequest(item)} className='bx bx-check text-[22px] cursor-pointer'></i>
                                    <i onClick={() => handleRefuseRequest(item._id)} className='bx bx-x text-[22px] cursor-pointer'></i>
                                </div>
                            ))}
                        </div>
                    </>)
                    :
                    (<div className='font-poppins font-semibold text-[20px] text-[#999] absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>No Friend Requests</div>)
                }
            </div>
        </div>
    )
}

export default FriendsRequestPage