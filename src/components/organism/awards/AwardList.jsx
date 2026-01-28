import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const Awards = [
    {
        image: "award-1.jpeg",
    },
    {
        image: "award-2.jpeg",
    },
    {
        image: "award-3.jpeg",
    },
    {
        image: "award-4.jpeg",
    },
    {
        image: "award-5.jpeg",
    },
    {
        image: "award-6.jpeg",
    },
    {
        image: "award-7.jpeg",
    },
    {
        image: "award-8.jpeg",
    },
    {
        image: "award-9.jpeg",
    },
];

const AwardList = () => {
    return (
        <div className="flex flex-col pt-6">
            <div className="w-full flex px-16">
                <h1 className="text-lg px-1 font-medium mx-auto md:text-xl lg:text-2xl">
                    Awards
                </h1>
            </div>
            <div className="flex w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4 py-4 md:py-4 lg:py-4 xl:py-4">
                    {Awards.map((award, i) => (
                        <div
                            key={i}
                            className="flex relative w-full aspect-video"
                        >
                            <Image
                                src={`/assets/awards/${award.image}`}
                                alt={`award-${i}`}
                                fill
                                className="w-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AwardList;
