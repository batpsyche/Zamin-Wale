import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const page = () => {
    return (
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full border h-full rounded-lg p-4">
            <div className="flex w-full">
                <h1 className="text-3xl md:text-4xl font-medium md:font-bold text-[#6f272b]">
                    Welcome to zaminwale !
                </h1>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <p className="text-sm md:text-base flex">
                    Welcome to your personalized dashboard! Here, you can
                    efficiently manage all aspects of your property listings and
                    track visitor activity. Get a comprehensive overview of
                    property inquiries and receive real-time updates.
                    Additionally, you can easily export visitor and inquiry data
                    to Excel for further analysis.
                </p>
                <div className="flex w-full">
                    <Button className="rounded-3xl bg-[#6f272b] px-5">
                        <Link
                            href={"post-property/create-property"}
                            className="flex items-center gap-4"
                        >
                            <Plus /> Start Adding Property
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default page;
