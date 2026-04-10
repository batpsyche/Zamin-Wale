"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { getHomepageBanners as getPublicHomepageBanners } from "@/actions/property";
import { fetchWithToken } from "@/services/fetch";
import cookieService from "@/services/cookie";
import useZaminwaleStore from "@/store";
import { toast } from "sonner";
import Image from "next/image";
import { normalizeMediaUrl } from "@/lib/media";

const AdminHomepageCarouselPage = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploadingDesktop, setUploadingDesktop] = useState(false);
    const [uploadingMobile, setUploadingMobile] = useState(false);
    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        desktopImageUrl: "",
        mobileImageUrl: "",
        ctaLabel: "",
        ctaHref: "",
        isActive: true,
        sortOrder: 0,
    });

    const loadBanners = async () => {
        setLoading(true);
        try {
            const res = await fetchWithToken("/admin/homepage-banners", {
                method: "GET",
            });
            setBanners(res?.results?.data ?? []);
        } catch (e) {
            toast.error("Failed to load homepage banners");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBanners();
    }, []);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleCreate = async () => {
        if (!form.desktopImageUrl || !form.mobileImageUrl) {
            toast.error("Desktop and Mobile images are required");
            return;
        }
        setSaving(true);
        try {
            const res = await fetchWithToken("/admin/homepage-banners", {
                method: "POST",
                body: JSON.stringify(form),
            });
            const created = res?.results?.data;
            if (created) {
                setBanners((prev) => [...prev, created]);
                toast.success("Banner created");
                setForm({
                    title: "",
                    subtitle: "",
                    desktopImageUrl: "",
                    mobileImageUrl: "",
                    ctaLabel: "",
                    ctaHref: "",
                    isActive: true,
                    sortOrder: (form.sortOrder || 0) + 1,
                });
            }
        } catch (e) {
            toast.error("Failed to create banner");
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (field, file) => {
        if (!file) return;
        const setUploading =
            field === "desktopImageUrl" ? setUploadingDesktop : setUploadingMobile;
        setUploading(true);
        try {
            const body = new FormData();
            body.append("file", file);
            const res = await fetchWithToken("/property/upload/file", {
                method: "POST",
                noContentType: true,
                body,
            });
            const url =
                res?.results?.url ||
                res?.results?.data?.url ||
                res?.url;
            if (!url) {
                throw new Error("Upload did not return a URL");
            }
            handleChange(field, normalizeMediaUrl(url));
            toast.success("Image uploaded");
        } catch (e) {
            console.error(e);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleToggleActive = async (banner) => {
        try {
            const res = await fetchWithToken(`/admin/homepage-banners/${banner.id}`, {
                method: "PUT",
                body: JSON.stringify({ isActive: !banner.isActive }),
            });
            const updated = res?.results?.data;
            if (updated) {
                setBanners((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
            }
        } catch {
            toast.error("Failed to update banner");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this banner?")) return;
        try {
            await fetchWithToken(`/admin/homepage-banners/${id}`, { method: "DELETE" });
            setBanners((prev) => prev.filter((b) => b.id !== id));
            toast.success("Banner deleted");
        } catch {
            toast.error("Failed to delete banner");
        }
    };

    const handleSortChange = async (banner, sortOrder) => {
        const value = Number(sortOrder);
        if (Number.isNaN(value)) return;
        try {
            const res = await fetchWithToken(`/admin/homepage-banners/${banner.id}`, {
                method: "PUT",
                body: JSON.stringify({ sortOrder: value }),
            });
            const updated = res?.results?.data;
            if (updated) {
                setBanners((prev) =>
                    prev
                        .map((b) => (b.id === updated.id ? updated : b))
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                );
            }
        } catch {
            toast.error("Failed to update sort order");
        }
    };

    return (
        <div className="flex flex-col w-full flex-1 overflow-y-auto p-4 md:p-6">
            <div className="flex flex-col gap-6 max-w-5xl w-full">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#6f272b]">
                        Homepage Carousel
                    </h1>
                </div>

                <div className="rounded-md border border-neutral-200 p-4 space-y-3 bg-white">
                    <h2 className="text-lg font-semibold text-neutral-800">Add new banner</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-xs text-neutral-500 block">Title</label>
                            <Input
                                value={form.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                placeholder="Optional heading"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-neutral-500 block">Subtitle</label>
                            <Input
                                value={form.subtitle}
                                onChange={(e) => handleChange("subtitle", e.target.value)}
                                placeholder="Optional subheading"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-neutral-500 block">
                                Desktop image
                            </label>
                            <div
                                className="flex flex-col gap-2 border border-dashed border-neutral-300 rounded-md p-2 bg-neutral-50/40 hover:bg-neutral-50 transition-colors"
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files?.[0];
                                    if (file) {
                                        handleImageUpload("desktopImageUrl", file);
                                    }
                                }}
                            >
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageUpload(
                                            "desktopImageUrl",
                                            e.target.files?.[0]
                                        )
                                    }
                                />
                                <div className="flex items-center gap-3">
                                    {form.desktopImageUrl ? (
                                        <div className="relative w-28 h-14 rounded-md overflow-hidden border border-neutral-200 bg-neutral-50">
                                            <Image
                                                src={form.desktopImageUrl}
                                                alt={form.title || "Desktop banner"}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-28 h-14 rounded-md border border-dashed border-neutral-200 text-[11px] text-neutral-400">
                                            No image
                                        </div>
                                    )}
                                    <p className="text-[11px] text-neutral-500">
                                        {uploadingDesktop
                                            ? "Uploading..."
                                            : "Click or drag & drop. Recommended: 1600×600px (desktop)"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-neutral-500 block">
                                Mobile image
                            </label>
                            <div
                                className="flex flex-col gap-2 border border-dashed border-neutral-300 rounded-md p-2 bg-neutral-50/40 hover:bg-neutral-50 transition-colors"
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files?.[0];
                                    if (file) {
                                        handleImageUpload("mobileImageUrl", file);
                                    }
                                }}
                            >
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageUpload(
                                            "mobileImageUrl",
                                            e.target.files?.[0]
                                        )
                                    }
                                />
                                <div className="flex items-center gap-3">
                                    {form.mobileImageUrl ? (
                                        <div className="relative w-20 h-14 rounded-md overflow-hidden border border-neutral-200 bg-neutral-50">
                                            <Image
                                                src={form.mobileImageUrl}
                                                alt={form.title || "Mobile banner"}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-20 h-14 rounded-md border border-dashed border-neutral-200 text-[11px] text-neutral-400">
                                            No image
                                        </div>
                                    )}
                                    <p className="text-[11px] text-neutral-500">
                                        {uploadingMobile
                                            ? "Uploading..."
                                            : "Click or drag & drop. Recommended: 800×600px (mobile)"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-neutral-500 block">CTA label</label>
                            <Input
                                value={form.ctaLabel}
                                onChange={(e) => handleChange("ctaLabel", e.target.value)}
                                placeholder="Search / Explore / Learn more..."
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-neutral-500 block">CTA link</label>
                            <Input
                                value={form.ctaHref}
                                onChange={(e) => handleChange("ctaHref", e.target.value)}
                                placeholder="/about-99villa or /#search"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-neutral-500 block">
                                Sort order (lower = first)
                            </label>
                            <Input
                                type="number"
                                value={form.sortOrder}
                                onChange={(e) =>
                                    handleChange("sortOrder", Number(e.target.value) || 0)
                                }
                            />
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                            <Checkbox
                                id="isActive"
                                checked={form.isActive}
                                onCheckedChange={(v) =>
                                    handleChange("isActive", Boolean(v))
                                }
                            />
                            <label
                                htmlFor="isActive"
                                className="text-sm text-neutral-700 select-none"
                            >
                                Active
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className="bg-[#6f272b]"
                            onClick={handleCreate}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Add banner"}
                        </Button>
                    </div>
                </div>

                <div className="rounded-md border border-neutral-200 overflow-x-auto bg-white">
                    <table className="w-full text-sm min-w-[700px]">
                        <thead className="bg-neutral-100 border-b border-neutral-200">
                            <tr>
                                <th className="text-left p-3 font-medium">Image</th>
                                <th className="text-left p-3 font-medium">Title</th>
                                <th className="text-left p-3 font-medium">CTA</th>
                                <th className="text-left p-3 font-medium">Sort</th>
                                <th className="text-left p-3 font-medium">Active</th>
                                <th className="text-left p-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-4 text-center text-neutral-500"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : banners.length ? (
                                banners.map((b) => (
                                    <tr key={b.id} className="border-b border-neutral-100">
                                        <td className="p-3">
                                            <div className="flex gap-3">
                                                <div className="flex flex-col gap-1 items-start">
                                                    <span className="text-xs text-neutral-500">
                                                        Desktop
                                                    </span>
                                                    {b.desktopImageUrl ? (
                                                        <div className="relative w-32 h-16 rounded-md overflow-hidden border border-neutral-200 bg-neutral-50">
                                                            <Image
                                                                src={b.desktopImageUrl}
                                                                alt={b.title || "Desktop banner"}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="text-[11px] text-neutral-400">
                                                            No image
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-1 items-start">
                                                    <span className="text-xs text-neutral-500">
                                                        Mobile
                                                    </span>
                                                    {b.mobileImageUrl ? (
                                                        <div className="relative w-20 h-16 rounded-md overflow-hidden border border-neutral-200 bg-neutral-50">
                                                            <Image
                                                                src={b.mobileImageUrl}
                                                                alt={b.title || "Mobile banner"}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="text-[11px] text-neutral-400">
                                                            No image
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-medium">
                                                    {b.title || "—"}
                                                </span>
                                                <span className="text-xs text-neutral-500">
                                                    {b.subtitle || "—"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-xs">
                                            <div>{b.ctaLabel || "—"}</div>
                                            <div className="text-neutral-500">
                                                {b.ctaHref || ""}
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <Input
                                                type="number"
                                                className="w-20 h-8 text-sm"
                                                defaultValue={b.sortOrder ?? 0}
                                                onBlur={(e) =>
                                                    handleSortChange(b, e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="p-3">
                                            <Checkbox
                                                checked={b.isActive}
                                                onCheckedChange={() =>
                                                    handleToggleActive(b)
                                                }
                                            />
                                        </td>
                                        <td className="p-3">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(b.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-4 text-center text-neutral-500"
                                    >
                                        No banners yet. Add one above.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHomepageCarouselPage;

