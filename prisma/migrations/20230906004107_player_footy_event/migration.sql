/*
  Warnings:

  - You are about to drop the column `assists` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `goals` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `footy_event_id` on the `team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_team_id_fkey";

-- DropForeignKey
ALTER TABLE "team" DROP CONSTRAINT "team_footy_event_id_fkey";

-- AlterTable
ALTER TABLE "player" DROP COLUMN "assists",
DROP COLUMN "goals",
DROP COLUMN "team_id";

-- AlterTable
ALTER TABLE "team" DROP COLUMN "footy_event_id";

-- CreateTable
CREATE TABLE "player_footy_event" (
    "footy_event_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "goals" INTEGER,
    "assists" INTEGER
);

-- CreateIndex
CREATE INDEX "idx_team_id" ON "player_footy_event"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "player_footy_event_footy_event_id_player_id_key" ON "player_footy_event"("footy_event_id", "player_id");

-- AddForeignKey
ALTER TABLE "player_footy_event" ADD CONSTRAINT "player_footy_event_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_footy_event" ADD CONSTRAINT "player_footy_event_footy_event_id_fkey" FOREIGN KEY ("footy_event_id") REFERENCES "footy_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_footy_event" ADD CONSTRAINT "player_footy_event_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
