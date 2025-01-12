/*
  Warnings:

  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailVarifiedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TEXT NOT NULL,
ADD COLUMN     "emailVarifiedAt" TEXT NOT NULL,
ADD COLUMN     "updateAt" TEXT NOT NULL,
ADD COLUMN     "userType" INTEGER NOT NULL;
