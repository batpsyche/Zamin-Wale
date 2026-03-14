import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { authMiddleware } from "../middleware/auth.js";
import { prisma } from "../db/prisma.js";
import { successData, errorData, successList } from "../utils/response.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();
const DEFAULT_LIMIT = 20;

function toCSV(rows, columns) {
  const header = columns.join(",");
  const lines = rows.map((row) => columns.map((col) => {
    const v = row[col];
    if (v == null) return "";
    const s = String(v);
    return s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
  }).join(","));
  return [header, ...lines].join("\n");
}

// ----- Website enquiry -----
router.post("/website/add", async (req, res, next) => {
  try {
    const { name, email, mobile, mobileNo, message, advertisement } = req.body;
    if (!name || !email) return errorData(res, "Name and email are required", 400);
    const enquiry = await prisma.websiteEnquiry.create({
      data: { name, email: email.trim(), mobile: mobile || mobileNo || null, message: message || advertisement || null },
    });
    return successData(res, { id: enquiry.id, message: "Enquiry submitted" }, 201);
  } catch (err) {
    next(err);
  }
});

router.get("/website/getAll", authMiddleware, async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.websiteEnquiry.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit + 1,
      }),
      prisma.websiteEnquiry.count(),
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

router.get("/website/export", authMiddleware, async (req, res, next) => {
  try {
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const where = {};
    if (startDate) where.createdAt = { ...where.createdAt, gte: new Date(startDate) };
    if (endDate) where.createdAt = { ...where.createdAt, lte: new Date(endDate) };
    const rows = await prisma.websiteEnquiry.findMany({ where, orderBy: { createdAt: "desc" } });
    const csv = toCSV(rows, ["id", "name", "email", "mobile", "message", "createdAt"]);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=website-enquiries.csv");
    return res.send(csv);
  } catch (err) {
    next(err);
  }
});

// ----- Property enquiry -----
router.post("/property/add/:propertyId", async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { name, email, mobile, mobileNo, message } = req.body;
    if (!name || !email) return errorData(res, "Name and email are required", 400);
    const prop = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!prop) return errorData(res, "Property not found", 404);
    const enquiry = await prisma.propertyEnquiry.create({
      data: {
        propertyId,
        name,
        email: email.trim(),
        mobile: mobile || mobileNo || null,
        message: message || null,
      },
    });
    return successData(res, { id: enquiry.id, message: "Enquiry submitted" }, 201);
  } catch (err) {
    next(err);
  }
});

router.get("/property/getAll/:propertyId", authMiddleware, async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.propertyEnquiry.findMany({
        where: { propertyId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit + 1,
      }),
      prisma.propertyEnquiry.count({ where: { propertyId } }),
    ]);
    const hasNext = items.length > limit;
    const result = (hasNext ? items.slice(0, limit) : items).map((e) => ({
      id: e.id,
      propertyId: e.propertyId,
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

router.get("/property/export/:propertyId", authMiddleware, async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const where = { propertyId };
    if (startDate) where.createdAt = { ...where.createdAt, gte: new Date(startDate) };
    if (endDate) where.createdAt = { ...where.createdAt, lte: new Date(endDate) };
    const rows = await prisma.propertyEnquiry.findMany({ where, orderBy: { createdAt: "desc" } });
    const csv = toCSV(rows, ["id", "propertyId", "name", "email", "mobile", "message", "createdAt"]);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=property-enquiries.csv");
    return res.send(csv);
  } catch (err) {
    next(err);
  }
});

// ----- Property visit -----
router.post("/property/add/visit/:propertyId", async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { name, email, mobile, mobileNo, preferredDate, visitAt, message } = req.body;
    if (!name || !email) return errorData(res, "Name and email are required", 400);
    const prop = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!prop) return errorData(res, "Property not found", 404);
    const visit = await prisma.propertyVisit.create({
      data: {
        propertyId,
        name,
        email: email.trim(),
        mobile: mobile || mobileNo || null,
        preferredDate: preferredDate || visitAt || null,
        message: message || null,
      },
    });
    return successData(res, { id: visit.id, message: "Visit request submitted" }, 201);
  } catch (err) {
    next(err);
  }
});

router.get("/property/getAll/visit/:propertyId", authMiddleware, async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.propertyVisit.findMany({
        where: { propertyId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit + 1,
      }),
      prisma.propertyVisit.count({ where: { propertyId } }),
    ]);
    const hasNext = items.length > limit;
    const result = (hasNext ? items.slice(0, limit) : items).map((v) => ({
      id: v.id,
      propertyId: v.propertyId,
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

router.get("/property/export/visit/:propertyId", authMiddleware, async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const where = { propertyId };
    if (startDate) where.createdAt = { ...where.createdAt, gte: new Date(startDate) };
    if (endDate) where.createdAt = { ...where.createdAt, lte: new Date(endDate) };
    const rows = await prisma.propertyVisit.findMany({ where, orderBy: { createdAt: "desc" } });
    const csv = toCSV(rows, ["id", "propertyId", "name", "email", "mobile", "preferredDate", "message", "createdAt"]);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=property-visits.csv");
    return res.send(csv);
  } catch (err) {
    next(err);
  }
});

export default router;
