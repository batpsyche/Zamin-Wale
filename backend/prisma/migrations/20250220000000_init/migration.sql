-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listingType" TEXT,
    "propertyType" TEXT,
    "propertyCategories" TEXT,
    "city" TEXT,
    "locality" TEXT,
    "plotArea" TEXT,
    "plotAreaUnit" TEXT,
    "length" TEXT,
    "breadth" TEXT,
    "allowedFloors" TEXT,
    "hasBoundaryWall" BOOLEAN NOT NULL DEFAULT false,
    "openSides" TEXT,
    "hasConstruction" BOOLEAN NOT NULL DEFAULT false,
    "possessionBy" TEXT,
    "ownership" TEXT,
    "priceTotal" DECIMAL(14,2),
    "pricePerSQFT" DECIMAL(14,2),
    "inclusivePrice" BOOLEAN NOT NULL DEFAULT false,
    "isTaxExcluded" BOOLEAN NOT NULL DEFAULT false,
    "isPriceNegotiable" BOOLEAN NOT NULL DEFAULT false,
    "uniqueFeatures" TEXT,
    "propertyVideo" TEXT,
    "propertyPhotos" JSONB,
    "amenities" JSONB,
    "overlooking" JSONB,
    "otherFeatures" TEXT,
    "propertyFacing" TEXT,
    "locationAdvantages" JSONB,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteEnquiry" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebsiteEnquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyEnquiry" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyEnquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyVisit" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT,
    "preferredDate" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyVisit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteEnquiry" ADD CONSTRAINT "WebsiteEnquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyEnquiry" ADD CONSTRAINT "PropertyEnquiry_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyEnquiry" ADD CONSTRAINT "PropertyEnquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyVisit" ADD CONSTRAINT "PropertyVisit_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyVisit" ADD CONSTRAINT "PropertyVisit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
