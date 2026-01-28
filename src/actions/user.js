"use server"

import { fetchWithoutToken, fetchWithToken } from "@/services/fetch";
import { cookies } from "next/headers";

export const signUp = async (body) => {
    let resp = await fetchWithoutToken("/client/signup", {
        method: "POST",
        body: JSON.stringify(body),
    })
    resp = resp.results.data
    return resp
}

export const logIn = async (body) => {
    let resp = await fetchWithoutToken("/client/login", {
        method: "POST",
        body: JSON.stringify(body),
    })
    resp = resp.results.data
    return resp
}

export const logOut = async () => {
    const cookieStore = await cookies()
    cookieStore.delete(`${process.env.NEXT_PUBLIC_COOKIE_KEY}_access`)
}

export const getProfile = async (fallbackToken) => {
    let resp = await fetchWithToken("/user/profile", {
        mehtod: "GET",
        fallbackToken
    })
    resp = resp.results.data
    return resp
}