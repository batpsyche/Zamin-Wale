import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";
import { buildPropertyUpdate } from "./user.js";
import { prisma } from "../db/prisma.js";
import { successData, errorData, successList } from "../utils/response.js";
import { propertyToResponse } from "../utils/propertyShape.js";

const router = Router();
const DEFAULT_LIMIT = 20;

router.use(authMiddleware);
router.use(adminMiddleware);

function buildUserWhere(query) {
  const where = {};
  const q = (query.q || "").trim();
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { mobileNo: { contains: q, mode: "insensitive" } },
    ];
  }
  if (query.isAdmin === "true") where.isAdmin = true;
  if (query.isAdmin === "false") where.isAdmin = false;
  if (query.startDate) where.createdAt = { ...where.createdAt, gte: new Date(query.startDate) };
  if (query.endDate) where.createdAt = { ...where.createdAt, lte: new Date(query.endDate) };
  return where;
}

router.get("/users", async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;
    const where = buildUserWhere(req.query);
    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit + 1,
        select: { id: true, name: true, email: true, mobileNo: true, isAdmin: true, createdAt: true },
      }),
      prisma.user.count({ where }),
    ]);
    const hasNext = items.length > limit;
    const result = hasNext ? items.slice(0, limit) : items;
    return successList(res, result, { next: hasNext, page, limit, total });
  } catch (err) {
    next(err);
  }
});

router.put("/properties/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.property.findUnique({ where: { id } });
    if (!existing) return errorData(res, "Property not found", 404);
    const updated = await prisma.property.update({
      where: { id },
      data: buildPropertyUpdate(req.body),
    });
    return successData(res, { ...propertyToResponse(updated), message: "Property updated" });
  } catch (err) {
    next(err);
  }
});

router.delete("/properties/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.property.findUnique({ where: { id } });
    if (!existing) return errorData(res, "Property not found", 404);
    await prisma.property.delete({ where: { id } });
    return successData(res, { message: "Property deleted" });
  } catch (err) {
    next(err);
  }
});

function buildPropertyEnquiryWhere(query) {
  const where = {};
  if (query.propertyId) where.propertyId = query.propertyId;
  if (query.startDate) where.createdAt = { ...where.createdAt, gte: new Date(query.startDate) };
  if (query.endDate) where.createdAt = { ...where.createdAt, lte: new Date(query.endDate) };
  const q = (query.q || "").trim();
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { mobile: { contains: q, mode: "insensitive" } },
      { message: { contains: q, mode: "insensitive" } },
      { property: { title: { contains: q, mode: "insensitive" } } },
    ];
  }
  return where;
}

router.get("/enquiries/property", async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;
    const where = buildPropertyEnquiryWhere(req.query);
    const [items, total] = await Promise.all([
      prisma.propertyEnquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit + 1,
        include: { property: { select: { id: true, title: true } } },
      }),
      prisma.propertyEnquiry.count({ where }),
    ]);
    const hasNext = items.length > limit;
    const result = (hasNext ? items.slice(0, limit) : items).map((e) => ({
      id: e.id,
      propertyId: e.propertyId,
      propertyTitle: e.property?.title ?? null,
      name: e.name,
      email: e.email,
      mobile: e.mobile,
      message: e.message,
      createdAt: e.createdAt,
    }));
    return successList(res, result, { next: hasNext, page, limit, total });
  } catch (err) {
    next(err);
  }
});

function buildPropertyVisitWhere(query) {
  const where = {};
  if (query.propertyId) where.propertyId = query.propertyId;
  if (query.preferredDate) where.preferredDate = query.preferredDate;
  if (query.startDate) where.createdAt = { ...where.createdAt, gte: new Date(query.startDate) };
  if (query.endDate) where.createdAt = { ...where.createdAt, lte: new Date(query.endDate) };
  const q = (query.q || "").trim();
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { mobile: { contains: q, mode: "insensitive" } },
      { message: { contains: q, mode: "insensitive" } },
      { property: { title: { contains: q, mode: "insensitive" } } },
    ];
  }
  return where;
}

