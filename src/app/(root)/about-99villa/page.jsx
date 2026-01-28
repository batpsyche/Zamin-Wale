import React from "react";
import Aboutconnectivity from "@/components/organism/Aboutconnectivity";
import Aboutmap from "@/components/atoms/Aboutmap";
import Amenities from "@/components/organism/Amenities";
import Footer from "@/components/organism/Footer";
import Hero from "@/components/organism/99villa/Hero";
import About from "@/components/organism/99villa/About";
import Property from "@/components/organism/99villa/Property";

const page = () => {
    return (
        <>
            <Hero />
            <About />
            <Aboutconnectivity />
            <Aboutmap />
            <Amenities />
            <Property />
            <Footer />
        </>
    );
};

export default page;
