/*
  Warnings:

  - Added the required column `avgFeelsLike` to the `DailySummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avgHumidity` to the `DailySummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avgPressure` to the `DailySummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DailySummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailySummary" ADD COLUMN     "avgFeelsLike" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "avgHumidity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "avgPressure" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
