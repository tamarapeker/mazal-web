/*
  Warnings:

  - You are about to drop the column `measurements` on the `ProductFormat` table. All the data in the column will be lost.
  - You are about to drop the column `variantCode` on the `ProductFormat` table. All the data in the column will be lost.
  - You are about to drop the column `variantName` on the `ProductFormat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductFormat" DROP COLUMN "measurements",
DROP COLUMN "variantCode",
DROP COLUMN "variantName";

-- CreateTable
CREATE TABLE "FormatDetail" (
    "id" SERIAL NOT NULL,
    "formatId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "FormatDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FormatDetail_formatId_idx" ON "FormatDetail"("formatId");

-- CreateIndex
CREATE INDEX "ProductFormat_productId_idx" ON "ProductFormat"("productId");

-- AddForeignKey
ALTER TABLE "FormatDetail" ADD CONSTRAINT "FormatDetail_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "ProductFormat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
