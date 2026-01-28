import Banner from "@/components/atoms/Banner";
import AwardList from "@/components/organism/awards/AwardList";
import Footer from "@/components/organism/Footer";
import React from "react";

const page = () => {
    return (
        <>
            <Banner className="bg-[url('/assets/banner-img/awards-mob.avif')] md:bg-[url('/assets/banner-img/awards.avif')]" />
            <AwardList />
            {/* <Award_video /> */}
            <Footer />
        </>
    );
};

export default page;
