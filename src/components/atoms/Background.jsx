import React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const Background = () => {
    return (
        <>
            <Carousel>
                <CarouselContent>
                    <CarouselItem>...</CarouselItem>
                    <CarouselItem>...</CarouselItem>
                    <CarouselItem>...</CarouselItem>
                </CarouselContent>
            </Carousel>
            {/* <div className="w-full flex h-ful">
                <Image
                    src="/assets/background/background2.jpg"
                    layout="fill"
                    alt="Hero background"
                    className="object-cover w-full"
                />
            </div> */}
        </>
    );
};

export default Background;
