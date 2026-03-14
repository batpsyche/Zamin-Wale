"use client";

import { getAdminUsers } from "@/actions/admin";
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
import { format } from "date-fns";

const LIMIT = 20;

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ next: false, total: 0 });
    const [search, setSearch] = useState("");
    const [searchDebounced, setSearchDebounced] = useState("");
    const [isAdminFilter, setIsAdminFilter] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const t = setTimeout(() => setSearchDebounced(search), 300);
        return () => clearTimeout(t);
    }, [search]);

    const fetchUsers = useCallback(() => {
        getAdminUsers({
            page,
            limit: LIMIT,
            q: searchDebounced || undefined,
            isAdmin: isAdminFilter && isAdminFilter !== "all" ? isAdminFilter : undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
        }).then((data) => {
            const { result = [], pagination: pag } = data ?? {};
            setUsers(result);
            setPagination(pag ?? { next: false, total: 0 });
        });
    }, [page, searchDebounced, isAdminFilter, startDate, endDate]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

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
        setIsAdminFilter("all");
        setStartDate("");
        setEndDate("");
        setPage(1);
    };

    const totalPages = Math.max(1, Math.ceil((pagination?.total ?? 0) / LIMIT));

    return (
        <div className="flex flex-col w-full flex-1 overflow-y-auto p-4 md:p-6">
            <div className="flex flex-col gap-6 max-w-5xl w-full">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#6f272b]">Users</h1>
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
                            placeholder="Name, email, mobile..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                    <div className="w-[140px]">
                        <label className="text-xs text-neutral-500 block mb-1">Admin</label>
                        <Select value={isAdminFilter} onValueChange={setIsAdminFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="true">Admin</SelectItem>
                                <SelectItem value="false">Non-admin</SelectItem>
                            </SelectContent>
                        </Select>
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
                </div>

                <div className="rounded-md border border-neutral-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-neutral-100 border-b border-neutral-200">
                            <tr>
                                <th className="text-left p-3 font-medium">Name</th>
                                <th className="text-left p-3 font-medium">Email</th>
                                <th className="text-left p-3 font-medium">Mobile</th>
                                <th className="text-left p-3 font-medium">Admin</th>
                                <th className="text-left p-3 font-medium">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-b border-neutral-100">
                                    <td className="p-3">{u.name}</td>
                                    <td className="p-3">{u.email}</td>
                                    <td className="p-3">{u.mobileNo}</td>
                                    <td className="p-3">{u.isAdmin ? "Yes" : "No"}</td>
                                    <td className="p-3 text-neutral-600">
                                        {u.createdAt
                                            ? format(new Date(u.createdAt), "PP")
                                            : "—"}
                                    </td>
                                </tr>
                            ))}
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
