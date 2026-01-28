"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";

const PlotsData = [
    {
        image: "6.jpg",
        title: "Navi - Mumbai International Airport",
        description:
            "It’s also in close proximity to Navi Mumbai International Airport, offering residents convenient access to air travel.",
        link: "#enquire-now",
    },
    {
        image: "1.jpg",
        title: "Mumbai-Pune Highway (Old & Express)",
        description:
            "The plot sits just 5 to 10 minutes from the old Mumbai- Pune highway, offering a convenient gateway to both cities.",
        link: "#enquire-now",
    },
    {
        image: "2.jpg",
        title: "Chouk Railway Station",
        description:
            "The convenient proximity to Chouk Railway Station makes commuting effortless, offering easy access to transportation links.",
        link: "#enquire-now",
    },
    {
        image: "5.jpg",
        title: "Atal Setu Sealink",
        description:
            "The plot is located on a convenient 20-minute drive from the Atal Setu, the iconic sealink connecting Mumbai.",
        link: "#enquire-now",
    },
    {
        image: "4.jpg",
        title: "Mumbai - Goa Highway",
        description:
            "The plot is conveniently situated near the bustling Mumbai- Goa highway, providing easy access to both Mumbai and Goa.",
        link: "#enquire-now",
    },
    {
        image: "3.jpg",
        title: "Karjat, Neral, Matheran",
        description:
            "Karjat, Neral, and Matheran are nearby charming spots perfect for a quick getaway. Karjat offers lush landscapes and trekking trails",
        link: "#enquire-now",
    },
];

const Aboutconnectivity = () => {
    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-10 xl:py-12">
                    <div className="flex w-full">
                        <h2 className="text-lg font-medium md:text-xl lg:text-2xl flex flex-col gap-1">
                            <span>Connectivity</span>
                            <span className="h-1.5 w-20 bg-[#6f272b] rounded-full"></span>
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
                                {PlotsData.map((plot, index) => (
                                    <CarouselItem
                                        key={`${index}-plot-img`}
                                        className="basis-44 sm:basis-1/4 lg:basis-1/3 xl:basis-1/4"
                                    >
                                        <Card className="rounded-lg group hover:shadow-lg p-0 h-full w-full transition-all">
                                            <CardHeader className="p-0 flex flex-grow-0 rounded-tl-lg">
                                                <div className="flex relative aspect-video rounded-t-lg overflow-hidden">
                                                    <Image
                                                        src={`/assets/aboutconnectivity/${plot.image}`}
                                                        alt="plots"
                                                        fill
                                                        className="rounded-lg object-cover group-hover:scale-110 transition-all object-center"
                                                    />
                                                </div>
                                            </CardHeader>
                                            <CardContent className="w-full p-2 sm:p-4">
                                                <div className="w-full space-y-1 sm:space-y-2">
                                                    <span className="text-sm sm:text-base font-medium">
                                                        {plot.title}
                                                    </span>
                                                    <p className="text-xs sm:text-sm text-neutral-800">
                                                        {plot.description}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
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

export default Aboutconnectivity;
