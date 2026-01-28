"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import SectionHeading from "../atoms/SectionHeading";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";

const Locations = [
    {
        label: "Thane Plots",
        img: "img4.jpg",
        url: "/search/top-location/thane",
    },
    {
        label: "Panvel Plots",
        img: "img3.jpg",
        url: "/search/top-location/panvel",
    },
    {
        label: "Uran Plots",
        img: "img2.jpg",
        url: "/search/top-location/uran",
    },
    {
        label: "Chirle Plots",
        img: "img6.jpg",
        url: "/search/top-location/chirle",
    },
    {
        label: "Ranjanpada Plots",
        img: "img5.jpg",
        url: "/search/top-location/ranjanpada",
    },
    {
        label: "Vindhane Plots",
        img: "img7.jpg",
        url: "/search/top-location/vindhane",
    },
];

const NearByLocations = () => {
    return (
        <div className="flex w-full">
            <div className="flex flex-col gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-10 xl:py-12">
                <SectionHeading
                    title="Near By Locations"
                    link
                    linkHref="/properties"
                    linkLabel="See More Locations"
                />
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
                        className="w-full h-full"
                    >
                        <CarouselContent>
                            {Locations.map((card, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-44 sm:basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                >
                                    <div className="flex flex-col rounded-lg w-full border border-neutral-200">
                                        <div className="relative rounded-lg aspect-video md:aspect-square lg:aspect-video flex w-full ">
                                            <Image
                                                src={`/assets/top-location/${card.img}`}
                                                alt="house"
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <span className="text-sm md:text-base font-medium text-center py-1 md:py-2">
                                            {card.label}
                                        </span>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-3 sm:left-0 lg:-left-8" />
                        <CarouselNext className="-right-3 sm:right-0 lg:-right-8" />
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default NearByLocations;
