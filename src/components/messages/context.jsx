'use client'
import { ThemeContext } from "@/app/context";
import { TypeHTTP, api, baseURL } from "@/utils/api";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client'
import ParticipantForm from "./forms/participantForm";
import PictureVideo from "./forms/picturevideo";
const socket = io.connect(baseURL)
export const MessagesContext = createContext();

export const ProviderContext = ({ children }) => {
    const wrapperRef = useRef()
    const [joined, setJoined] = useState(false)
    const [rooms, setRooms] = useState([])
    const [friendsOperation, setFriendsOperation] = useState([])
    const [currentRoom, setCurrentRoom] = useState()
    const [displayInfo, setDisplayInfo] = useState(false)
    const [messages, setMessages] = useState([])
    const [usersSeen, setUsersSeen] = useState([])
    const { data, handler } = useContext(ThemeContext)
    const [participants, setParticipants] = useState([])
    const [pictureVideos, setPictureVideos] = useState([])
    const [reply, setReply] = useState()

    useEffect(() => {
        console.log(usersSeen)
    }, [usersSeen])

    useEffect(() => {
        socket.on(`update_seen_${currentRoom?._id}`, (data) => {
            setUsersSeen(data.users)
        })
        return () => {
            socket.off(`update_seen_${currentRoom?._id}`)
        }
    }, [currentRoom])

    useEffect(() => {
        if (data.user?._id) {
            api({ type: TypeHTTP.GET, sendToken: true, path: `/friends-operating/${data.user?._id}` })
                .then(users => {
                    setFriendsOperation(users)
                })
            socket.on('update-operation-rooms', (body) => {
                if (body.friends_id?.includes(data.user?._id)) {
                    api({ type: TypeHTTP.GET, path: `/rooms/${data.user?._id}`, sendToken: true })
                        .then(rooms => {
                            setRooms(rooms)
                        })
                }
            })
            socket.on('update-operation-friends', (body) => {
                if (body.friends_id?.includes(data.user?._id)) {
                    api({ type: TypeHTTP.GET, sendToken: true, path: `/friends-operating/${data.user?._id}` })
                        .then(users => setFriendsOperation(users))
                }
            })
        }

        return () => {
            socket.off('update-operation-rooms')
            socket.off('update-operation-friends')
        }
    }, [data.user?._id])

    useEffect(() => {
        if (currentRoom?._id)
            api({ type: TypeHTTP.GET, path: `/get-messages-by-room/${currentRoom?._id}`, sendToken: true })
                .then(messages => {
                    setMessages(messages)
                })
                .catch(error => console.log(error))
    }, [currentRoom, data.user?._id])

    useEffect(() => {
        if (participants.length === 0) {
            wrapperRef.current.style.display = 'none'
        } else {
            wrapperRef.current.style.display = 'block'
        }
    }, [participants])

    useEffect(() => {
        if (pictureVideos.length === 0) {
            wrapperRef.current.style.display = 'none'
        } else {
            wrapperRef.current.style.display = 'block'
        }
    }, [pictureVideos])

    const listData = {
        joined,
        displayInfo,
        rooms,
        currentRoom,
        messages,
        friendsOperation,
        participants,
        pictureVideos,
        reply,
        usersSeen
    }

    const listHandler = {
        setUsersSeen,
        setJoined,
        setDisplayInfo,
        setRooms,
        setCurrentRoom,
        setMessages,
        setFriendsOperation,
        setParticipants,
        setPictureVideos,
        setReply
    }

    return (
        <MessagesContext.Provider value={{ listData, listHandler }}>
            <div ref={wrapperRef} onClick={() => { setParticipants([]); setPictureVideos([]) }} className="wrapper fixed top-0 left-0 hidden w-screen h-screen z-40" />
            <ParticipantForm participants={participants} />
            <PictureVideo pictureVideos={pictureVideos} />
            {children}
        </MessagesContext.Provider>
    )
}