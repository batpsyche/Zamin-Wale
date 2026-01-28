import { CiCircleCheck } from "react-icons/ci";

const AuthLayout = ({ children }) => {
    return (
        <div className="flex w-full h-[calc(100vh-64px)] lg:overflow-hidden">
            <div className="flex w-full max-w-7xl mx-auto px-4 py-2 md:py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                    <div className="flex flex-col w-full order-2 md:order-1 md:overflow-y-auto scrollbar-hide">
                        <div className="flex flex-col md:flex-col items-center justify-center bg-white p-4">
                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <div className="md:w-1/2 flex justify-center">
                                    <img
                                        src="/assets/top-location/login.png"
                                        alt="Man sitting at a table with a laptop and a cup, smiling and holding a stress ball"
                                        className="rounded-lg shadow-lg"
                                    />
                                </div>
                                <div className="md:w-1/2 mt-4 md:mt-0 md:ml-8 text-center md:text-left">
                                    <h1 className="text-3xl font-bold text-gray-800">
                                        Post property Ad to sell or rent online
                                        for{" "}
                                        <span className="text-green-500">
                                            Free!
                                        </span>
                                    </h1>
                                    <ul className="mt-4 space-y-2 text-lg text-gray-700">
                                        <li className="flex items-center">
                                            <CiCircleCheck className=" text-green-600 mr-2" />
                                            Get Access to 4 Lakh + Buyers
                                        </li>
                                        <li className="flex items-center">
                                            <CiCircleCheck className=" text-green-600 mr-2" />
                                            Sell Faster with Premium Service
                                        </li>
                                        <li className="flex items-center">
                                            <CiCircleCheck className=" text-green-600 mr-2" />
                                            Get Expert Advice on Market Trends
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pt-11">
                                <h1 className="text-4xl font-bold mb-8">
                                    How it works
                                </h1>
                                <div className="space-y-12">
                                    <div className="flex items-start space-x-6">
                                        <img
                                            src="/assets/auth/3.png"
                                            alt="Illustration of a person posting a property ad on a computer"
                                            className="w-24 h-24"
                                        />
                                        <div>
                                            <h2 className="text-xl font-bold">
                                                Step 1:
                                            </h2>
                                            <h3 className="text-xl font-bold">
                                                Post your Property Ad
                                            </h3>
                                            <p>
                                                Enter all details like locality
                                                name, amenities etc. along with
                                                uploading Photos
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-6">
                                        <img
                                            src="/assets/auth/1.png"
                                            alt="Illustration of a person checking responses on a mobile device"
                                            className="w-24 h-24"
                                        />
                                        <div>
                                            <h2 className="text-xl font-bold">
                                                Step 2:
                                            </h2>
                                            <h3 className="text-xl font-bold">
                                                Check Responses on Dashboard
                                            </h3>
                                            <p>
                                                Get access to Buyer/Tenant
                                                contact details & connect easily
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-6">
                                        <img
                                            src="/assets/auth/2.png"
                                            alt="Illustration of two people shaking hands"
                                            className="w-24 h-24"
                                        />
                                        <div>
                                            <h2 className="text-xl font-bold">
                                                Step 3:
                                            </h2>
                                            <h3 className="text-xl font-bold">
                                                Sell/Rent faster with instant
                                                Connect
                                            </h3>
                                            <p>
                                                Negotiate with your prospective
                                                Buyer/Tenant & mutually close
                                                the deal.(site-visit)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center md:justify-end order-1 md:order-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
