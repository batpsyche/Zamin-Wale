"use client";

import { usePathname } from "next/navigation";
import PopupEnquiry from "./PopupEnquiry";

export default function PopupEnquiryGate() {
    const pathname = usePathname();
    if (pathname?.startsWith("/admin")) return null;
    return <PopupEnquiry />;
}
