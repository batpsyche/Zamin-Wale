"use client";

import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel";

const PlotsData = [
    {
        youtubeLink:
            "https://www.youtube.com/embed/EDg07q0bDx4?si=uWl_fW_yrC5RVMyC", // Replace with actual YouTube video link
    },
    {
        youtubeLink:
            "https://www.youtube.com/embed/aMzeN5LC7So?si=9vr2ty6ckHjPOefx", // Replace with actual YouTube video link
    },
    {
        youtubeLink:
            "https://www.youtube.com/embed/tEMoP5vEHx8?si=yfhJoVjv75YQyDyR", // Replace with actual YouTube video link
    },
    {
        youtubeLink:
            "https://www.youtube.com/embed/uXchFB_Ofyg?si=pbmKan33WEXWRRVr", // Replace with actual YouTube video link
    },
    {
        youtubeLink:
            "https://www.youtube.com/embed/glsYUKyQzq4?si=CbJrn-liiPNqlXMx", // Replace with actual YouTube video link
    },
    {
        youtubeLink:
            "https://www.youtube.com/embed/yy-arzpVXLQ?si=VH7411_XlTIe2Vzg", // Replace with actual YouTube video link
    },
    {
        youtubeLink:
            "https://www.youtube.com/embed/2pLJBC54wqg?si=fYA7CMC_-t9N92fO", // Replace with actual YouTube video link
    },
    {
        youtubeLink:
            "https://www.youtube.com/embed/N5YQF5Iqw60?si=pKDwYe19rhpOkUO5", // Replace with actual YouTube video link
    },
    {
        youtubeLink:
            "https://www.youtube.com/embed/m0lfwXxFZHQ?si=lbQrKSFPiKDBSIYd", // Replace with actual YouTube video link
    },
];

const Booking_video = () => {
    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-10 xl:py-12">
                    <div className="flex w-full">
                        <h2 className="text-lg font-medium md:text-xl lg:text-2xl">
                            Booking Review
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
                                            {/* Embed YouTube Video using iframe */}
                                            <iframe
                                                src={card.youtubeLink}
                                                title={`YouTube Video ${
                                                    index + 1
                                                }`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="object-cover rounded-2xl w-full h-full"
                                            ></iframe>
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

export default Booking_video;
