"use client"

import { getProfile } from "@/actions/user"
import Loading from "@/components/atoms/Loading"
import cookieService from "@/services/cookie"
import useZaminwaleStore from "@/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useZaminwaleStore(store => store.dispatch)
    const router = useRouter()

    useEffect(() => {
        setLoading(true)

        const token = cookieService.getAccessToken()

        if (token) {
            getProfile(token)
                .then(user => {
                    dispatch({
                        type: "SET_STATE",
                        payload: { user, isAuthenticated: true }
                    })
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err.message)
                    toast.error(err.message)
                })
        } else {
            setLoading(false)
            dispatch({
                type: "SET_STATE",
                payload: { isAuthenticated: false }
            })
            router.push("/auth/register")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, router])

    return (
        <>
            {
                loading ? (
                    <div className="flex flex-1 bg-white h-full w-screen items-center justify-center">
                        <Loading />
                    </div>
                ) : (
                    children
                )
            }
        </>
    )
}

export default AuthProvider
