"use client";

import { downloadWebsiteEnquiry } from "@/actions/property";
import { getAdminWebsiteEnquiries } from "@/actions/admin";
import cookieService from "@/services/cookie";
import useZaminwaleStore from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const LIMIT = 20;

export default function AdminWebsiteEnquiriesPage() {
    const [enquiries, setEnquiries] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ next: false, total: 0 });
    const [search, setSearch] = useState("");
    const [searchDebounced, setSearchDebounced] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [date, setDate] = useState();

    useEffect(() => {
        const t = setTimeout(() => setSearchDebounced(search), 300);
        return () => clearTimeout(t);
    }, [search]);

    const fetchEnquiries = useCallback(() => {
        getAdminWebsiteEnquiries({
            page,
            limit: LIMIT,
            q: searchDebounced || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
        }).then((data) => {
            const { result = [], pagination: pag } = data ?? {};
            setEnquiries(result);
            setPagination(pag ?? { next: false, total: 0 });
        });
    }, [page, searchDebounced, startDate, endDate]);

    useEffect(() => {
        fetchEnquiries();
    }, [fetchEnquiries]);

    const handleLogout = () => {
        cookieService.removeTokens();
        useZaminwaleStore.getState().dispatch({
            type: "SET_STATE",
            payload: { user: null, isAuthenticated: false },
        });
        window.location.href = "/admin";
    };

    const resetFilters = () => {
        setSearch("");
        setSearchDebounced("");
        setStartDate("");
        setEndDate("");
        setPage(1);
    };

    const exportStartDate = date?.from ? format(date.from, "yyyy-MM-dd") : "";
    const exportEndDate = date?.to ? format(date.to, "yyyy-MM-dd") : "";

    const handleDownloadEnquiry = () => {
        downloadWebsiteEnquiry({ startDate: exportStartDate, endDate: exportEndDate })
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

    const totalPages = Math.max(1, Math.ceil((pagination?.total ?? 0) / LIMIT));

    return (
        <div className="flex flex-col w-full flex-1 overflow-y-auto p-4 md:p-6">
            <div className="flex flex-col gap-6 max-w-4xl w-full">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#6f272b]">
                        Website Enquiries
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

                <div className="flex flex-wrap gap-3 items-end">
                    <div className="flex-1 min-w-[180px]">
                        <label className="text-xs text-neutral-500 block mb-1">Search</label>
                        <Input
                            placeholder="Name, email, mobile, message..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                    <div className="w-[140px]">
                        <label className="text-xs text-neutral-500 block mb-1">From date</label>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="w-[140px]">
                        <label className="text-xs text-neutral-500 block mb-1">To date</label>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                        Reset
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-[#6f272b]">Export CSV</Button>
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
                            <Card
                                key={enquiry.id || enquiry._id || i}
                                className="bg-neutral-50"
                            >
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
                                                    ? format(new Date(enquiry.createdAt), "PPp")
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

                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-sm text-neutral-600">
                        Page {page} of {totalPages}
                        {pagination?.total != null && ` (${pagination.total} total)`}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!pagination?.next}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
