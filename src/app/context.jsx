'use client'
import { TypeHTTP, api } from "@/utils/api";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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
        if (!publicRoutes.includes(pathname)) {
            api({ type: TypeHTTP.POST, sendToken: true, path: '/check-tokens' })
                .catch((error) => {
                    router.push('/')
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