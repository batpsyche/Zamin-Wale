"use client";

import { getProfile } from "@/actions/user";
import cookieService from "@/services/cookie";
import useZaminwaleStore from "@/store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdminShell from "./AdminShell";

export default function AdminAuthGuard({ children }) {
    const pathname = usePathname();
    const [verified, setVerified] = useState(false);
    const dispatch = useZaminwaleStore((s) => s.dispatch);
    const user = useZaminwaleStore((s) => s.user);

    useEffect(() => {
        if (pathname === "/admin") return;
        const token = cookieService.getAccessToken();
        if (!token) {
            window.location.href = "/admin";
            return;
        }
        getProfile()
            .then((data) => {
                dispatch({ type: "SET_STATE", payload: { user: data, isAuthenticated: true } });
                if (!data?.isAdmin) {
                    window.location.href = "/admin?message=Admin+access+required";
                    return;
                }
                setVerified(true);
            })
            .catch(() => {
                window.location.href = "/admin";
            });
    }, [pathname, dispatch]);

    if (pathname === "/admin") {
        return children;
    }

    // Use a single placeholder until verified (avoids hydration mismatch: server has no
    // cookies so cannot match client token check; never branch on token in render).
    if (!verified) {
        return (
            <div className="flex flex-1 items-center justify-center min-h-[50vh]">
                <p className="text-neutral-600">Checking access…</p>
            </div>
        );
    }

    return <AdminShell>{children}</AdminShell>;
}
