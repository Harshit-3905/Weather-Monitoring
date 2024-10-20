/*
  Warnings:

  - Added the required column `description` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humidity` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pressure` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temp_max` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temp_min` to the `WeatherData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeatherData" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "humidity" INTEGER NOT NULL,
ADD COLUMN     "pressure" INTEGER NOT NULL,
ADD COLUMN     "temp_max" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "temp_min" DOUBLE PRECISION NOT NULL;
