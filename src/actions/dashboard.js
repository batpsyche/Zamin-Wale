"use server"

import { fetchWithToken } from "@/services/fetch"

export const getUserProperty = async ({ page, limit }) => {
    let resp = await fetchWithToken(`/user/properties?page=${page}&limit=${limit}`, {
        method: "GET"
    })
    resp = resp.results.data
    return resp
}