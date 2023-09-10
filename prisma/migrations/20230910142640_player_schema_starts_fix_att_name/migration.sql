/*
  Warnings:

  - You are about to drop the column `starts` on the `player` table. All the data in the column will be lost.
  - Added the required column `stars` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "player" DROP COLUMN "starts",
ADD COLUMN     "stars" INTEGER NOT NULL;
