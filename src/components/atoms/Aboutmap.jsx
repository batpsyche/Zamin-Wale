"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const MAP = "/assets/about/map.PNG";

const Aboutmap = () => {
    const [open, setOpen] = useState();

    return (
        <div className="w-full items-center justify-center flex">
            <div
                onClick={() => setOpen(true)}
                className="relative aspect-video max-w-3xl w-full flex bg-no-repeat lg:rounded-3xl lg:overflow-hidden"
            >
                <Image
                    src={MAP}
                    alt="banner-img"
                    fill
                    className="object-cover md:object-cover object-center h-full w-full"
                />
            </div>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogContent className="max-w-5xl">
                    <DialogHeader>
                        <DialogTitle>Map</DialogTitle>
                    </DialogHeader>
                    <div className="flex relative aspect-[5/3] w-full">
                        <Image
                            src={MAP}
                            alt="banner-img"
                            fill
                            className="object-cover object-center h-full w-full"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Aboutmap;
