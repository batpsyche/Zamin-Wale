"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { getHomepageBanners } from "@/actions/property";

const FALLBACK_BANNERS = [
    {
        id: "fallback-1",
        title: "Zaminwale – Buying and Selling of Land",
        desktopImageUrl: "/assets/banner-img/zaminwale.avif",
        mobileImageUrl: "/assets/banner-img/zaminwale-mob.avif",
    },
    {
        id: "fallback-2",
        title: "99Villa – Premium Villas and Plots",
        desktopImageUrl: "/assets/banner-img/99villa.avif",
        mobileImageUrl: "/assets/banner-img/99villa-mob.avif",
    },
];

const BannerCarousel = () => {
    const isMD = useMediaQuery("(min-width: 768px)");
    const [banners, setBanners] = useState(FALLBACK_BANNERS);

    useEffect(() => {
        let active = true;
        getHomepageBanners()
            .then((data) => {
                if (!active) return;
                if (Array.isArray(data) && data.length) {
                    setBanners(
                        data.map((b) => ({
                            id: b.id,
                            title: b.title,
                            desktopImageUrl: b.desktopImageUrl,
                            mobileImageUrl: b.mobileImageUrl,
                        }))
                    );
                }
            })
            .catch(() => {
                // ignore and keep fallbacks
            });
        return () => {
            active = false;
        };
    }, []);

    return (
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
            className="w-full h-full"
        >
            <CarouselContent className="w-full h-[300px] lg:h-[400px] flex ml-0">
                {isMD
                    ? banners.map((card) => (
                          <CarouselItem
                              key={card.id}
                              className="flex w-full h-full items-center justify-center pl-0"
                          >
                              <div className="relative aspect-video h-full w-full max-w-[1400px] mx-auto rounded-b-3xl shadow-md hidden md:flex">
                                  <Image
                                      loading="lazy"
                                      src={card.desktopImageUrl}
                                      alt={card.title || "Homepage banner"}
                                      fill
                                      className="object-cover lg:object-cover object-center h-full w-full rounded-b-3xl"
                                  />
                              </div>
                          </CarouselItem>
                      ))
                    : banners.map((card) => (
                          <CarouselItem
                              key={card.id}
                              className="flex w-full h-full items-center justify-center pl-0"
                          >
                              <div className="relative aspect-video h-full w-full flex md:hidden">
                                  <Image
                                      loading="lazy"
                                      src={card.mobileImageUrl || card.desktopImageUrl}
                                      alt={card.title || "Homepage banner"}
                                      fill
                                      className="object-contain sm:object-cover object-top sm:object-center h-full w-full"
                                  />
                              </div>
                          </CarouselItem>
                      ))}
            </CarouselContent>
        </Carousel>
    );
};

export default BannerCarousel;
