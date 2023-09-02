/*
  Warnings:

  - Added the required column `updated_at` to the `footy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "footy" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "player" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "team" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
