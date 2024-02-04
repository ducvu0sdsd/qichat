import React, { useEffect, useState } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import { VideoPlayer } from './videoPlayer'
import { handleResizeScreenByNumberOfParticipants } from '@/utils/call'

const APP_ID = '8a94359d703244a88967b428b483d7a4'
const TOKEN = '007eJxTYOh+X/Jw8acj89fw52tJx58VLixckVXlcuRUytoFG9hjz6spMFgkWpoYm1qmmBsYG5mYJFpYWJqZJ5kYWSSZWBinmCeaeP3dm9oQyMhQd3guMyMDBIL4bAyFmckZiSUMDADP1yEJ'
const CHANNEL = 'qichat'

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
})

const VideoRoom = ({ setJoined, joined }) => {
    const [users, setUsers] = useState([])
    const [currentTracks, setCurrentTracks] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [mute, setMute] = useState(false)
    const [cam, setCam] = useState(true)

    const handleUserJoined = async (user, mediaType) => {
        await client.subscribe(user, mediaType)

        setCurrentUser(user)

        if (mediaType === 'video') {
            setUsers((prevUsers) => [...prevUsers, user])
        }

        if (mediaType === 'audio') {
            user.audioTrack.play()
        }
    }

    const handleUserLeft = (user) => {
        setUsers(prev => prev.filter(item => item.uid !== user.uid))
    }

    const disconnect = async () => {
        await waitForConnectionState('CONNECTED');
        client.removeAllListeners();
        for (let track of currentTracks) {
            track.stop();
            track.close();
        }
        await client.unpublish(currentTracks);
        await client.leave();
    };

    // useEffect(() => {
    //     if (currentTracks && currentUser) {
    //         if (mute) {
    //             currentUser.audioTrack.stop()
    //         } else {
    //             currentUser.audioTrack.play()
    //         }
    //     }
    // }, [mute])

    // useEffect(() => {
    //     if (currentUser && currentTracks) {
    //         if (!cam) {
    //             currentUser.videoTrack.stop()
    //         } else {
    //             currentUser.videoTrack.play()
    //         }
    //     }
    // }, [cam])


    useEffect(() => {
        client.on('user-published', handleUserJoined)
        client.on('user-left', handleUserLeft)
        if (client.connectionState !== 'CONNECTED' && client.connectionState !== 'CONNECTING') {
            client.join(APP_ID, CHANNEL, TOKEN, null)
                .then((uid) => Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]))
                .then(([tracks, uid]) => {
                    const audioTrack = tracks.filter(item => item._ID.toString().includes('mic'))[0]
                    const videoTrack = tracks.filter(item => item._ID.toString().includes('cam'))[0]
                    setUsers((prevUsers) => [...prevUsers, {
                        uid,
                        videoTrack,
                        audioTrack
                    }])
                    setCurrentTracks(tracks)
                    client.publish(tracks);
                })
                .catch((error) => {
                    console.error("Error joining channel or creating tracks:", error);
                });
        }

    }, [])

    return (
        <div className={`w-[100%] h-full flex flex-col gap-3 py-[1rem]`}>
            <div style={{ gridTemplateColumns: handleResizeScreenByNumberOfParticipants(users.length) }} className={`w-[100%] h-full grid gap-[10px] px-[2rem] justify-items-center justify-center items-center`}>
                {users.map((user) => (
                    <div key={user.uid} className='w-[100%] h-[100%] rounded-lg overflow-hidden'>
                        <VideoPlayer user={user} />
                    </div>
                ))}
            </div>
            <div className='w-full flex justify-center items-center gap-2 h-[60px]'>
                {/* <button onClick={() => setMute(!mute)} style={{ backgroundColor: mute && '#999', color: mute ? 'white' : '#999', border: mute ? '0px' : '1px solid #999' }} className={`h-[50px] w-[50px] flex items-center justify-center text-[white] rounded-full`}>
                    {
                        mute ?
                            (<i className='bx bx-microphone-off text-[20px]'></i>)
                            :
                            (<i className='bx bx-microphone text-[20px]'></i>)
                    }
                </button> */}
                {/* <button onClick={() => setCam(!cam)} style={{ backgroundColor: !cam && '#999', color: !cam ? 'white' : '#999', border: !cam ? '0px' : '1px solid #999' }} className={`h-[50px] w-[50px] flex items-center justify-center text-[white] rounded-full`}>
                    {
                        !cam ?
                            (<i className='bx bx-camera-off text-[20px]'></i>)
                            :
                            (<i className='bx bx-camera text-[20px]'></i>)
                    }
                </button> */}
                <a href='/messages'>
                    <button onClick={() => setJoined(false)} className='h-[50px] w-[50px] flex items-center justify-center bg-[#e52929] text-[white] rounded-full'>
                        <i className='bx bx-phone text-[20px]'></i>
                    </button>
                </a>
            </div>
        </div >
    )
}

export default VideoRoom