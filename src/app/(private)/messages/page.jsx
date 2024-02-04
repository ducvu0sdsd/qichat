'use client'
import VideoRoom from '@/components/call/videoRoom'
import { MessagesContext, ProviderContext } from '@/components/messages/context'
import LeftSection from '@/components/messages/leftSection'
import RightSection from '@/components/messages/rightSection'
import React, { useContext } from 'react'

const MesagesPage = () => {

    const { listData, listHandler } = useContext(MessagesContext)

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