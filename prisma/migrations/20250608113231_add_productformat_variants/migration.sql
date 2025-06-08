/*
  Warnings:

  - You are about to drop the column `packagingSize` on the `ProductFormat` table. All the data in the column will be lost.
  - You are about to drop the column `packagingType` on the `ProductFormat` table. All the data in the column will be lost.
  - You are about to drop the column `packagingUnit` on the `ProductFormat` table. All the data in the column will be lost.
  - Added the required column `saleUnit` to the `ProductFormat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantName` to the `ProductFormat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductFormat" DROP COLUMN "packagingSize",
DROP COLUMN "packagingType",
DROP COLUMN "packagingUnit",
ADD COLUMN     "minQuantity" DOUBLE PRECISION,
ADD COLUMN     "minUnit" TEXT,
ADD COLUMN     "saleUnit" TEXT NOT NULL,
ADD COLUMN     "unitsPerBulk" INTEGER,
ADD COLUMN     "variantCode" TEXT,
ADD COLUMN     "variantName" TEXT NOT NULL;
