/*
  Warnings:

  - You are about to drop the `player_footy_event` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `end_hour` to the `footy_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_hour` to the `footy_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `footyEventId` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "player_footy_event" DROP CONSTRAINT "player_footy_event_footy_event_id_fkey";

-- DropForeignKey
ALTER TABLE "player_footy_event" DROP CONSTRAINT "player_footy_event_player_id_fkey";

-- DropForeignKey
ALTER TABLE "player_footy_event" DROP CONSTRAINT "player_footy_event_team_id_fkey";

-- AlterTable
ALTER TABLE "footy_event" ADD COLUMN     "end_hour" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_hour" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "team" ADD COLUMN     "footyEventId" TEXT NOT NULL;

-- DropTable
DROP TABLE "player_footy_event";

-- CreateTable
CREATE TABLE "TeamPlayer" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "goals" INTEGER,
    "assists" INTEGER,

    CONSTRAINT "TeamPlayer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_footyEventId_fkey" FOREIGN KEY ("footyEventId") REFERENCES "footy_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPlayer" ADD CONSTRAINT "TeamPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPlayer" ADD CONSTRAINT "TeamPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
