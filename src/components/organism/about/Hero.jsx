import Banner from "@/components/atoms/Banner";
import React from "react";

const Hero = () => {
    return (
        <Banner className="h-[300px] md:h-[calc(100vh-200px)] bg-[url('/assets/banner-img/about-mob.avif')] bg-left md:bg-[url('/assets/banner-img/about.avif')]" />
    );
};

export default Hero;
