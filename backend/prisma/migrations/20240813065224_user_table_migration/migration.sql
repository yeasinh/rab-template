/*
  Warnings:

  - Changed the type of `createdAt` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updateAt` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "updateAt",
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
