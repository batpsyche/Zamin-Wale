"use client";

import { AlignRightIcon } from "lucide-react";
import Link from "next/link";
import Logo from "../atoms/Logo";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";

const Navbar = () => {
    return (
        <header className="flex sticky top-0 z-20 w-full bg-[#6f272b]">
            <div className="flex w-full h-16 items-center max-w-[1480px] mx-auto gap-4 px-4">
                <div className="flex h-fit w-fit">
                    <Link href={"/"}>
                        <Logo />
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end h-full w-full gap-4">
                    <div className="flex flex-grow items-center md:gap-4 justify-end">
                        {/*
                          Hamburger / mobile sheet menu hidden for now.
                          Re-enable by restoring the <Sheet> block.
                        */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

const SideNav = [
    {
        label: "Company",
        data: [
            {
                label: "Testimonials",
                link: "/testimonials",
            },
            {
                label: "Terms & Conditions",
                link: "/terms-and-conditions",
            },
            {
                label: "Privacy Policy",
                link: "/privacy-policy",
            },
            {
                label: "Carrers",
                link: "/carrers",
            },
            {
                label: "Blog",
                link: "/blog",
            },
            {
                label: "Awards & Media",
                link: "/awards-and-media",
            },
            {
                label: "Booking & saledeed",
                link: "/booking-and-saledeed",
            },
        ],
    },
];
