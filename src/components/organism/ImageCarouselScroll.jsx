"use client";

import React, { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import ImageScroll from "../molecules/ImageScroll";
import { IndianRupeeIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { format } from "date-fns";

const ImageCarouselScroll = ({ cards, autoScroll }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <>
            <Carousel
                plugins={
                    autoScroll
                        ? [
                              Autoplay({
                                  delay: 3000,
                              }),
                          ]
                        : ""
                }
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="flex w-full h-full"
            >
                <CarouselContent>
                    {cards?.map((card, index) => (
                        <CarouselItem
                            key={`${index}-plot-img`}
                            className="basis-44 sm:basis-1/3 lg:basis-1/3 xl:basis-1/4"
                        >
                            <div
                                className="flex flex-col w-full border border-neutral-200 rounded-lg group hover:shadow-lg"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <ImageScroll
                                    card={card}
                                    isHovered={hoveredIndex === index}
                                />
                                <div className="p-2 sm:p-4 relative space-y-2">
                                    <div className="w-full">
                                        <span className="text-xs sm:text-sm">
                                            {card.propertyType}
                                        </span>
                                        <h2 className="text-sm sm:text-base flex items-center font-medium">
                                            <IndianRupeeIcon className="!size-4" />{" "}
                                            {formatCurrency(card.priceTotal)}|{" "}
                                            {card.plotArea} {card.plotAreaUnit}
                                        </h2>
                                        <p className="text-gray-600 gap-2 flex text-xs sm:text-sm">
                                            {card.locality},&nbsp;
                                            {card.city}
                                        </p>
                                    </div>
                                    <span className="hidden md:flex">
                                        Ready Move
                                        <span className="sr-only">
                                            {format(card.createdAt, "Pp")}
                                        </span>
                                    </span>
                                    <div className="flex w-full md:absolute md:px-4 pb-1 sm:pb-3 md:left-0 md:-bottom-40 md:group-hover:bottom-0 md:transition-all">
                                        <Button
                                            asChild
                                            className="w-full text-xs sm:text-sm h-[unset] rounded-full py-1 sm:py-1.5 bg-[#6f272b]"
                                        >
                                            <Link
                                                href={`/properties/${card.propertyId}`}
                                            >
                                                View Details
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="-left-3 sm:left-0 lg:-left-8" />
                <CarouselNext className="-right-3 sm:right-0 lg:-right-8" />
            </Carousel>
        </>
    );
};

export default ImageCarouselScroll;
