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
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="rounded-md px-3 py-0 bg-transparent hover:text-[#6f272b] hover:bg-white">
                                    <AlignRightIcon className="!size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="divide-y">
                                <SheetHeader className=" px-4">
                                    <SheetTitle>
                                        <div className="flex w-fit">
                                            <Logo className={"text-black"} />
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex w-full flex-col h-[calc(100%-56px)] overflow-y-auto scrollbar-hide">
                                    <ul className="flex flex-col w-full">
                                        {SideNav.map((item, i) =>
                                            item.data ? (
                                                <Accordion
                                                    key={`items-${i}`}
                                                    type="single"
                                                    collapsible
                                                    className="w-full "
                                                >
                                                    <AccordionItem
                                                        key={i}
                                                        value={`item-${i}`}
                                                    >
                                                        <AccordionTrigger className="text-base px-4">
                                                            {item.label}
                                                        </AccordionTrigger>
                                                        <AccordionContent className="px-4">
                                                            <ul className="flex w-full flex-col gap-4 pl-3">
                                                                {item?.data.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => (
                                                                        <li
                                                                            key={`sublinklist-${i}`}
                                                                            className="w-full"
                                                                        >
                                                                            <Link
                                                                                href={
                                                                                    item.link
                                                                                }
                                                                                className="text-sm"
                                                                            >
                                                                                {
                                                                                    item.label
                                                                                }
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            ) : (
                                                <li
                                                    key={`link-${i}`}
                                                    className="flex w-full"
                                                >
                                                    <Link
                                                        href={item.link}
                                                        className="px-4 py-4"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </SheetContent>
                        </Sheet>
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
