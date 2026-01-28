import BannerCarousel from "../atoms/BannerCarousel";
import SearchBar from "../molecules/SearchBar";

const Hero = () => {
    return (
        <>
            <div className="w-full h-[300px] lg:h-[400px] md:mb-16 flex items-center justify-center relative ">
                <BannerCarousel />
                <div className="absolute flex flex-col gap-6 items-center px-4 justify-center h-full w-full bg-black/0">
                    <div className="flex absolute top-[70%] md:top-[90%] md:shadow-md flex-col divide-y w-[90%] sm:w-full max-w-3xl bg-white rounded-2xl md:border md:border-gray-200">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
