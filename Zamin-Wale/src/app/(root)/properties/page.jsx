"use client";

import { getAllProperty } from "@/actions/property";
import SectionHeading from "@/components/atoms/SectionHeading";
import SkeletonCard from "@/components/atoms/SkeletonCard";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { IndianRupeeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const metadata = {
    title: "Zaminwale – Buying and Selling of Land",
    description:
        "Zaminwale.com is India's leading online platform for buying and selling land. Find verified listings, trusted sellers, and the best real estate deals.",
    keywords: [
        "buy land",
        "sell land",
        "real estate",
        "land marketplace",
        "property for sale",
        "farmland",
        "commercial land",
        "residential plots",
        "Zaminwale",
    ],
    openGraph: {
        title: "Zaminwale – Buying and Selling of Land",
        description:
            "Zaminwale.com is India's leading online platform for buying and selling land. Find verified listings, trusted sellers, and the best real estate deals.",
        siteName: "LetsUpgrade",
        images: [
            {
                url: "https://zaminwale-private.s3.ap-south-1.amazonaws.com/assets/property/images/f5eab6fc-6526-4a31-bfa3-2f1acc4ea435.png",
                width: 1200,
                height: 628,
                alt: "Zaminwale",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Zaminwale – Buying and Selling of Land",
        description:
            "Zaminwale.com is India's leading online platform for buying and selling land. Find verified listings, trusted sellers, and the best real estate deals.",
        images: [
            "https://zaminwale-private.s3.ap-south-1.amazonaws.com/assets/property/images/f5eab6fc-6526-4a31-bfa3-2f1acc4ea435.png",
        ],
    },
};

const page = () => {
    const [page, setPage] = useState(1);
    const [properties, setProperties] = useState([]);
    const [pagination, setPagination] = useState([]);

    const loadMore = () => {
        setPage(page + 1);
    };

    const fetchData = async () => {
        const { result, pagination = [] } = await getAllProperty({
            page,
            limit: 20,
        });
        setPagination(pagination);
        setProperties((prev) => {
            const processedResult = result.map((item, index) => ({
                ...item,
                id: item.id || `${page}-${index}`,
            }));

            const merged = [...prev, ...processedResult];
            const unique = merged.filter(
                (item, index, self) =>
                    index === self.findIndex((t) => t.id === item.id)
            );

            return unique;
        });
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div className="flex w-full flex-1">
            <div className="flex flex-col gap-4 md:gap-8 w-full max-w-7xl mx-auto px-4 py-4 md:py-6 lg:py-8 xl:py-10">
                <SectionHeading title="All Properties" />
                {properties.length == 0 ? (
                    <SkeletonCard />
                ) : (
                    <div className="flex w-full">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 w-full">
                            {properties.map((property, i) => (
                                <div
                                    key={property.propertyId}
                                    className="flex-col border border-neutral-200 rounded-lg w-full group flex hover:shadow-lg"
                                >
                                    <div className="relative aspect-video bg-cover rounded-t-lg flex w-full overflow-hidden">
                                        <Image
                                            src={
                                                property.propertyPhotos[0] ??
                                                "/assets/property/commercial.webp"
                                            }
                                            alt="house"
                                            fill
                                            className="rounded-t-lg group-hover:scale-110 transition-all object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col p-2 sm:p-4 relative w-full overflow-hidden space-y-2">
                                        <div className="w-full space-y-1">
                                            <span className="text-xs sm:text-sm">
                                                {property.propertyType}
                                            </span>
                                            <div className="text-sm sm:text-base flex items-center font-medium gap-1">
                                                <IndianRupeeIcon className="!size-4" />{" "}
                                                {formatCurrency(
                                                    property.priceTotal
                                                )}{" "}
                                                | {property.plotArea}{" "}
                                                {property.plotAreaUnit}
                                            </div>
                                            <div className="flex flex-col space-y-1 w-full">
                                                <p className="text-gray-600 text-xs sm:text-sm">
                                                    {property.locality} |{" "}
                                                    {property.city}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="hidden md:flex">
                                            Ready Move
                                            <span className="sr-only">
                                                {format(
                                                    property.createdAt,
                                                    "Pp"
                                                )}
                                            </span>
                                        </span>
                                        <div className="flex w-full md:absolute md:px-4 pb-1 sm:pb-3 md:left-0 md:-bottom-40 md:group-hover:bottom-0 md:transition-all">
                                            <Button
                                                asChild
                                                className="w-full h-[unset] py-1 sm:py-1.5 text-xs sm:text-base rounded-full bg-[#6f272b]"
                                            >
                                                <Link
                                                    href={`/properties/${property.propertyId}`}
                                                >
                                                    View Details
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {pagination.next ? (
                    <div className="flex w-full mt-6 items-center justify-center">
                        <Button
                            onClick={loadMore}
                            disabled={!properties}
                            className="rounded-full bg-[#6f272b]"
                        >
                            Load More Properties
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default page;
