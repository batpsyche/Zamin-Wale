"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const BannerImages = [
    { img: "banner-img-1.jpg", alt: "First banner image" },
    { img: "banner-img-2.jpg", alt: "Second banner image" },
    { img: "banner-img-3.jpg", alt: "Third banner image" },
    { img: "banner-img-4.jpg", alt: "Fourth banner image" },
    { img: "banner-img-5.jpg", alt: "Fifth banner image" },
    { img: "banner-img-6.jpg", alt: "Sixth banner image" },
];

const BannerCarousel = () => {
    return (
        <div className="flex w-full xl:w-[90%]">
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
                            className="pl-1 sm:basis-full lg:basis-1/2 xl:basis-1/3"
                        >
                            <Card className="w-full h-full">
                                <CardContent className="relative aspect-video w-full p-0">
                                    <Image
                                        src={`/assets/banner-img/${card.img}`}
                                        alt={card.alt}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 xl:-left-12" />
                <CarouselNext className="right-0 xl:-right-12" />
            </Carousel>
        </div>
    );
};

export default BannerCarousel;
