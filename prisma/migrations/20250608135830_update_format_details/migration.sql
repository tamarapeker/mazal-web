/*
  Warnings:

  - You are about to drop the column `label` on the `FormatDetail` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `FormatDetail` table. All the data in the column will be lost.
  - Added the required column `code` to the `FormatDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measurement` to the `FormatDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormatDetail" DROP COLUMN "label",
DROP COLUMN "value",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "measurement" TEXT NOT NULL;
