/*
  Warnings:

  - You are about to drop the column `userId` on the `ServiceProvider` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `ServiceProvider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `preferredDate` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredTime` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `ServiceProvider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `ServiceProvider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ServiceProvider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `ServiceProvider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `ServiceProvider` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ServiceProvider" DROP CONSTRAINT "ServiceProvider_userId_fkey";

-- DropIndex
DROP INDEX "ServiceProvider_userId_key";

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "preferredDate" TEXT NOT NULL,
ADD COLUMN     "preferredTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ServiceProvider" DROP COLUMN "userId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'SERVICE_PROVIDER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProvider_email_key" ON "ServiceProvider"("email");
