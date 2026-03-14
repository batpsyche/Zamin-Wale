"use client";

import { downloadWebsiteEnquiry, getWebsiteEnquiry } from "@/actions/property";
import cookieService from "@/services/cookie";
import useZaminwaleStore from "@/store";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminDashboardPage() {
    const [enquiries, setEnquiries] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ next: false });
    const [date, setDate] = useState();

    const startDate = date?.from ? format(date.from, "yyyy-MM-dd") : "";
    const endDate = date?.to ? format(date.to, "yyyy-MM-dd") : "";

    const handleLogout = () => {
        cookieService.removeTokens();
        useZaminwaleStore.getState().dispatch({
            type: "SET_STATE",
            payload: { user: null, isAuthenticated: false },
        });
        window.location.href = "/admin";
    };

    const handleDownloadEnquiry = () => {
        downloadWebsiteEnquiry({ startDate, endDate })
            .then((resp) => {
                const blob = new Blob([resp], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "website-enquiries.csv";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                toast.success("Download started");
            })
            .catch(() => {
                toast.warning("Enquiry not found");
            });
    };

    const loadMore = () => setPage((p) => p + 1);

    const fetchEnquiry = async () => {
        const data = await getWebsiteEnquiry({ page, limit: 20 });
        const { result = [], pagination: pag } = data ?? {};
        setPagination(pag ?? { next: false });
        setEnquiries((prev) => {
            const newItems = (result || []).filter(
                (item) => !prev.some((p) => (p.id || p._id) === (item.id || item._id))
            );
            return [...prev, ...newItems];
        });
    };

    useEffect(() => {
        fetchEnquiry();
    }, [page]);

    return (
        <div className="flex flex-col w-full flex-1 overflow-y-auto scrollbar p-4 md:p-6">
            <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#6f272b]">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="border-[#6f272b] text-[#6f272b]"
                            onClick={handleLogout}
                        >
                            Log out
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/">View site</Link>
                        </Button>
                    </div>
                </div>

                <section className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-lg font-semibold text-neutral-700">
                            Website Enquiries
                        </h2>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/admin/enquiries/website">View all</Link>
                        </Button>
                    </div>
                    <div className="flex w-full">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full sm:w-auto bg-[#6f272b]">
                                    Export Website Enquiries (CSV)
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-full max-w-sm p-4">
                                <DialogHeader>
                                    <DialogTitle>Select date range</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-4">
                                    <div className="flex w-full items-center justify-center">
                                        <Calendar
                                            mode="range"
                                            defaultMonth={date?.from}
                                            selected={date}
                                            onSelect={setDate}
                                            numberOfMonths={1}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        onClick={handleDownloadEnquiry}
                                        className="w-full bg-[#6f272b]"
                                    >
                                        {date?.from && date?.to
                                            ? `Download ${format(date.from, "LLL dd")} – ${format(date.to, "LLL dd")}`
                                            : "Download all enquiries"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
                        {enquiries.length > 0 ? (
                            enquiries.map((enquiry, i) => (
                                <Card key={enquiry.id || enquiry._id || i} className="bg-neutral-50">
                                    <CardHeader>
                                        <CardTitle className="flex gap-4 items-center">
                                            <span className="relative flex size-10 aspect-square rounded-md overflow-hidden">
                                                <Image
                                                    src={`https://api.dicebear.com/9.x/initials/png?seed=${enquiry.name}&backgroundType=gradientLinear`}
                                                    alt={enquiry.name}
                                                    fill
                                                    className="object-contain rounded-md"
                                                />
                                            </span>
                                            <div className="flex flex-col flex-grow">
                                                <span className="text-lg font-semibold">
                                                    {enquiry.name}
                                                </span>
                                                <span className="text-xs font-normal text-neutral-500">
                                                    {enquiry.createdAt
                                                        ? format(
                                                              new Date(enquiry.createdAt),
                                                              "PPp"
                                                          )
                                                        : "—"}
                                                </span>
                                            </div>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-2">
                                        <span className="text-sm">
                                            <strong>Mobile:</strong>{" "}
                                            {enquiry.mobile ?? enquiry.mobileNo ?? "—"}
                                        </span>
                                        <span className="text-sm">
                                            <strong>Email:</strong> {enquiry.email ?? "—"}
                                        </span>
                                        {enquiry.message ? (
                                            <p className="text-sm mt-2 text-neutral-600">
                                                {enquiry.message}
                                            </p>
                                        ) : null}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full flex items-center justify-center py-12 text-neutral-500">
                                No enquiries yet.
                            </div>
                        )}
                    </div>

                    {pagination?.next ? (
                        <div className="flex w-full mt-2 justify-center">
                            <Button
                                onClick={loadMore}
                                className="rounded-full bg-[#6f272b]"
                            >
                                Load more
                            </Button>
                        </div>
                    ) : null}
                </section>
            </div>
        </div>
    );
}
