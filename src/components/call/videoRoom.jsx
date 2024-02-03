import React, { useEffect, useState } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import { VideoPlayer } from './videoPlayer'

const APP_ID = '8a94359d703244a88967b428b483d7a4'
const TOKEN = '007eJxTYOh+X/Jw8acj89fw52tJx58VLixckVXlcuRUytoFG9hjz6spMFgkWpoYm1qmmBsYG5mYJFpYWJqZJ5kYWSSZWBinmCeaeP3dm9oQyMhQd3guMyMDBIL4bAyFmckZiSUMDADP1yEJ'
const CHANNEL = 'qichat'

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
})

const VideoRoom = () => {
    const [users, setUsers] = useState([])

    const handleUserJoined = async (user, mediaType) => {
        await client.subscribe(user, mediaType)
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
                        videoTrack
                    }])
                    client.publish(tracks);
                })
                .catch((error) => {
                    console.error("Error joining channel or creating tracks:", error);
                });
        }
    }, [])

    return (
        <div>VideoRoom
            {console.log(users)}
            {users.map((user) => (
                <VideoPlayer key={user.uid} user={user} />
            ))}
        </div>
    )
}

export default VideoRoom