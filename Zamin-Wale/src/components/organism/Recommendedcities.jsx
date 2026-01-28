import Image from "next/image";
import Link from "next/link";

const Recommendedcities = () => {
    const cards = Array.from({ length: 4 }, (_, i) => i + 1);
    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-10 xl:py-12">
                    <div className="flex w-full">
                        <h2 className="text-lg font-bold md:text-xl lg:text-2xl">
                            Recommended Cities
                        </h2>
                    </div>
                    <div className="flex w-full overflow-x-auto xl:overflow-x-hidden scrollbar-hide">
                        <div className="flex xl:grid xl:grid-cols-4 gap-4 w-fit xl:w-full">
                            {cards.map((card) => (
                                <Link
                                    key={card}
                                    href={"/"}
                                    className="w-80 flex-col border border-neutral-200 rounded-lg xl:w-full group flex hover:shadow-lg"
                                >
                                    <div className="relative aspect-video bg-cover rounded-t-lg flex w-full overflow-hidden">
                                        <Image
                                            src="/assets/house/staticmap.png"
                                            alt="house"
                                            fill
                                            className="rounded-t-lg group-hover:scale-110 transition-all object-cover"
                                        />
                                    </div>
                                    <div className=" p-4 space-y-2">
                                        <h2 className="text-lg font-bold">
                                            Panama City Beach
                                        </h2>
                                        <div className="flex flex-col w-full">
                                            <p className="text-gray-600 text-sm">
                                                <b className="text-black">
                                                    2,400
                                                </b>{" "}
                                                Listings for sale
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                <b className="text-black">
                                                    $475,000
                                                </b>{" "}
                                                Median Listing Home Price
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Recommendedcities;
