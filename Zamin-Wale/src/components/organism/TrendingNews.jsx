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
import Link from "next/link";
import SectionHeading from "../atoms/SectionHeading";
import { sliceParagraph } from "@/lib/utils";
import { blogsCardData } from "@/constants/blogs";

const TrendingNews = () => {
    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4 py-4 md:py-6 lg:py-8 xl:py-14">
                    <SectionHeading
                        title="News & Blogs"
                        link
                        linkHref="/blogs"
                        linkLabel="See More blogs"
                    />
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
                                {blogsCardData.map((blog) => (
                                    <CarouselItem
                                        key={`${blog.id}-plot-img`}
                                        className="basis-44 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                    >
                                        <Link href={`/blogs/${blog.blogUrl}`}>
                                            <Card className="rounded-lg group p-0 h-full w-full transition-all border-none">
                                                <CardHeader className="p-0 flex flex-grow-0 rounded-tl-lg">
                                                    <div className="flex relative aspect-video rounded-t-lg overflow-hidden">
                                                        <Image
                                                            src={blog.image}
                                                            alt={`blog-${blog.id}`}
                                                            fill
                                                            className="rounded-lg object-cover group-hover:scale-110 transition-all object-center"
                                                        />
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="w-full p-2 sm:p-4">
                                                    <div className="flex flex-col w-full gap-2">
                                                        <span className="text-xs sm:text-sm md:text-base font-medium">
                                                            {blog.title}
                                                        </span>
                                                        <p className="text-[10px] sm:text-xs">
                                                            {sliceParagraph(
                                                                blog.excerpt
                                                            )}
                                                        </p>
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
        </>
    );
};

export default TrendingNews;
