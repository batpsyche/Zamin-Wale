"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";

const CityImage = ({ city }) => {
    const isMD = useMediaQuery("(min-width: 768px)");

    const cityImages = {
        Panvel: "/assets/banner-img/panvel-ad.avif",
        Thane: "/assets/banner-img/thane-ad.avif",
        Uran: "/assets/banner-img/uran-ad.avif",
        "Third Mumbai": "/assets/banner-img/3rd-mumbai-ad.avif",
    };

    const cityImagesMobile = {
        Panvel: "/assets/banner-img/panvel-ad-mob.avif",
        Thane: "/assets/banner-img/thane-ad-mob.avif",
        Uran: "/assets/banner-img/uran-ad-mob.avif",
        "Third Mumbai": "/assets/banner-img/3rd-mumbai-mob.avif",
    };

    const imageUrl =
        cityImages[city] || "/assets/banner-img/3rd-mumbai-ad.avif";
    const imageUrlMobile =
        cityImagesMobile[city] || "/assets/banner-img/3rd-mumbai-mob.avif";

    console.log(imageUrlMobile);

    return (
        <div className="max-w-7xl w-full p-4 mx-auto mb-4 md:mb-6">
            <div className="w-full border border-neutral-200 shadow aspect-video md:aspect-none md:h-40 relative rounded-2xl">
                <Image
                    src={isMD ? imageUrl : imageUrlMobile}
                    alt={`${city} banner`}
                    fill
                    className="object-cover rounded-2xl object-center flex"
                />
            </div>
        </div>
    );
};

export default CityImage;
