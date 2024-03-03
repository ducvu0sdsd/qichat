'use client'
import { ThemeContext } from "@/app/context";
import { TypeHTTP, api, baseURL } from "@/utils/api";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from 'socket.io-client'
const socket = io.connect(baseURL)
export const MessagesContext = createContext();

export const ProviderContext = ({ children }) => {
    const [joined, setJoined] = useState(false)
    const [rooms, setRooms] = useState([])
    const [friendsOperation, setFriendsOperation] = useState([])
    const [currentRoom, setCurrentRoom] = useState()
    const [displayInfo, setDisplayInfo] = useState(false)
    const [messages, setMessages] = useState([])
    const { data } = useContext(ThemeContext)


    useEffect(() => {
        if (data.user) {
            socket.on('update-operation', () => {
                api({ type: TypeHTTP.GET, path: `/rooms/${data.user?._id}`, sendToken: true })
                    .then(rooms => {
                        setRooms(rooms)
                    })
                    .catch(error => console.log(error))
                api({ type: TypeHTTP.GET, sendToken: true, path: `/friends-operating/${data.user?._id}` })
                    .then(users => setFriendsOperation(users))
                    .catch(error => { })
            })
        }
    }, [data.user])

    useEffect(() => {
        api({ type: TypeHTTP.GET, path: `/get-messages-by-room/${currentRoom?._id}`, sendToken: true })
            .then(messages => {
                setMessages(messages)
            })
            .catch(error => console.log(error))
    }, [currentRoom, data.user?._id])

    const listData = {
        joined,
        displayInfo,
        rooms,
        currentRoom,
        messages,
        friendsOperation
    }

    const listHandler = {
        setJoined,
        setDisplayInfo,
        setRooms,
        setCurrentRoom,
        setMessages,
        setFriendsOperation
    }

    return (
        <MessagesContext.Provider value={{ listData, listHandler }}>
            {children}
        </MessagesContext.Provider>
    )
}