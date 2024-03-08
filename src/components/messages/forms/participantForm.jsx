import React from 'react'

const ParticipantForm = ({ participants }) => {
    return (
        <div style={{ height: participants.length === 0 ? '0' : '400px', width: participants.length === 0 ? '0' : '400px' }} className='z-50 fixed transition-all top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-[red]'>

        </div>
    )
}

export default ParticipantForm