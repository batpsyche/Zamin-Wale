import About from "@/components/organism/about/About";
import Hero from "@/components/organism/about/Hero";
import Footer from "@/components/organism/Footer";
import React from "react";

const page = () => {
    return (
        <div className="w-full">
            <Hero />
            <About />
            <Footer />
        </div>
    );
};

export default page;
