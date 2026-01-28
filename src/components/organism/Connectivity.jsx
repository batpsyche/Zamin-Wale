"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import Autoplay from "embla-carousel-autoplay";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../ui/dialog";

const YoutubeLinks = [
    {
        videoId: "kupu6t-46S0",
        videoImg: "kupu6t-46S0hd.jpg",
        label: "Navi Mumbai International Airport",
    },
    {
        videoId: "WGKXgIOJLD0",
        videoImg: "WGKXgIOJLD0hd.jpg",
        label: "Sewri - Nhava Sheva Sealink",
    },
    {
        videoId: "VUROQlxtHtQ",
        videoImg: "VUROQlxtHtQhq.jpg",
        label: "Alibaug to Virar Multimodel Corridor",
    },
    {
        videoId: "cDAZKHC0YCA",
        videoImg: "cDAZKHC0YCAhd.jpg",
        label: "JNPT Port",
    },
    {
        videoId: "g7XSpnQ7CVs",
        videoImg: "g7XSpnQ7CVshd.jpg",
        label: "Belapur to Uran, Panvel to Uran Railway Connectivity",
    },
];

const Connectivity = () => {
    return (
        <>
            <div className="flex w-full bg-fixed bg-cover bg-no-repeat bg-[url('/assets/banner-img/connectivity-bg.webp')]">
                <div className="flex flex-col gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-10 xl:py-12">
                    <div className="flex w-full">
                        <h2 className="text-lg font-bold md:text-xl lg:text-2xl text-white">
                            Connectivity
                        </h2>
                    </div>
                    <div className="flex w-full">
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
                            className="flex w-full h-full"
                        >
                            <CarouselContent>
                                {YoutubeLinks.map((video, index) => (
                                    <CarouselItem
                                        key={`video-${index}`}
                                        className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                    >
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Card className="rounded-lg cursor-pointer group hover:shadow-lg p-0 h-full w-full transition-all">
                                                    <CardHeader className="p-0 flex flex-grow-0 rounded-tl-lg">
                                                        <div className="flex relative aspect-video rounded-t-lg items-center justify-center overflow-hidden">
                                                            <Image
                                                                src={`/assets/connectivity/${video.videoImg}`}
                                                                alt="locations"
                                                                fill
                                                                className="rounded-lg object-cover object-center"
                                                            />
                                                            <PlayCircle className="absolute text-white size-12" />
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="w-full p-4">
                                                        <span className="text-base">
                                                            {video.label}
                                                        </span>
                                                    </CardContent>
                                                </Card>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-6xl">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        {video.label}
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <div className="flex relative w-full aspect-video rounded-t-lg overflow-hidden">
                                                    <iframe
                                                        id="ytplayer"
                                                        type="text/html"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                        allowFullScreen
                                                        className="h-full w-full"
                                                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                                                    ></iframe>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="-left-3 sm:left-0 lg:-left-8" />
                            <CarouselNext className="-right-3 sm:right-0 lg:-right-8" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Connectivity;
