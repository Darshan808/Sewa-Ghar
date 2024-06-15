-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "serviceProviderId" INTEGER NOT NULL,
    "issueId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ServiceCategoryToServiceProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Response_issueId_key" ON "Response"("issueId");

-- CreateIndex
CREATE UNIQUE INDEX "_ServiceCategoryToServiceProvider_AB_unique" ON "_ServiceCategoryToServiceProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_ServiceCategoryToServiceProvider_B_index" ON "_ServiceCategoryToServiceProvider"("B");

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "ServiceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceCategoryToServiceProvider" ADD CONSTRAINT "_ServiceCategoryToServiceProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "ServiceCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceCategoryToServiceProvider" ADD CONSTRAINT "_ServiceCategoryToServiceProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
