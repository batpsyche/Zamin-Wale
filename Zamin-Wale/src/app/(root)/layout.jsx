import Navbar from "@/components/organism/Navbar";

const RootLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="flex w-full flex-1 bg-neutral-50">
                <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center overflow-y-auto overflow-x-hidden">
                    <div className="flex flex-col w-full h-fit">{children}</div>
                </div>
            </main>
        </>
    );
};

export default RootLayout;
