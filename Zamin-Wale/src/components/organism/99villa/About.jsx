import Image from "next/image";
import React from "react";

const About = () => {
    return (
        <div className="flex w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4 py-4 md:py-6 lg:py-8 xl:py-20">
                <div className="flex flex-col space-y-4 md:space-y-6 w-full justify-center">
                    <div className="flex flex-col gap-4 w-full">
                        <h2 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                            About 99Villa
                        </h2>
                        <span className="text-sm md:text-base lg:text-lg font-semibold">
                            *Riverhill - With Nature In the Nature!
                        </span>
                    </div>
                    <p className="text-sm md:text-base">
                        Explore the charm of 99 Villa's latest project,
                        Riverhill, where calm meets luxury. Nestled near Panvel,
                        this exclusive gated community offers stunning views of
                        serene rivers and majestic hills. Imagine your perfect
                        weekend escape, surrounded by nature's beauty and the
                        comforts of a modern home.
                    </p>
                    <p className="text-sm md:text-base">
                        Riverhill by 99 Villa promises a peaceful retreat that
                        redefines weekend living.
                    </p>
                </div>
                <div className="flex w-full">
                    <div className="flex relative aspect-video w-full rounded-t-lg overflow-hidden">
                        <Image
                            src="/assets/banner-img/1bhkhome.jpeg"
                            alt="plots"
                            fill
                            className="rounded-lg object-cover object-center"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
