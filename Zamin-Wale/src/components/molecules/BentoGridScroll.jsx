"use client";

import { cn, formatCurrency } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
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
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

const BentoGridScroll = ({ cards }) => {
    return (
        <>
            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2 w-full">
                    <span className="size-3 bg-green-500 rounded-full"></span>
                    <span>{cards.propertyType} Property</span>
                </div>
                <div className="flex w-full md:gap-4 flex-col md:flex-row">
                    <div className="flex gap-2 items-end w-fit">
                        <span className="flex text-xl font-medium items-center">
                            <IndianRupee className="size-4" />{" "}
                            {formatCurrency(cards.priceTotal)}
                        </span>
                        <span className="text-xs lg:text-sm">
                            {cards.plotArea} sqft
                        </span>
                    </div>
                    <div className="flex w-fit">
                        <p className="text-xl font-medium">
                            {cards.locality}/{cards.city}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row h-fit w-full ">
                <div className="flex w-full lg:w-3/4">
                    <div className="flex h-full w-full border border-white rounded-l-lg">
                        {cards.propertyVideo ?
                            (<Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="w-full h-full"
                            >
                                <CarouselContent>
                                    {cards.propertyVideo && (
                                        <CarouselItem>
                                            <div className="relative rounded-lg lg:rounded-r-none lg:rounded-l-lg aspect-video flex w-full">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${cards.propertyVideo}?autoplay=1&mute=1`}
                                                    title={"YouTube video player"}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    className="absolute inset-0 z-10 h-full w-full rounded-md"
                                                ></iframe>
                                            </div>
                                        </CarouselItem>
                                    )}
                                    {cards.propertyPhotos.map((card, index) => (
                                        <CarouselItem key={index}>
                                            <div className="relative rounded-lg lg:rounded-r-none lg:rounded-l-lg aspect-video flex w-full">
                                                <Image
                                                    src={card}
                                                    alt="house"
                                                    fill
                                                    className="object-cover rounded-lg lg:rounded-r-none lg:rounded-l-lg"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="-left-3 sm:left-0" />
                                <CarouselNext className="-right-3 sm:right-0" />
                            </Carousel>
                            ) : (
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
                                    className="w-full h-full"
                                >
                                    <CarouselContent>
                                        {cards.propertyPhotos.map((card, index) => (
                                            <CarouselItem key={index}>
                                                <div className="relative rounded-lg lg:rounded-r-none lg:rounded-l-lg aspect-video flex w-full">
                                                    <Image
                                                        src={card}
                                                        alt="house"
                                                        fill
                                                        className="object-cover rounded-lg lg:rounded-r-none lg:rounded-l-lg"
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="-left-3 sm:left-0" />
                                    <CarouselNext className="-right-3 sm:right-0" />
                                </Carousel>
                            )}
                    </div>
                </div>
                <div className="hidden md:flex lg:flex-col w-full lg:w-1/4">
                    <ImagePopup
                        image={cards.propertyPhotos[1]}
                        className="rounded-bl-lg lg:rounded-bl-none lg:rounded-tr-lg"
                    />
                    <ImagePopup image={cards.propertyPhotos[2]} className="" />
                    <ImagePopup
                        image={cards.propertyPhotos[3]}
                        className="rounded-br-lg"
                    />
                </div>
            </div>
        </>
    );
};

export default BentoGridScroll;

const ImagePopup = ({ image, className }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger
                    className={cn(
                        "flex relative aspect-video border border-white w-1/3 lg:w-full",
                        className
                    )}
                >
                    <Image
                        src={image}
                        alt="house"
                        fill
                        className={cn("object-cover", className)}
                    />
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 rounded-lg">
                    <DialogHeader className="sr-only">
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div className="flex w-full aspect-video relative">
                        <Image
                            src={image}
                            alt="property"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
