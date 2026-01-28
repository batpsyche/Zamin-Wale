import Banner from "@/components/atoms/Banner";
import Footer from "@/components/organism/Footer";
import Booking_img from "@/components/organism/testimonials/Booking_img";
import Booking_video from "@/components/organism/testimonials/Booking_video";
import Review from "@/components/organism/testimonials/Review";
import React from "react";

const page = () => {
    return (
        <>
            <Banner className="bg-[url('/assets/banner-img/testimonial-mob.avif')] md:bg-[url('/assets/banner-img/testimonial.avif')]" />
            <Review />
            <Booking_img />
            <Booking_video />
            <Footer />
        </>
    );
};

export default page;
