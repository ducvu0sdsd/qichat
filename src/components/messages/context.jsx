'use client'
import { ThemeContext } from "@/app/context";
import { TypeHTTP, api, baseURL } from "@/utils/api";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client'
import ParticipantForm from "./forms/participantForm";
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
    const { data, handler } = useContext(ThemeContext)
    const [participants, setParticipants] = useState([])
    useEffect(() => {
        if (data.user?._id) {
            api({ type: TypeHTTP.GET, sendToken: true, path: `/friends-operating/${data.user?._id}` })
                .then(users => {
                    setFriendsOperation(users)
                })
            socket.on('update-operation-rooms', () => {
                api({ type: TypeHTTP.GET, path: `/rooms/${data.user?._id}`, sendToken: true })
                    .then(rooms => {
                        setRooms(rooms)
                    })
            })
            socket.on('update-operation-friends', () => {
                api({ type: TypeHTTP.GET, sendToken: true, path: `/friends-operating/${data.user?._id}` })
                    .then(users => setFriendsOperation(users))
            })
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

    const listData = {
        joined,
        displayInfo,
        rooms,
        currentRoom,
        messages,
        friendsOperation,
        participants
    }

    const listHandler = {
        setJoined,
        setDisplayInfo,
        setRooms,
        setCurrentRoom,
        setMessages,
        setFriendsOperation,
        setParticipants,
    }

    return (
        <MessagesContext.Provider value={{ listData, listHandler }}>
            <div ref={wrapperRef} onClick={() => { setParticipants([]) }} className="wrapper fixed top-0 left-0 hidden w-screen h-screen z-50" />
            <ParticipantForm participants={participants} />
            {children}
        </MessagesContext.Provider>
    )
}