router.get("/enquiries/visit", async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;
    const where = buildPropertyVisitWhere(req.query);
    const [items, total] = await Promise.all([
      prisma.propertyVisit.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit + 1,
        include: { property: { select: { id: true, title: true } } },
      }),
      prisma.propertyVisit.count({ where }),
    ]);
    const hasNext = items.length > limit;
    const result = (hasNext ? items.slice(0, limit) : items).map((v) => ({
      id: v.id,
      propertyId: v.propertyId,
      propertyTitle: v.property?.title ?? null,
      name: v.name,
      email: v.email,
      mobile: v.mobile,
      preferredDate: v.preferredDate,
      message: v.message,
      createdAt: v.createdAt,
    }));
    return successList(res, result, { next: hasNext, page, limit, total });
  } catch (err) {
    next(err);
  }
});

function buildWebsiteEnquiryWhere(query) {
  const where = {};
  if (query.startDate) where.createdAt = { ...where.createdAt, gte: new Date(query.startDate) };
  if (query.endDate) where.createdAt = { ...where.createdAt, lte: new Date(query.endDate) };
  const q = (query.q || "").trim();
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { mobile: { contains: q, mode: "insensitive" } },
      { message: { contains: q, mode: "insensitive" } },
    ];
  }
  return where;
}

router.get("/enquiries/website", async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;
    const where = buildWebsiteEnquiryWhere(req.query);
    const [items, total] = await Promise.all([
      prisma.websiteEnquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit + 1,
      }),
      prisma.websiteEnquiry.count({ where }),
    ]);
    const hasNext = items.length > limit;
    const result = (hasNext ? items.slice(0, limit) : items).map((e) => ({
      id: e.id,
      name: e.name,
      email: e.email,
      mobile: e.mobile,
      message: e.message,
      createdAt: e.createdAt,
    }));
    return successList(res, result, { next: hasNext, page, limit, total });
  } catch (err) {
    next(err);
  }
});

router.get("/homepage-banners", async (req, res, next) => {
  try {
    const items = await prisma.homepageBanner.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return successData(res, items);
  } catch (err) {
    next(err);
  }
});

router.post("/homepage-banners", async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      desktopImageUrl,
      mobileImageUrl,
      ctaLabel,
      ctaHref,
      isActive = true,
      sortOrder = 0,
    } = req.body ?? {};
    if (!desktopImageUrl || !mobileImageUrl) {
      return errorData(res, "desktopImageUrl and mobileImageUrl are required", 400);
    }
    const banner = await prisma.homepageBanner.create({
      data: {
        title,
        subtitle,
        desktopImageUrl,
        mobileImageUrl,
        ctaLabel,
        ctaHref,
        isActive: Boolean(isActive),
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
      },
    });
    return successData(res, banner);
  } catch (err) {
    next(err);
  }
});

router.put("/homepage-banners/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.homepageBanner.findUnique({ where: { id } });
    if (!existing) return errorData(res, "Banner not found", 404);
    const {
      title,
      subtitle,
      desktopImageUrl,
      mobileImageUrl,
      ctaLabel,
      ctaHref,
      isActive,
      sortOrder,
    } = req.body ?? {};
    const data = {};
    if (title !== undefined) data.title = title;
    if (subtitle !== undefined) data.subtitle = subtitle;
    if (desktopImageUrl !== undefined) data.desktopImageUrl = desktopImageUrl;
    if (mobileImageUrl !== undefined) data.mobileImageUrl = mobileImageUrl;
    if (ctaLabel !== undefined) data.ctaLabel = ctaLabel;
    if (ctaHref !== undefined) data.ctaHref = ctaHref;
    if (isActive !== undefined) data.isActive = Boolean(isActive);
    if (sortOrder !== undefined) data.sortOrder = Number(sortOrder) || 0;
    const banner = await prisma.homepageBanner.update({
      where: { id },
      data,
    });
    return successData(res, banner);
  } catch (err) {
    next(err);
  }
});

router.delete("/homepage-banners/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.homepageBanner.findUnique({ where: { id } });
    if (!existing) return errorData(res, "Banner not found", 404);
    await prisma.homepageBanner.delete({ where: { id } });
    return successData(res, { message: "Banner deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
