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
import SectionHeading from "../atoms/SectionHeading";

const PlotsData = [
    {
        image: "sea view.webp",
        title: "Sea View Bunglow",
        description:
            "A sea view bungalow situated near the coastline or beach, offering a scenic view of the sea or ocean.",
        link: "#enquire-now",
    },
    {
        image: "large-government-warehouse.webp",
        title: "Plots for Warehouse",
        description:
            "As of the current trend, the inclination of the people has shifted towards investing in commercial land.",
        link: "#enquire-now",
    },
    {
        image: "istockphoto-623754774-612x612.webp",
        title: "Plots for Factories",
        description:
            "Factories plots are massive plots of land providing space to varied type of Factories and offices under one area.",
        link: "#enquire-now",
    },
    {
        image: "istockphoto-1199749863-612x612.webp",
        title: "Plots for Petrolpump",
        description:
            "The biggest is for the land to be convenient for either travelers or the local population. After that the land needs to be zoned (ie given permission) for that use.",
        link: "#enquire-now",
    },
    {
        image: "investment.webp",
        title: "Investment Plots",
        description:
            "Your future prospects look great when you buy investment plots with regards to profitable returns.",
        link: "#enquire-now",
    },
    {
        image: "commercial.webp",
        title: "Commercial Plots",
        description:
            "Contact us for best returns on plots invested near junctions, stations highways, and busy market places.",
        link: "#enquire-now",
    },
    {
        image: "residential.webp",
        title: "Residential Plots",
        description:
            "In case you are a developer yourself and planning to expand your business venture, do contact us for the list of residential plots.",
        link: "#enquire-now",
    },
    {
        image: "353640073_20231016184851.webp",
        title: "Hill View Bunglow",
        description:
            "If you fancy living in a bungalow or a row-house with your own independent terrace, parking and garden.",
        link: "#enquire-now",
    },
];

const DreamPlots = () => {
    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-10 xl:py-12">
                    <SectionHeading title="Find Your Dream Plots With Zaminwale." />
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
                                                        src={`/assets/property/${plot.image}`}
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

export default DreamPlots;
