"use client";

import { filterProperty } from "@/actions/property";
import { deletePropertyAdmin } from "@/actions/admin";
import cookieService from "@/services/cookie";
import useZaminwaleStore from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const LIMIT = 20;

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ next: false, total: 0 });
    const [search, setSearch] = useState("");
    const [searchDebounced, setSearchDebounced] = useState("");
    const [city, setCity] = useState("");
    const [locality, setLocality] = useState("");
    const [listingType, setListingType] = useState("all");
    const [propertyType, setPropertyType] = useState("all");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");

    useEffect(() => {
        const t = setTimeout(() => setSearchDebounced(search), 300);
        return () => clearTimeout(t);
    }, [search]);

    const loadList = useCallback(() => {
        const filter = {
            page,
            limit: LIMIT,
            q: searchDebounced || undefined,
            city: city || undefined,
            locality: locality || undefined,
            listingType: listingType && listingType !== "all" ? listingType : undefined,
            propertyType: propertyType && propertyType !== "all" ? propertyType : undefined,
            priceTotalMinValue: priceMin || undefined,
            priceTotalMaxValue: priceMax || undefined,
        };
        filterProperty(filter).then((data) => {
            const result = data?.result ?? [];
            const pag = data?.pagination ?? {};
            setProperties(Array.isArray(result) ? result : []);
            setPagination(pag);
        });
    }, [page, searchDebounced, city, locality, listingType, propertyType, priceMin, priceMax]);

    useEffect(() => {
        loadList();
    }, [loadList]);

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
        setCity("");
        setLocality("");
        setListingType("all");
        setPropertyType("all");
        setPriceMin("");
        setPriceMax("");
        setPage(1);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this property?")) return;
        try {
            await deletePropertyAdmin(id);
            toast.success("Property deleted");
            setProperties((prev) => prev.filter((p) => (p.id ?? p.propertyId) !== id));
        } catch (e) {
            toast.error(e?.message ?? "Delete failed");
        }
    };

    const totalPages = Math.max(1, Math.ceil((pagination?.total ?? 0) / LIMIT));

    return (
        <div className="flex flex-col w-full flex-1 overflow-y-auto p-4 md:p-6">
            <div className="flex flex-col gap-6 max-w-6xl w-full">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#6f272b]">Properties</h1>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="border-[#6f272b] text-[#6f272b]"
                            onClick={handleLogout}
                        >
                            Log out
                        </Button>
                        <Button
                            asChild
                            size="sm"
                            className="bg-[#6f272b] text-white hover:bg-[#5a2023]"
                        >
                            <Link href="/admin/properties/create">Add property</Link>
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
                            placeholder="Title, city, locality..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                    <div className="w-[130px]">
                        <label className="text-xs text-neutral-500 block mb-1">City</label>
                        <Input
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="w-[130px]">
                        <label className="text-xs text-neutral-500 block mb-1">Locality</label>
                        <Input
                            placeholder="Locality"
                            value={locality}
                            onChange={(e) => setLocality(e.target.value)}
                        />
                    </div>
                    <div className="w-[120px]">
                        <label className="text-xs text-neutral-500 block mb-1">Listing</label>
                        <Select value={listingType} onValueChange={setListingType}>
                            <SelectTrigger>
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Sell">Sell</SelectItem>
                                <SelectItem value="Rent/Lease">Rent/Lease</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[130px]">
                        <label className="text-xs text-neutral-500 block mb-1">Type</label>
                        <Select value={propertyType} onValueChange={setPropertyType}>
                            <SelectTrigger>
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Residential">Residential</SelectItem>
                                <SelectItem value="Commercial">Commercial</SelectItem>
                                <SelectItem value="Villa/bungalow">Villa/bungalow</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[100px]">
                        <label className="text-xs text-neutral-500 block mb-1">Min price</label>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={priceMin}
                            onChange={(e) => setPriceMin(e.target.value)}
                        />
                    </div>
                    <div className="w-[100px]">
                        <label className="text-xs text-neutral-500 block mb-1">Max price</label>
                        <Input
                            type="number"
                            placeholder="Max"
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                        Reset
                    </Button>
                </div>

                <div className="rounded-md border border-neutral-200 overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                        <thead className="bg-neutral-100 border-b border-neutral-200">
                            <tr>
                                <th className="text-left p-3 font-medium">Title</th>
                                <th className="text-left p-3 font-medium">City / Locality</th>
                                <th className="text-left p-3 font-medium">Type</th>
                                <th className="text-left p-3 font-medium">Price</th>
                                <th className="text-left p-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((p) => {
                                const id = p.id ?? p.propertyId;
                                return (
                                    <tr key={id} className="border-b border-neutral-100">
                                        <td className="p-3 font-medium">{p.title || "—"}</td>
                                        <td className="p-3">
                                            {[p.city, p.locality].filter(Boolean).join(" / ") || "—"}
                                        </td>
                                        <td className="p-3">
                                            {p.listingType || p.propertyType || "—"}
                                        </td>
                                        <td className="p-3">
                                            {p.priceTotal != null
                                                ? formatCurrency(p.priceTotal)
                                                : "—"}
                                        </td>
                                        <td className="p-3 flex gap-2">
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={`/admin/properties/${id}/edit`}>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
