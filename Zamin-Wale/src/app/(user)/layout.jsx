import Navbar from "@/components/organism/Navbar";

const UserLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="flex w-screen h-[calc(100vh-60px)] relative">
                {children}
            </div>
        </>
    );
};

export default UserLayout;
