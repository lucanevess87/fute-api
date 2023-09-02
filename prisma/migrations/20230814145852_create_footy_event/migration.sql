/*
  Warnings:

  - You are about to drop the column `create_at` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `footyId` on the `team` table. All the data in the column will be lost.
  - Made the column `footy_id` on table `player` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `type` on the `player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `footy_event_id` to the `team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `victories` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlayerType" AS ENUM ('mensalist', 'diarist');

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_footy_id_fkey";

-- DropForeignKey
ALTER TABLE "team" DROP CONSTRAINT "team_footyId_fkey";

-- AlterTable
ALTER TABLE "player" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "footy_id" SET NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "PlayerType" NOT NULL;

-- AlterTable
ALTER TABLE "team" DROP COLUMN "footyId",
ADD COLUMN     "footy_event_id" TEXT NOT NULL,
ADD COLUMN     "victories" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "footy_event" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "footy_id" TEXT NOT NULL,

    CONSTRAINT "footy_event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "footy_event" ADD CONSTRAINT "footy_event_footy_id_fkey" FOREIGN KEY ("footy_id") REFERENCES "footy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_footy_event_id_fkey" FOREIGN KEY ("footy_event_id") REFERENCES "footy_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_footy_id_fkey" FOREIGN KEY ("footy_id") REFERENCES "footy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
