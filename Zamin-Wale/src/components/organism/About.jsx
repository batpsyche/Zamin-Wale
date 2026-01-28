import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const About = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex flex-col w-full max-w-[1360px] min-w-7xl mx-auto border-t-4 border-[#6f272b] shadow-xl md:mx-8 rounded-3xl">
                <div className="flex flex-col max-w-7xl mx-auto gap-8 md:gap-10 px-4 py-4 md:py-6 lg:py-8 xl:py-14">
                    <div className="flex w-full items-center justify-center">
                        <h2 className="text-xl text-black font-semibold md:text-2xl lg:text-3xl">
                            Featured Properties
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                        <div className="flex flex-col space-y-4 md:space-y-6 w-full justify-center">
                            <div className="flex flex-col gap-4 w-full">
                                <h2 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                                    Welcome to 99Villa
                                </h2>
                                <span className="text-sm md:text-base lg:text-lg font-semibold text-black">
                                    *Riverhill - With Nature In the Nature!
                                </span>
                            </div>
                            <p className="text-sm md:text-base text-black">
                                Enjoy exclusive bungalow + plot offerings with
                                20+ amenities for the ultimate living
                                experience. Moreover, connect with nature
                                through farming opportunities We value
                                sustainable living and the joy of growing your
                                own veggies. That's why we offer plenty of space
                                for farming. Whether you're experienced or new
                                to gardening, our plots are perfect for
                                unleashing your green thumb.
                            </p>
                            <div className="w-full space-x-4">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="bg-[#6f272b] text-white"
                                >
                                    <Link href={"/about-99villa"}>
                                        See More Details
                                    </Link>
                                </Button>
                            </div>
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
            </div>
        </div>
    );
};

export default About;
