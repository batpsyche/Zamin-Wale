"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

const BannerImages = [
    { img: "banner-img-1.jpg", alt: "First banner image" },
    { img: "banner-img-2.jpg", alt: "Second banner image" },
    { img: "banner-img-3.jpg", alt: "Third banner image" },
    { img: "banner-img-4.jpg", alt: "Fourth banner image" },
    { img: "banner-img-5.jpg", alt: "Fifth banner image" },
    { img: "banner-img-6.jpg", alt: "Sixth banner image" },
];

const StorySwiper = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-[90%] sm:w-full mx-auto"
            >
                <CarouselContent className="-ml-1">
                    {BannerImages.map((card, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 "
                        >
                            <div className="w-full h-full gap-4 flex flex-col items-center justify-center">
                                <div
                                    onClick={() => setOpen(true)}
                                    className="relative aspect-square border-4 border-[#6f272b] w-3/4 p-0 rounded-full"
                                >
                                    <Image
                                        src={`/assets/banner-img/${card.img}`}
                                        alt={card.alt}
                                        fill
                                        className="object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex gap-0.5 flex-col w-full items-center justify-center">
                                    <span className="text-sm font-medium">
                                        Prime Plots
                                    </span>
                                    <span className="text-xs text-neutral-500 text-center">
                                        Land in Uran, Navi Mumbai
                                    </span>
                                    <span className="text-sm font-bold">
                                        ₹ 8 - 12 L
                                    </span>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="-left-8 sm:left-0 !size-8 !px-1 bg-[#6f272b] text-white" />
                <CarouselNext className="-right-8 sm:right-0 !size-8 !px-1 bg-[#6f272b] text-white" />
            </Carousel>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="py-0 px-0 max-w-sm rounded-lg text-white">
                    <DialogHeader className={"sr-only"}>
                        <DialogTitle>Heading</DialogTitle>
                    </DialogHeader>
                    <div className="flex w-full h-fit">
                        <Carousel
                            plugins={[
                                Autoplay({
                                    delay: 3000,
                                }),
                            ]}
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-1">
                                {BannerImages.map((card, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="pl-1 basis-full"
                                    >
                                        <div className="w-full relative h-full gap-4 flex flex-col">
                                            <div className="relative aspect-[9/16] h-full w-full items-center justify-center p-0 rounded-lg">
                                                <Image
                                                    src={`/assets/banner-img/${card.img}`}
                                                    alt={card.alt}
                                                    fill
                                                    className="object-cover object-center h-full w-full rounded-lg"
                                                />
                                            </div>
                                            <div className="flex absolute h-full flex-col w-full items-center justify-between rounded-lg">
                                                <div className="flex items-start rounded-lg bg-gradient-to-b from-black to-transparent justify-center w-full h-1/5 gap-4 p-4">
                                                    <div className="flex w-[20%]">
                                                        <div className="relative border border-neutral-50 h-fit aspect-video w-14  rounded-sm">
                                                            <Image
                                                                src={`/assets/banner-img/${card.img}`}
                                                                alt={card.alt}
                                                                fill
                                                                className="object-cover rounded-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col w-full">
                                                        <span className="text-sm font-medium text-white">
                                                            Prime Plots
                                                        </span>
                                                        <span className="text-xs text-neutral-200 ">
                                                            Land in Uran, Navi
                                                            Mumbai
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-end rounded-lg bg-gradient-to-t from-black to-transparent justify-center w-full h-1/5 gap-4 p-4">
                                                    <div className="flex w-full">
                                                        <Button className="w-full bg-[#6f272b]">
                                                            View Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-0 md:-left-12 !size-8 !px-1 bg-[#6f272b] text-white" />
                            <CarouselNext className="right-0 md:-right-12 !size-8 !px-1 bg-[#6f272b] text-white" />
                        </Carousel>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default StorySwiper;
