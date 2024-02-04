'use client'
import { createContext, useState } from "react";

export const MessagesContext = createContext();

export const ProviderContext = ({ children }) => {
    const [joined, setJoined] = useState(false)
    const [displayInfo, setDisplayInfo] = useState(false)

    const listData = {
        joined,
        displayInfo
    }

    const listHandler = {
        setJoined,
        setDisplayInfo
    }

    return (
        <MessagesContext.Provider value={{ listData, listHandler }}>
            {children}
        </MessagesContext.Provider>
    )
}