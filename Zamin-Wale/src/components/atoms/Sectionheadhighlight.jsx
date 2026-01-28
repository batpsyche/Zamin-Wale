import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Sectionheadhighlight = ({
    title,
    subtitle,
    link,
    linkHref,
    linkLabel,
}) => {
    return (
        <>
            <div className="flex w-full items-center justify-between">
                <h2 className="text-lg font-medium md:text-xl lg:text-2xl flex flex-col w-fit">
                    <span>{title}</span>
                    <span className="text-sm text-gray-500 font-medium md:text-sm lg:text-sm flex flex-col w-fit">
                        {subtitle}
                    </span>
                </h2>
                {link ? (
                    <Link
                        href={linkHref}
                        className="flex items-center gap-2 hover:text-black text-[#6f272b] text-lg md:text-xl"
                    >
                        <span className="hidden md:flex">{linkLabel}</span>
                        <ArrowRight />
                    </Link>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default Sectionheadhighlight;
