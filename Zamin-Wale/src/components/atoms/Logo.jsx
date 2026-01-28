import { cn } from "@/lib/utils";

const Logo = ({ className }) => {
    return (
        <div className="flex h-16 items-center w-fit relative">
            {/* <Image
                src={"/assets/logo/zamin-logo.gif"}
                alt="Zamin Wale Logo"
                fill
                className="object-contain"
            /> */}
            <span className={cn("flex text-xl md:text-3xl font-bold text-white", className)}>zaminwale.com</span>
        </div>
    );
};

export default Logo;
