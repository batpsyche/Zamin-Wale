/**
 * Map DB property to frontend-expected shape (camelCase, id, priceTotal as number, etc.)
 */
export function propertyToResponse(p) {
  if (!p) return null;
  const photos = p.propertyPhotos;
  return {
    id: p.id,
    propertyId: p.id,
    userId: p.userId,
    uid: p.userId,
    listingType: p.listingType,
    propertyType: p.propertyType,
    propertyCategories: p.propertyCategories,
    city: p.city,
    locality: p.locality,
    plotArea: p.plotArea,
    plotAreaUnit: p.plotAreaUnit,
    length: p.length,
    breadth: p.breadth,
    allowedFloors: p.allowedFloors,
    hasBoundaryWall: p.hasBoundaryWall ?? false,
    openSides: p.openSides,
    hasConstruction: p.hasConstruction ?? false,
    possessionBy: p.possessionBy,
    ownership: p.ownership,
    priceTotal: p.priceTotal != null ? Number(p.priceTotal) : null,
    pricePerSQFT: p.pricePerSQFT != null ? Number(p.pricePerSQFT) : null,
    inclusivePrice: p.inclusivePrice ?? false,
    isTaxExcluded: p.isTaxExcluded ?? false,
    isPriceNegotiable: p.isPriceNegotiable ?? false,
    uniqueFeatures: p.uniqueFeatures,
    propertyVideo: p.propertyVideo,
    propertyPhotos: Array.isArray(photos) ? photos : (photos ? [photos] : []),
    amenities: p.amenities ?? [],
    overlooking: p.overlooking ?? [],
    otherFeatures: p.otherFeatures,
    propertyFacing: p.propertyFacing,
    locationAdvantages: p.locationAdvantages ?? [],
    title: p.title,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}
