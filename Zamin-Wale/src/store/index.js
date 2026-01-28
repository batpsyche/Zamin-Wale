import { create } from "zustand"
import { devtools, redux } from "zustand/middleware"
import { reducer } from "./reducer"

export const initialState = {
    user: null,
    isAuthenticated: false,
    searchList: null,
    propertyList: null,
    popupEnquiry: true,
}

const useZaminwaleStore = create(
    devtools(redux(reducer, initialState), {
        name: "useZaminwaleStore",
        enabled:
            (typeof window !== "undefined" &&
                Boolean(window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"])) ||
            process.env.VERCEL_ENV !== "production",
    })
)

export default useZaminwaleStore