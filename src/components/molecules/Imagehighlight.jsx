import React, { useState } from 'react';
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { cn } from "@/lib/utils";

const Cards = [
    { img: "recomonded-property1.jpeg" },
    { img: "a2.png" },
    { img: "recomonded-property3.jpeg" },
    { img: "recomonded-property4.jpeg" }
];

const Imagehighlight = ({ disableAutoplay = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isHovered ? (
                <div
                    className={cn(
                        "relative aspect-video  lg:h-[312px] h-[200px] bg-cover rounded-2xl flex w-full overflow-hidden"
                    )}
                >
                    <Image
                        src={`/assets/recommonded-property/${Cards[0]?.img || "recomonded-property1.jpeg"}`}
                        alt="house"
                        fill
                        className=" rounded-2xl transition-all object-cover"
                    />
                </div>
            ) : (
                <Carousel
                    plugins={
                        disableAutoplay
                            ? []
                            : [
                                Autoplay({
                                    delay: 1000,
                                }),
                            ]
                    }
                    opts={{
                        align: "start",
                        loop: false,
                    }}
                    className="flex w-full h-full"
                >
                    <CarouselContent>
                        {Cards.map((card, index) => (
                            <CarouselItem
                                key={`${index}-image`}
                                className="basis-full"
                            >
                                <div
                                    className={cn(
                                        "relative lg:h-[312px] h-[200px]  aspect-video bg-cover rounded-2xl flex w-full overflow-hidden"
                                    )}
                                >
                                    <Image
                                        src={`/assets/recommonded-property/${card.img}`}
                                        alt={`house-${index}`}
                                        fill
                                        className=" rounded-2xl object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}
        </div>
    );
};

export default Imagehighlight;
