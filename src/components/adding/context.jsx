'use client'
import React, { createContext, useState } from 'react'

export const AddingContext = createContext()

export const layouts = {
    ADD_FRIEND_PAGE: 'a',
    CREATE_GROUP: 'b',
    FRIEND_REQUEST: 'c'
}

export const ProviderContext = ({ children }) => {
    const adding = globalThis.window.localStorage.getItem('adding')
    globalThis.window.localStorage.removeItem('adding')
    const [currentLayout, setCurrentLayout] = useState(adding ? adding : layouts.ADD_FRIEND_PAGE)
    const listData = {
        currentLayout
    }

    const listHandler = {
        setCurrentLayout
    }

    return (
        <AddingContext.Provider value={{ listData, listHandler }}>
            {children}
        </AddingContext.Provider>
    )
}