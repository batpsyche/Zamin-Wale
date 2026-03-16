"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import EnquireForm from "../molecules/EnquireForm";
import { PLACEHOLDER_IMAGE } from "@/lib/utils";
import { normalizeMediaUrl } from "@/lib/media";

const SendEnquiry = ({ cards, propertyId, uid }) => {
    const safeCards = Array.isArray(cards)
        ? cards
              .filter((c) => c && String(c).trim())
              .map((c) => normalizeMediaUrl(String(c).trim()))
        : [];
    const displayCards = safeCards.length ? safeCards : [normalizeMediaUrl(PLACEHOLDER_IMAGE)];
    return (
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 xl:gap-10 px-4 py-6 md:py-8 lg:py-10 w-full max-w-[1360px] border border-neutral-200 shadow-md mx-auto rounded-3xl h-auto relative bg-white">
            <div className="flex w-full items-center justify-center">
                <h2 className="text-lg font-medium md:text-xl lg:text-2xl">
                    Send Enquiry
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-4 bg-white w-full max-w-6xl mx-auto border border-neutral-200 rounded-2xl">
                <div className="flex flex-col space-y-2 items-center justify-center w-full p-6">
                    <EnquireForm propertyId={propertyId} uid={uid} />
                </div>
                <div className="flex w-full xl:col-span-2">
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
                            {displayCards.map((src, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative rounded-2xl aspect-video md:aspect-square lg:aspect-video flex w-full">
                                        <Image
                                            src={src}
                                            alt="house"
                                            fill
                                            className="object-cover rounded-2xl"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0" />
                        <CarouselNext className="right-0" />
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default SendEnquiry;
