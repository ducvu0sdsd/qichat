'use client'
import { TypeHTTP, api, baseURL } from "@/utils/api";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { io } from 'socket.io-client'
const socket = io.connect(baseURL)
export const ThemeContext = createContext();

export const notifyType = {
    SUCCESS: 'success',
    FAIL: 'fail',
    WARNING: 'warning'
}

export const ProviderContext = ({ children }) => {
    const pathname = usePathname()
    const router = useRouter();
    const publicRoutes = ['/', '/sign-in', '/sign-up', '/sign-up/verification', '/sign-up/information', '/sign-up/email-verification']
    const [user, setUser] = useState()
    const notify = ({ type, message }) => {
        switch (type) {
            case type === notifyType.SUCCESS:
                toast.success(message)
        }
    }
    useEffect(() => {
        const onBeforeUnload = (ev) => {
            let userUpdate = user
            userUpdate.operating = { status: false, time: new Date() }
            socket.emit('close_operating', userUpdate)
            socket.emit('update-room')
        };
        globalThis.window.addEventListener("beforeunload", onBeforeUnload);

        return () => {
            globalThis.window.addEventListener("beforeunload", onBeforeUnload);
        }
    }, [pathname, user]);

    useEffect(() => {
        if (!publicRoutes.includes(pathname)) {
            api({ type: TypeHTTP.GET, sendToken: true, path: '/get-user-by-tokens' })
                .then(user => {
                    setUser(user)
                    user.operating = {
                        status: true,
                        time: new Date()
                    }
                    socket.emit('update-room')
                    api({ type: TypeHTTP.PUT, sendToken: false, path: `/users/${user._id}`, body: user })
                })
                .catch((error) => {
                    globalThis.window.localStorage.removeItem('accessToken')
                    globalThis.window.localStorage.removeItem('refreshToken')
                    router.push('/')
                })
        } else {
            api({ type: TypeHTTP.GET, sendToken: true, path: '/get-user-by-tokens' })
                .then(user => {
                    setUser(user)
                    router.push('/messages')
                })
        }
    }, [pathname])

    const data = {
        user
    }

    const handler = {
        setUser,
        notify
    }

    return (
        <ThemeContext.Provider value={{ data, handler }}>
            <Toaster toastOptions={{ duration: 4000 }} />
            {children}
        </ThemeContext.Provider>
    )
} 