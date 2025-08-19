-- CreateEnum
CREATE TYPE "public"."ActiveStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'INACTIVE_EXIT');

-- CreateTable
CREATE TABLE "public"."Chromecast" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "mdns" TEXT NOT NULL,

    CONSTRAINT "Chromecast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chromecastId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "guestName" TEXT,
    "displayName" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chromecast_serialNumber_key" ON "public"."Chromecast"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Chromecast_mdns_key" ON "public"."Chromecast"("mdns");

-- CreateIndex
CREATE UNIQUE INDEX "Room_chromecastId_key" ON "public"."Room"("chromecastId");

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_chromecastId_fkey" FOREIGN KEY ("chromecastId") REFERENCES "public"."Chromecast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
