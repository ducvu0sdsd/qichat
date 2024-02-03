// 'use client'
// import dynamic from 'next/dynamic'
// const VideoRoom = dynamic(() => import('@/components/call/videoRoom'), { ssr: false });
// import React, { useState } from 'react'

// const HomePage = () => {

//     const [joined, setJoined] = useState(false)

//     return (
//         <div className='w-full flex flex-col items-center justify-center h-screen' >
//             <h1>QiChat</h1>
//             {!joined && (<button onClick={() => setJoined(true)}>Join</button>)}
//             {joined && (<VideoRoom />)}
//         </div>
//     )
// }

// export default HomePage

import React from 'react'

const HomePage = () => {
    return (
        <div>HomePage</div>
    )
}

export default HomePage