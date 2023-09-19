/*
  Warnings:

  - The values [mensalist,diarist] on the enum `PlayerType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlayerType_new" AS ENUM ('monthly', 'daily');
ALTER TABLE "player" ALTER COLUMN "type" TYPE "PlayerType_new" USING ("type"::text::"PlayerType_new");
ALTER TYPE "PlayerType" RENAME TO "PlayerType_old";
ALTER TYPE "PlayerType_new" RENAME TO "PlayerType";
DROP TYPE "PlayerType_old";
COMMIT;
