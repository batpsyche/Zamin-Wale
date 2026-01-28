import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../atoms/SectionHeading";
import { Card, CardContent, CardHeader } from "../ui/card";
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

const TopLocations = () => {
    return (
        <div className="flex w-full">
            <div className="flex flex-col gap-4 w-full max-w-7xl mx-auto px-4 py-4 md:py-6 lg:py-8 xl:py-10">
                <SectionHeading title="Top Locations" />
                <div className="flex w-full">
                    <Carousel
                        plugins={[Autoplay({ delay: 3000 })]}
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {Locations.map((location, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-44 sm:basis-1/3 lg:basis-1/4"
                                >
                                    <Link
                                        href={location.url}
                                        className="w-full"
                                    >
                                        <Card className="rounded-lg group hover:shadow-lg p-0 h-full w-full transition-all">
                                            <CardHeader className="p-0 flex flex-grow-0 rounded-tl-lg">
                                                <div className="flex relative aspect-video rounded-t-lg overflow-hidden">
                                                    <Image
                                                        src={`/assets/top-location/${location.img}`}
                                                        alt="locations"
                                                        fill
                                                        className="rounded-lg object-cover group-hover:scale-110 transition-all object-center"
                                                    />
                                                </div>
                                            </CardHeader>
                                            <CardContent className="w-full p-2 sm:p-4">
                                                <div className="w-full space-y-2">
                                                    <span className="text-sm sm:text-base font-medium">
                                                        {location.label}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
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

export default TopLocations;
