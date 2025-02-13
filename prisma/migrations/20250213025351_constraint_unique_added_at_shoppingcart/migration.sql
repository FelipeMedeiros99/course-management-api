/*
  Warnings:

  - A unique constraint covering the columns `[userId,courseId]` on the table `shoppingCart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shoppingCart_userId_courseId_key" ON "shoppingCart"("userId", "courseId");
