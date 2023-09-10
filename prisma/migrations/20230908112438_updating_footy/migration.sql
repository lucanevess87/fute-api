/*
  Warnings:

  - Added the required column `end_hour` to the `footy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_hour` to the `footy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "footy" ADD COLUMN     "end_hour" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "num_of_teams" INTEGER,
ADD COLUMN     "players_per_team" INTEGER,
ADD COLUMN     "start_hour" TIMESTAMP(3) NOT NULL;
