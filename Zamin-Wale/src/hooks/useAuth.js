"use client"

import { getProfile } from "@/actions/user";
import cookieService from "@/services/cookie";
import useZaminwaleStore from "@/store";
import { useEffect, useState } from "react";

const useAuth = ({ onSuccess = null, onError = null } = {}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const user = useZaminwaleStore((store) => store?.user || null);
    const dispatch = useZaminwaleStore((store) => store.dispatch);

    useEffect(() => {
        const token = cookieService.getAccessToken();

        if (!!user) {
            setIsAuthenticated(true);
            if (onSuccess) onSuccess(user);
        }
        else if (token) {
            getProfile(token)
                .then((fetchedUser) => {
                    setIsAuthenticated(true);
                    dispatch({
                        type: "SET_STATE",
                        payload: {
                            user: fetchedUser,
                            isAuthenticated: true,
                        },
                    });
                    if (onSuccess) onSuccess(fetchedUser);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                    if (onError) onError();
                });
        }
        else {
            setIsAuthenticated(false);
            if (onError) onError();
        }

        return () => {
            setIsAuthenticated(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, onSuccess, onError, dispatch, isAuthenticated]);

    return { isAuthenticated };
};

export default useAuth;
