/*
  Warnings:

  - You are about to drop the column `apiKey` on the `ApiKeyAccount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `ApiKeyAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `ApiKeyAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiKeyAccount" DROP COLUMN "apiKey",
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "isReadOnly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "rateLimit" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "isActive" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeyAccount_key_key" ON "ApiKeyAccount"("key");
