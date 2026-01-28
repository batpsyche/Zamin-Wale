import { cn } from "@/lib/utils";
import React from "react";

const Banner = ({ className }) => {
    return (
        <div
            className={cn(
                "flex w-full h-[calc(100vh-200px)] bg-[url('/assets/banner-img/99villa-hero-img.jpeg')] bg-no-repeat bg-cover bg-top",
                className
            )}
        ></div>
    );
};

export default Banner;
