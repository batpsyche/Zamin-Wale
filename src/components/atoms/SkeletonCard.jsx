import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonCard = ({ length }) => {
    const cards = Array.from({ length: length ?? 4 }, (_, i) => i + 1);
    return (
        <>
            <div className="flex w-full overflow-x-auto scrollbar-hide lg:overflow-x-hidden">
                <div className="flex w-fit lg:w-full lg:grid lg:grid-cols-4 gap-2 sm:gap-4">
                    {cards.map((card) => (
                        <div
                            key={card}
                            className="flex w-[166px] lg:w-full flex-col"
                        >
                            <Skeleton className="h-24 sm:h-44 w-full" />
                            <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 h-28 sm:h-[162px]">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SkeletonCard;
