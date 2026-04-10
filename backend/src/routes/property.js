import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { authMiddleware } from "../middleware/auth.js";
import { prisma } from "../db/prisma.js";
import { successData, errorData, successList, successResults } from "../utils/response.js";
import { propertyToResponse } from "../utils/propertyShape.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();
const DEFAULT_LIMIT = 20;

const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({ storage });

function buildPropertyCreate(body, userId) {
  return {
    userId,
    listingType: body.listingType ?? null,
    propertyType: body.propertyType ?? null,
    propertyCategories: body.propertyCategories ?? null,
    city: body.city ?? null,
    locality: body.locality ?? null,
    plotArea: body.plotArea ?? null,
    plotAreaUnit: body.plotAreaUnit ?? null,
    length: body.length ?? null,
    breadth: body.breadth ?? null,
    allowedFloors: body.allowedFloors ?? null,
    hasBoundaryWall: Boolean(body.hasBoundaryWall),
    openSides: body.openSides ?? null,
    hasConstruction: Boolean(body.hasConstruction),
    possessionBy: body.possessionBy ?? null,
    ownership: body.ownership ?? null,
    priceTotal: body.priceTotal != null ? body.priceTotal : null,
    pricePerSQFT: body.pricePerSQFT != null ? body.pricePerSQFT : null,
    inclusivePrice: Boolean(body.inclusivePrice),
    isTaxExcluded: Boolean(body.isTaxExcluded),
    isPriceNegotiable: Boolean(body.isPriceNegotiable),
    uniqueFeatures: body.uniqueFeatures ?? null,
    propertyVideo: body.propertyVideo ?? null,
    propertyPhotos: Array.isArray(body.propertyPhotos) ? body.propertyPhotos : [],
    amenities: body.amenities ?? [],
    overlooking: body.overlooking ?? [],
    otherFeatures: body.otherFeatures ?? null,
    propertyFacing: body.propertyFacing ?? null,
    locationAdvantages: body.locationAdvantages ?? [],
    title: body.title ?? null,
  };
}

router.post("/add", authMiddleware, async (req, res, next) => {
  try {
    const data = buildPropertyCreate(req.body, req.user.id);
    const property = await prisma.property.create({ data });
    return successData(res, { ...propertyToResponse(property), message: "Property created" }, 201);
  } catch (err) {
    next(err);
  }
});

router.get("/getAll", async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.property.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit + 1,
      }),
      prisma.property.count(),
    ]);
    const hasNext = items.length > limit;
    const result = (hasNext ? items.slice(0, limit) : items).map(propertyToResponse);
    return successList(res, result, { next: hasNext, page, limit, total });
  } catch (err) {
    next(err);
  }
});

router.get("/getAll/filter", async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;
    const where = buildFilterWhere(req.query);
    const [items, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit + 1,
      }),
      prisma.property.count({ where }),
    ]);
    const hasNext = items.length > limit;
    const result = (hasNext ? items.slice(0, limit) : items).map(propertyToResponse);
    return successList(res, result, { next: hasNext, page, limit, total });
  } catch (err) {
    next(err);
  }
});

router.get("/homepage-banners", async (req, res, next) => {
  try {
    const banners = await prisma.homepageBanner.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return successData(res, banners);
  } catch (err) {
    next(err);
  }
});

function buildFilterWhere(query) {
  const where = {};
  const q = (query.q || "").trim();
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { city: { contains: q, mode: "insensitive" } },
      { locality: { contains: q, mode: "insensitive" } },
    ];
  }
  const propTypeRaw = query.propertyType ?? query["propertyType[]"];
  const propCat = query.propertyCategories ?? query["propertyCategories[]"];
  const cityVal = query.city ?? query["city[]"];
  const localityVal = query.locality ?? query["locality[]"];
  const propType = Array.isArray(propTypeRaw) ? propTypeRaw : propTypeRaw ? [propTypeRaw] : [];
  if (propType.length) {
    const arr = propType.filter((v) => v && v !== "All");
    if (arr.length) where.propertyType = arr.length === 1 ? arr[0] : { in: arr };
  }
  if (propCat) {
    const arr = Array.isArray(propCat) ? propCat : [propCat];
    if (arr.length) where.propertyCategories = arr.length === 1 ? arr[0] : { in: arr };
  }
  if (cityVal) {
    const arr = Array.isArray(cityVal) ? cityVal : [cityVal];
    if (arr.length) where.city = arr.length === 1 ? arr[0] : { in: arr };
  }
  if (localityVal) {
    const arr = Array.isArray(localityVal) ? localityVal : [localityVal];
    if (arr.length) where.locality = arr.length === 1 ? arr[0] : { in: arr };
  }
  if (query.listingType) where.listingType = query.listingType;
  if (query.priceTotalMinValue != null && query.priceTotalMinValue !== "") {
    where.priceTotal = { ...where.priceTotal, gte: parseFloat(query.priceTotalMinValue) };
  }
  if (query.priceTotalMaxValue != null && query.priceTotalMaxValue !== "") {
    where.priceTotal = { ...where.priceTotal, lte: parseFloat(query.priceTotalMaxValue) };
  }
  return Object.keys(where).length ? where : undefined;
}

router.get("/:id", async (req, res, next) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
    });
    if (!property) return errorData(res, "Property not found", 404);
    return successData(res, propertyToResponse(property));
  } catch (err) {
    next(err);
  }
});

router.post("/upload/file", authMiddleware, upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) return errorData(res, "No file uploaded", 400);
    const forwardedProto = (req.get("x-forwarded-proto") || "").split(",")[0].trim();
    const forwardedHost = (req.get("x-forwarded-host") || "").split(",")[0].trim();
    const proto = forwardedProto || req.protocol;
    const host = forwardedHost || req.get("host");

    const base = process.env.API_BASE_URL || `${proto}://${host}`;
    const url = `${base}/uploads/${req.file.filename}`;
    return successResults(res, { url });
  } catch (err) {
    next(err);
  }
});

export default router;
