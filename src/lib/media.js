export function normalizeMediaUrl(url) {
    if (!url) return "";
    if (typeof url !== "string") return "";
    // If it's already a relative path, keep as is
    if (url.startsWith("/")) return url;
    try {
        const u = new URL(url);
        return u.pathname || "";
    } catch {
        return url;
    }
}

