"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";

const AdminNav = [
    { title: "Dashboard", url: "/admin/dashboard" },
    { title: "Homepage Carousel", url: "/admin/homepage-carousel" },
    { title: "Users", url: "/admin/users" },
    { title: "Properties", url: "/admin/properties" },
    { title: "Website Enquiries", url: "/admin/enquiries/website" },
    { title: "Property Enquiries", url: "/admin/enquiries/property" },
    { title: "Property Visits", url: "/admin/visits" },
];

export default function AdminShell({ children }) {
    return (
        <SidebarProvider>
            <div className="flex w-full flex-1 min-h-[100vh]">
                <Sidebar className="border-r border-neutral-200">
                    <SidebarHeader className="p-4">
                        <span className="font-semibold text-[#6f272b]">Admin</span>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-1">
                                    {AdminNav.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url} className="py-3 px-4">
                                                    {item.title}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </SidebarProvider>
    );
}
