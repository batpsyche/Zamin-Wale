"use server";

import { fetchWithToken } from "@/services/fetch";

function toQueryString(params) {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") sp.set(k, String(v));
    });
    return sp.toString();
}

export async function getAdminUsers({ page = 1, limit = 20, q, isAdmin, startDate, endDate } = {}) {
    const query = toQueryString({ page, limit, q, isAdmin, startDate, endDate });
    const res = await fetchWithToken(`/admin/users?${query}`, { method: "GET" });
    return res?.results?.data ?? { result: [], pagination: {} };
}

export async function updatePropertyAdmin(id, body) {
    const res = await fetchWithToken(`/admin/properties/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
    });
    return res?.results?.data;
}

export async function deletePropertyAdmin(id) {
    const res = await fetchWithToken(`/admin/properties/${id}`, {
        method: "DELETE",
    });
    return res?.results?.data;
}

export async function getAdminPropertyEnquiries({
    page = 1,
    limit = 20,
    q,
    propertyId,
    startDate,
    endDate,
} = {}) {
    const query = toQueryString({ page, limit, q, propertyId, startDate, endDate });
    const res = await fetchWithToken(`/admin/enquiries/property?${query}`, { method: "GET" });
    return res?.results?.data ?? { result: [], pagination: {} };
}

export async function getAdminPropertyVisits({
    page = 1,
    limit = 20,
    q,
    propertyId,
    startDate,
    endDate,
} = {}) {
    const query = toQueryString({ page, limit, q, propertyId, startDate, endDate });
    const res = await fetchWithToken(`/admin/enquiries/visit?${query}`, { method: "GET" });
    return res?.results?.data ?? { result: [], pagination: {} };
}

export async function getAdminWebsiteEnquiries({
    page = 1,
    limit = 20,
    q,
    startDate,
    endDate,
} = {}) {
    const query = toQueryString({ page, limit, q, startDate, endDate });
    const res = await fetchWithToken(`/admin/enquiries/website?${query}`, { method: "GET" });
    return res?.results?.data ?? { result: [], pagination: {} };
}
