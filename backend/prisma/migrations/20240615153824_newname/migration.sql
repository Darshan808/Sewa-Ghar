/*
  Warnings:

  - Added the required column `counterPrice` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "counterPrice" DOUBLE PRECISION NOT NULL;
