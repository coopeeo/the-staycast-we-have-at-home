/*
  Warnings:

  - You are about to drop the column `mdns` on the `Chromecast` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `Chromecast` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ipAddress]` on the table `Chromecast` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ipAddress` to the `Chromecast` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Chromecast_mdns_key";

-- DropIndex
DROP INDEX "public"."Chromecast_serialNumber_key";

-- AlterTable
ALTER TABLE "public"."Chromecast" DROP COLUMN "mdns",
DROP COLUMN "serialNumber",
ADD COLUMN     "ipAddress" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chromecast_ipAddress_key" ON "public"."Chromecast"("ipAddress");
