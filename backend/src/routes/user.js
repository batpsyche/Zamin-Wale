import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { prisma } from "../db/prisma.js";
import { successData, errorData, successList } from "../utils/response.js";
import { propertyToResponse } from "../utils/propertyShape.js";

const router = Router();

router.get("/profile", authMiddleware, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, mobileNo: true, isAdmin: true },
    });
    if (!user) return errorData(res, "User not found", 404);
    return successData(res, user);
  } catch (err) {
    next(err);
  }
});

const DEFAULT_LIMIT = 20;

router.get("/properties", authMiddleware, async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.property.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit + 1,
      }),
      prisma.property.count({ where: { userId: req.user.id } }),
    ]);
    const hasNext = items.length > limit;
    const result = (hasNext ? items.slice(0, limit) : items).map(propertyToResponse);
    return successList(res, result, {
      next: hasNext,
      page,
      limit,
      total,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/properties/edit", authMiddleware, async (req, res, next) => {
  try {
    const body = req.body;
    const propertyId = body.propertyId || body.id;
    if (!propertyId) return errorData(res, "propertyId is required", 400);
    const existing = await prisma.property.findFirst({
      where: { id: propertyId, userId: req.user.id },
    });
    if (!existing) return errorData(res, "Property not found", 404);
    const updated = await prisma.property.update({
      where: { id: propertyId },
      data: buildPropertyUpdate(body),
    });
    return successData(res, { ...propertyToResponse(updated), message: "Property updated" });
  } catch (err) {
    next(err);
  }
});

router.delete("/properties/delete/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.property.findFirst({
      where: { id, userId: req.user.id },
    });
    if (!existing) return errorData(res, "Property not found", 404);
    await prisma.property.delete({ where: { id } });
    return successData(res, { message: "Property deleted" });
  } catch (err) {
    next(err);
  }
});

export function buildPropertyUpdate(body) {
  const data = {};
  const fields = [
    "listingType", "propertyType", "propertyCategories", "city", "locality",
    "plotArea", "plotAreaUnit", "length", "breadth", "allowedFloors",
    "hasBoundaryWall", "openSides", "hasConstruction", "possessionBy", "ownership",
    "inclusivePrice", "isTaxExcluded", "isPriceNegotiable", "uniqueFeatures",
    "propertyVideo", "otherFeatures", "propertyFacing", "title",
  ];
  fields.forEach((f) => {
    if (body[f] !== undefined) data[f] = body[f];
  });
  if (body.priceTotal !== undefined) data.priceTotal = body.priceTotal;
  if (body.pricePerSQFT !== undefined) data.pricePerSQFT = body.pricePerSQFT;
  if (Array.isArray(body.propertyPhotos)) data.propertyPhotos = body.propertyPhotos;
  if (Array.isArray(body.amenities)) data.amenities = body.amenities;
  if (Array.isArray(body.overlooking)) data.overlooking = body.overlooking;
  if (Array.isArray(body.locationAdvantages)) data.locationAdvantages = body.locationAdvantages;
  return data;
}

export default router;
