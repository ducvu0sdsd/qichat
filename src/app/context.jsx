'use client'
import Notification from "@/components/notification";
import FormInformation from "@/components/user/formInformation";
import { TypeHTTP, api, baseURL } from "@/utils/api";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client'
const socket = io.connect(baseURL)
export const ThemeContext = createContext();

export const notifyType = {
    SUCCESS: 'success',
    FAIL: 'fail',
    WARNING: 'warning',
    LOADING: 'loading',
    NONE: 'none'
}

export const ProviderContext = ({ children }) => {
    const pathname = usePathname()
    const router = useRouter();
    const wrapperRef = useRef()
    const publicRoutes = ['/', '/sign-in', '/sign-up', '/sign-up/verification', '/sign-up/information', '/sign-up/email-verification']
    const [user, setUser] = useState()
    const [info, setInfo] = useState({ status: notifyType.NONE, message: '' })
    const [userInformation, setUserInformation] = useState()
    const [urlImage, setUrlImage] = useState('')
    const [urlVideo, setUrlVideo] = useState('')

    useEffect(() => {
        if (info.status !== notifyType.NONE) {
            if (info.status !== notifyType.LOADING) {
                setTimeout(() => {
                    setInfo({ status: notifyType.NONE, message: '' })
                }, 3000);
            }
        }
    }, [info.status])

    useEffect(() => {
        const onBeforeUnload = (ev) => {
            socket.emit('close_operating', { _id: user._id, operating: { status: false, time: new Date() } })
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
                    api({ type: TypeHTTP.PUT, sendToken: false, path: `/users/${user._id}`, body: user })
                        .then(res => {
                            socket.emit('update-room')
                        })
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

    const notify = (status, message) => setInfo({ status, message })


    const showWrapper = () => {
        wrapperRef.current.style.display = 'block'
    }

    const hiddenWrapper = () => {
        wrapperRef.current.style.display = 'none'
    }

    const showUserInformation = (userInfo) => {
        showWrapper()
        setUserInformation(userInfo)
    }

    const hiddenUserInformation = (userInfo) => {
        hiddenWrapper()
        setUserInformation(undefined)
    }

    const showImage = (path) => {
        showWrapper()
        setUrlImage(path)
    }

    const hiddenImage = () => {
        hiddenWrapper()
        setUrlImage('')
    }

    const showVideo = (path) => {
        showWrapper()
        setUrlVideo(path)
    }

    const hiddenVideo = () => {
        hiddenWrapper()
        setUrlVideo('')
    }

    const data = {
        user
    }

    const handler = {
        setUser,
        notify,
        showUserInformation,
        hiddenUserInformation,
        showImage,
        hiddenImage,
        showWrapper,
        hiddenWrapper,
        showVideo,
        hiddenVideo
    }

    return (
        <ThemeContext.Provider value={{ data, handler }}>
            {children}
            <div ref={wrapperRef} onClick={() => { hiddenUserInformation(); hiddenImage(); hiddenVideo() }} className="wrapper fixed top-0 left-0 hidden w-screen h-screen z-50" />
            <Notification status={info.status} message={info.message} />
            <FormInformation user={userInformation} />
            <img src={urlImage} className="max-w-[400px] max-h-[500px] z-50 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
            <video src={urlVideo} style={{ display: urlVideo === '' ? 'none' : 'block' }} controls className="max-w-[400px] max-h-[500px] z-40 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
        </ThemeContext.Provider>
    )
} 