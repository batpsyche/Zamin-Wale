"use client";

import AppSidebar from "@/components/molecules/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useZaminwaleStore from "@/store";

const DashboardLayout = ({ children }) => {
    const user = useZaminwaleStore((store) => store.user);

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex w-full gap-4 h-[calc(100%-64px)] p-4">
                <div className="flex w-full xl:w-3/4 flex-col gap-4 h-full">
                    <div className="flex gap-4 items-center w-full px-4 rounded-lg border border-neutral-200">
                        <SidebarTrigger
                            className="h-10 w-10"
                            variant="outline"
                        />
                        <div className="flex w-full gap-1 py-2 flex-col">
                            <h2 className="text-lg md:text-2xl font-bold text-[#6f272b]">
                                Hey {user?.name}!
                            </h2>
                            <p className="w-full text-xs md:text-sm lg:text-base">
                                Take a look to your uploaded properties
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
                <div className="hidden xl:flex w-full xl:w-1/4 h-full border rounded-lg"></div>
            </div>
        </SidebarProvider>
    );
};

export default DashboardLayout;
