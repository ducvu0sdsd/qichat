'use client'
import { createContext, useState } from "react";

export const MessagesContext = createContext();

export const ProviderContext = ({ children }) => {
    const [joined, setJoined] = useState(false)

    const listData = {
        joined
    }

    const listHandler = {
        setJoined
    }

    return (
        <MessagesContext.Provider value={{ listData, listHandler }}>
            {children}
        </MessagesContext.Provider>
    )
}