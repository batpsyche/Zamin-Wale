"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel";

const PlotsData = [
    {
        image: "1.jpeg",
    },
    {
        image: "2.jpeg",
    },
    {
        image: "3.jpeg",
    },
    {
        image: "4.jpeg",
    },
    {
        image: "5.jpeg",
    },
    {
        image: "6.jpeg",
    },
    {
        image: "7.jpeg",
    },
    {
        image: "8.jpeg",
    },
    {
        image: "9.jpeg",
    },
];

const Booking_img = () => {
    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-10 xl:py-12">
                    <div className="flex w-full">
                        <h2 className="text-lg font-medium md:text-xl lg:text-2xl">
                            Booking Images
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
                            className="w-full h-full"
                        >
                            <CarouselContent>
                                {PlotsData.map((card, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="sm:basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                    >
                                        <div className="relative rounded-2xl aspect-video md:aspect-square lg:aspect-video flex w-full">
                                            <Image
                                                src={`/assets/testimonial/${card.image}`}
                                                alt="house"
                                                fill
                                                className="object-cover rounded-2xl"
                                            />
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
        </>
    );
};

export default Booking_img;
