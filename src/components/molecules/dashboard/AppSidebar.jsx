"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import useZaminwaleStore from "@/store";
import Link from "next/link";

const AppSidebar = () => {
    const user = useZaminwaleStore((store) => store.user);

    return (
        <Sidebar className="space-y-6 px-4">
            <SidebarHeader className="md:mt-16 px-4"></SidebarHeader>
            <SidebarContent className="pt-6 px-4 border border-neutral-200 rounded-md">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {SidebarList.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className="py-5 px-4"
                                        >
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            {user?.isAdmin === true ? (
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href="/dashboard/enquiry"
                                            className="py-5 px-4"
                                        >
                                            <span>Website Enquiry</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : null}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;

const SidebarList = [
    {
        title: "Dashboard",
        url: "/dashboard",
    },
    {
        title: "Properties",
        url: "/dashboard/properties",
    },
];
