-- CreateTable
CREATE TABLE "UserNotification" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "triggerTemp" DOUBLE PRECISION,
    "triggerHumidity" INTEGER,
    "triggerPressure" INTEGER,
    "isAbove" BOOLEAN NOT NULL,
    "parameter" TEXT NOT NULL,
    "lastNotified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserNotification_email_city_parameter_isAbove_key" ON "UserNotification"("email", "city", "parameter", "isAbove");
