import { getOneProperty } from "@/actions/property";
import BentoGridScroll from "@/components/molecules/BentoGridScroll";
import CityImage from "@/components/molecules/CityImage";
import EnquireForm from "@/components/molecules/EnquireForm";
import PropertyVisitForm from "@/components/molecules/PropertyVisitForm";
import SimilarProperty from "@/components/molecules/SimilarProperty";
import Footer from "@/components/organism/Footer";
import NearByLocations from "@/components/organism/NearByLocations";
import SendEnquiry from "@/components/organism/SendEnquiry";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { IndianRupee } from "lucide-react";

const page = async ({ params }) => {
    const PropertyId = (await params).propertyId;
    const { result = [] } = await getOneProperty(PropertyId);

    return (
        <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-1 xl:grid-cols-8 gap-4 md:gap-6 px-4 py-6 md:py-8 lg:py-10 xl:py-12 w-full max-w-7xl mx-auto h-auto relative">
                <div className="flex w-full lg:col-span-6 h-auto">
                    <div className="flex w-full h-full gap-4 md:gap-6 flex-col">
                        <div className="flex w-full flex-col gap-4 md:gap-6 p-4 lg:p-6 border border-neutral-200 bg-white rounded-lg shadow">
                            <BentoGridScroll
                                // data={result}
                                cards={result}
                            />
                            <div className="flex flex-col gap-6 w-full ">
                                <div className="flex w-full">
                                    <span className="text-lg md:text-xl font-semibold text-neutral-700">
                                        Property Details :
                                    </span>
                                </div>
                                <div className="flex flex-col gap-4 w-full col-span-full">
                                    <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-4 md:gap-y-6">
                                        <div className="flex gap-1 w-full">
                                            <div className="flex flex-col w-fit">
                                                <span className="font-thin text-sm md:text-base">
                                                    Price Per sqft:
                                                </span>
                                                <span className="font-medium text-neutral-700 text-sm md:text-base">
                                                    {result.pricePerSQFT}/sqft
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 w-full">
                                            <div className="flex flex-col w-fit">
                                                <span className="font-thin text-sm md:text-base">
                                                    location:
                                                </span>
                                                <span className="font-medium text-neutral-700 text-sm md:text-base">
                                                    {result.locality} |{" "}
                                                    {result.city}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 w-full">
                                            <div className="flex flex-col w-fit">
                                                <span className="font-thin text-sm md:text-base">
                                                    Possession:
                                                </span>
                                                <span className="font-medium text-neutral-700 text-sm md:text-base">
                                                    {result.possessionBy}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 w-full">
                                            <div className="flex flex-col w-fit">
                                                <span className="font-thin text-sm md:text-base">
                                                    Ownership:
                                                </span>
                                                <span className="font-medium text-neutral-700 text-sm md:text-base">
                                                    {result.ownership}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 w-full">
                                            <div className="flex flex-col w-fit">
                                                <span className="font-thin text-sm md:text-base">
                                                    Any construction done:
                                                </span>
                                                <span className="font-medium text-neutral-700 text-sm md:text-base">
                                                    {result.hasConstruction ===
                                                        true
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 w-full">
                                            <div className="flex flex-col w-fit">
                                                <span className="font-thin text-sm md:text-base">
                                                    boundry walls around the
                                                    property
                                                </span>
                                                <span className="font-medium text-neutral-700 text-sm md:text-base">
                                                    {result.hasBoundaryWall ===
                                                        true
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 w-full">
                                            <div className="flex flex-col w-fit">
                                                <span className="font-thin text-sm md:text-base">
                                                    No. of open sides:
                                                </span>
                                                <span className="font-medium text-neutral-700 text-sm md:text-base">
                                                    {result.openSides}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 w-full">
                                            <div className="flex flex-col w-fit">
                                                <span className="font-thin text-sm md:text-base">
                                                    Floors allowed for
                                                    construction:
                                                </span>
                                                <span className="font-medium text-neutral-700 text-sm md:text-base">
                                                    {result.allowedFloors}
                                                </span>
                                            </div>
                                        </div>
                                        {result.overlooking.length > 0 && (
                                            <div className="flex gap-1 w-full col-span-2 md:col-span-1">
                                                <div className="flex flex-col w-fit">
                                                    <span className="font-thin text-sm md:text-base">
                                                        Overlooking:
                                                    </span>
                                                    <p className="font-medium text-neutral-700 text-sm gap-2 flex md:text-base flex-wrap">
                                                        {result.overlooking.map(
                                                            (item, i) => (
                                                                <span key={i}>
                                                                    {item},
                                                                </span>
                                                            )
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <hr />
                                <div className="flex gap-4 w-full">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="rounded-3xl h-[unset] text-sm bg-[#6f272b]">
                                                Contact Owner
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-sm">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Fill details to contact
                                                </DialogTitle>
                                            </DialogHeader>
                                            <EnquireForm
                                                propertyId={result.propertyId}
                                                uid={result.uid}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="rounded-3xl h-[unset] text-sm border-[#6f272b]"
                                            >
                                                Schedule Visit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-sm">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Schedule Site Visit Date
                                                </DialogTitle>
                                            </DialogHeader>
                                            <PropertyVisitForm
                                                propertyId={result.propertyId}
                                                uid={result.uid}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col p-4 lg:p-6 gap-6 w-full border border-neutral-200 bg-white rounded-lg shadow">
                            <div className="flex w-full">
                                <span className="text-lg md:text-xl font-semibold text-neutral-700">
                                    More Details :
                                </span>
                            </div>
                            <div className="flex flex-col w-full gap-4">
                                <div className="grid grid-cols-3 md:grid-cols-4 text-sm md:text-base w-full gap-2">
                                    <span className="w-full font-thin">
                                        Property Price
                                    </span>
                                    <span className="flex w-full col-span-2 md:col-span-3 items-center font-medium text-neutral-700 ">
                                        <IndianRupee className="size-4" />{" "}
                                        {formatCurrency(result.priceTotal)}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 md:grid-cols-4 text-sm md:text-base w-full gap-2">
                                    <span className="w-full font-thin">
                                        Unique Features
                                    </span>
                                    <span className="flex w-full col-span-2 md:col-span-3 items-center font-medium text-neutral-700 ">
                                        {result.uniqueFeatures}
                                    </span>
                                </div>
                                {result.propertyFacing && (
                                    <div className="grid grid-cols-3 md:grid-cols-4 text-sm md:text-base w-full gap-2">
                                        <span className="w-full font-thin">
                                            Property Facing
                                        </span>
                                        <span className="flex w-full col-span-2 md:col-span-3 items-center font-medium text-neutral-700 ">
                                            {result.propertyFacing}
                                        </span>
                                    </div>
                                )}
                                {result.amenities.length > 0 && (
                                    <div className="grid grid-cols-3 md:grid-cols-4 text-sm md:text-base w-full gap-2">
                                        <span className="w-full font-thin">
                                            Amenities
                                        </span>
                                        <span className="flex w-full col-span-2 gap-2 md:col-span-3 items-center font-medium text-neutral-700  flex-wrap">
                                            {result.amenities.map((item, i) => (
                                                <span key={i}>{item}, </span>
                                            ))}
                                        </span>
                                    </div>
                                )}
                                {result.locationAdvantages.length > 0 && (
                                    <div className="grid grid-cols-3 md:grid-cols-4 text-sm md:text-base w-full gap-2">
                                        <span className="w-full font-thin">
                                            Location Advantages
                                        </span>
                                        <span className="flex w-full col-span-2 gap-2 md:col-span-3 items-center font-medium text-neutral-700 ">
                                            {result.locationAdvantages.map(
                                                (item, i) => (
                                                    <span key={i}>
                                                        {item},{" "}
                                                    </span>
                                                )
                                            )}
                                        </span>
                                    </div>
                                )}
                                <div className="grid grid-cols-3 md:grid-cols-4 text-sm md:text-base w-full gap-2">
                                    <span className="w-full font-thin">
                                        All inlcusice price
                                    </span>
                                    <span className="flex w-full col-span-2 md:col-span-3 items-center font-medium text-neutral-700 ">
                                        {result.inclusivePrice === true
                                            ? "Yes"
                                            : "No"}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 md:grid-cols-4 text-sm md:text-base w-full gap-2">
                                    <span className="w-full font-thin">
                                        Tax and Govt. charges exclude
                                    </span>
                                    <span className="flex w-full col-span-2 md:col-span-3 items-center font-medium text-neutral-700 ">
                                        {result.isTaxExcluded === true
                                            ? "Yes"
                                            : "No"}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 md:grid-cols-4 text-sm md:text-base w-full gap-2">
                                    <span className="w-full font-thin">
                                        Price Negotiable
                                    </span>
                                    <span className="flex w-full col-span-2 md:col-span-3 items-center font-medium text-neutral-700 ">
                                        {result.isPriceNegotiable === true
                                            ? "Yes"
                                            : "No"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden xl:flex xl:flex-col xl:col-span-2 gap-6 sticky top-6 h-full max-h-[calc(100vh-80px)] w-full">
                    <div className="flex flex-col w-full gap-4 bg-white border border-gray-200 rounded-lg shadow h-fit px-4 py-6">
                        <div className="flex w-full justify-center">
                            <span className="font-semibold text-lg">
                                Schedule Site Visit Date
                            </span>
                        </div>
                        <PropertyVisitForm
                            propertyId={result.propertyId}
                            uid={result.uid}
                        />
                    </div>
                </div>
            </div>

            <CityImage city={result.locality} />

            <SendEnquiry
                propertyId={result.propertyId}
                uid={result.uid}
                cards={result.propertyPhotos}
            />

            <SimilarProperty />

            <NearByLocations />

            <Footer />
        </div>
    );
};

export default page;
