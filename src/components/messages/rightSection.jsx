import React from 'react'
import MessageArea from './messageArea'
import InformationArea from './informationArea'

const RightSection = () => {
    return (
        <section className='w-full h-screen flex'>
            <MessageArea />
            <InformationArea />
        </section>
    )
}

export default RightSection