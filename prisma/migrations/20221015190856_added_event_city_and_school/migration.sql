-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "tags" TEXT[],
    "cityId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
