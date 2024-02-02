
import PrivateNavbar from '@/components/navbar/privateNavbar'
import React from 'react'

const PrivateLayout = ({ children }) => {
    return (
        <section className='flex'>
            <PrivateNavbar />
            <div>
                {children}
            </div>
        </section>
    )
}

export default PrivateLayout