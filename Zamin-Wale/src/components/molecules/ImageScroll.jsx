import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { cn } from "@/lib/utils";

const ImageScroll = ({ card, isHovered, className }) => {
    return (
        <>
            {!isHovered ? (
                <div
                    className={cn(
                        "relative aspect-video h-24 sm:h-44 bg-cover rounded-t-lg flex w-full overflow-hidden",
                        className
                    )}
                >
                    <Image
                        src={card[0]}
                        alt={"house"}
                        fill
                        className="rounded-t-lg transition-all object-cover h-full w-full"
                    />
                </div>
            ) : (
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 1000,
                        }),
                    ]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="flex w-full h-full"
                >
                    <CarouselContent>
                        {card.map((card, index) => (
                            <CarouselItem
                                key={`${index}-image`}
                                className="basis-full"
                            >
                                <div
                                    className={cn(
                                        "relative h-24 sm:h-44 aspect-video bg-cover rounded-t-lg flex w-full overflow-hidden",
                                        className
                                    )}
                                >
                                    <Image
                                        src={
                                            card ||
                                            "/assets/recommonded-property/recomonded-property1.jpeg"
                                        }
                                        alt={`house-${index}`}
                                        fill
                                        className="rounded-t-lg object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}
        </>
    );
};

export default ImageScroll;
