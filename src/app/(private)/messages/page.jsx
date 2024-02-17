'use client'
import dynamic from 'next/dynamic'
const VideoRoom = dynamic(() => import('@/components/call/videoRoom'), { ssr: false });
import { MessagesContext, ProviderContext } from '@/components/messages/context'
import LeftSection from '@/components/messages/leftSection'
import RightSection from '@/components/messages/rightSection'
import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '@/app/context';

const MesagesPage = () => {

    const { listData, listHandler } = useContext(MessagesContext)
    const { data } = useContext(ThemeContext)

    return (
        <section className='flex h-full'>
            {!listData.joined ?
                (<>
                    <LeftSection />
                    <RightSection />
                </>)
                :
                (<VideoRoom setJoined={listHandler.setJoined} joined={listData.joined} />)
            }
        </section>
    )
}

export default MesagesPage