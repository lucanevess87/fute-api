/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `footy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `footy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "footy" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "footy_username_key" ON "footy"("username");
