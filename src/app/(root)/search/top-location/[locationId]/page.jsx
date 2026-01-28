"use client";

import Loading from "@/components/atoms/Loading";
import EnquireForm from "@/components/molecules/EnquireForm";
import ImageScroll from "@/components/molecules/ImageScroll";
import SearchFilter from "@/components/molecules/SearchFilter";
import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { formatCurrency, sliceParagraph } from "@/lib/utils";
import useZaminwaleStore from "@/store";
import { Dialog } from "@radix-ui/react-dialog";
import { Eye, Filter, IndianRupee, PhoneCallIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const page = () => {
    const params = useParams();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const searchList = useZaminwaleStore((store) => store.searchList);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <>
            <div className="hidden md:flex md:w-1/3 xl:w-1/4 border border-neutral-200 h-fit md:h-full overflow-y-auto scrollbar-hide bg-white md:rounded-2xl">
                <div className="hidden md:flex w-full">
                    <SearchFilter />
                </div>
            </div>
            <div className="flex flex-1 w-full md:w-2/3 gap-4 xl:w-3/4 flex-col">
                <div className="flex w-full h-fit gap-4 items-center bg-white rounded-md md:rounded-2xl md:p-4">
                    <div className="flex md:hidden w-fit">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="px-3"
                                >
                                    <Filter className="!size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="py-4 space-y-2">
                                <SheetHeader>
                                    <SheetTitle>Search filter</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-1 w-full h-[calc(100vh-60px)] overflow-y-auto scrollbar-hide">
                                    <SearchFilter />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="gap-2 text-sm md:text-lg font-semibold w-full">
                        <span className="">{searchList?.length}</span> Result |{" "}
                        <span className="capitalize">{params.locationId}</span>
                    </div>
                </div>
                {searchList?.length ? (
                    <div className="flex w-full h-[calc(100%-80px)] overflow-y-auto overflow-x-hidden scrollbar">
                        <div className="flex flex-col w-full h-fit gap-6">
                            <div className="flex flex-col w-full h-fit rounded-2xl gap-4">
                                {searchList?.map((card, i) => (
                                    <div
                                        // href={`/properties/${card.propertyId}`}
                                        key={i}
                                        className="flex flex-col p-4 sm:flex-row xl:grid xl:grid-cols-5 border w-full gap-2 rounded-3xl bg-white border-neutral-200 hover:border-[#6f272b] hover:shadow-md transition-all"
                                        onMouseEnter={() => handleMouseEnter(i)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="flex w-full relative sm:w-2/5 xl:w-full xl:col-span-2">
                                            <div className="flex relative w-full">
                                                <ImageScroll
                                                    card={card.propertyPhotos}
                                                    isHovered={
                                                        hoveredIndex === i
                                                    }
                                                    className="!w-full !h-40 sm:!h-56 sm:!w-80 lg:!w-full !relative !rounded-lg"
                                                />
                                            </div>
                                            {/* <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-2 top-2"
                                            >
                                                <Heart className="!size-6 fill-neutral-200" />
                                            </Button> */}
                                        </div>
                                        <div className="flex flex-col gap-2 w-full sm:w-3/5 md:px-4 xl:col-span-3 xl:w-full">
                                            <div className="flex flex-col gap-2 w-full sm:flex-grow">
                                                <div className="flex flex-col w-full space-y-0.5">
                                                    <span className="text-base font-bold">
                                                        {card.locality}
                                                    </span>
                                                    <span className="text-sm hover:underline transition-all">
                                                        {card.propertyType} Land
                                                        / {card.city}
                                                    </span>
                                                </div>
                                                <div className="grid divide-x md:divide-x-2 grid-cols-3 lg:grid-cols-3">
                                                    <div className="flex flex-col w-full">
                                                        <span className="flex items-center text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                                                            <IndianRupee className="!size-4" />
                                                            {formatCurrency(
                                                                card.priceTotal
                                                            )}
                                                        </span>
                                                        <span className="flex items-center text-xs">
                                                            <IndianRupee className="!size-2" />
                                                            {card.pricePerSQFT}{" "}
                                                            / sqft
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col w-full pl-2 md:pl-4">
                                                        <span className="flex items-center text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                                                            {card.plotArea}{" "}
                                                            {card.plotAreaUnit}
                                                        </span>
                                                        <span className="flex items-center text-xs">
                                                            Plot Area
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col w-full pl-2 md:pl-4">
                                                        <span className="flex items-center text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                                                            {card.propertyType}
                                                        </span>
                                                        {/* <span className="flex items-center text-xs">
                                                            Plot Area
                                                        </span> */}
                                                    </div>
                                                </div>
                                                <p className="text-xs md:text-sm  h-10">
                                                    {sliceParagraph(
                                                        card.uniqueFeatures
                                                    )}
                                                </p>
                                                <div className="flex flex-wrap w-full overflow-x-auto scrollbar-hide">
                                                    <div className="flex w-fit gap-2 items-center">
                                                        <span className="flex w-fit whitespace-nowrap text-sm font-medium text-[#6f272b]">
                                                            Near By:
                                                        </span>
                                                        <ul className="w-fit flex gap-2">
                                                            {card.locationAdvantages ? (
                                                                card.locationAdvantages?.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="w-fit px-3 py-1.5 rounded-full text-xs bg-blue-100 whitespace-nowrap"
                                                                        >
                                                                            {
                                                                                item
                                                                            }
                                                                        </li>
                                                                    )
                                                                )
                                                            ) : (
                                                                <li className="w-fit px-3 py-1.5 rounded-full text-xs whitespace-nowrap">
                                                                    -
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-full gap-2 sm:gap-4 md:justify-end sm:flex-grow-0 h-1/5">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    className="rounded-full h-[unset] w-full md:w-fit text-xs border-[#6f272b] text-[#6f272b]"
                                                >
                                                    <Link
                                                        href={`/properties/${card.propertyId}`}
                                                    >
                                                        <Eye />
                                                        View Details
                                                    </Link>
                                                </Button>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button className="rounded-full h-[unset] w-full md:w-fit text-xs bg-[#6f272b]">
                                                            <PhoneCallIcon />{" "}
                                                            Contact Us
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-sm">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Fill details to
                                                                contact
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <EnquireForm
                                                            propertyId={
                                                                card.propertyId
                                                            }
                                                            uid={card.uid}
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                                {/* <Button
                                                    variant="outline"
                                                    className="rounded-full h-[unset] w-full md:w-fit text-xs border-[#6f272b] text-[#6f272b]"
                                                >
                                                    View Number
                                                </Button> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full flex-1">
                        <div className="flex w-full h-full items-center justify-center relative">
                            <Loading />
                            {/* <Image
                                src={"/assets/helper/404.png"}
                                alt="404"
                                fill
                                className="object-contain"
                            /> */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default page;
