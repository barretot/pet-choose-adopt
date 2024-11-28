/*
  Warnings:

  - Made the column `petId` on table `adoptions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `adoptions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "adoptions" DROP CONSTRAINT "adoptions_petId_fkey";

-- DropForeignKey
ALTER TABLE "adoptions" DROP CONSTRAINT "adoptions_userId_fkey";

-- AlterTable
ALTER TABLE "adoptions" ALTER COLUMN "petId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
