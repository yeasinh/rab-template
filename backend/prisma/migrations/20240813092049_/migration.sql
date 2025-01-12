-- AlterTable
ALTER TABLE "menus" ALTER COLUMN "updateAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updateAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "menuItems" (
    "id" SERIAL NOT NULL,
    "labelBn" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "parent" INTEGER NOT NULL,
    "sort" INTEGER NOT NULL,
    "class" TEXT NOT NULL,
    "menu" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "menuItems_pkey" PRIMARY KEY ("id")
);
