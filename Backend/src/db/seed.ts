import { PrismaClient } from "@prisma/client";
import { connectToDatabase } from "./db";
import { cities } from "../config";

const prisma = new PrismaClient();

function getDateXDaysAgo(daysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
}

async function seedData() {
  try {
    await connectToDatabase();

    const dates = [
      getDateXDaysAgo(0), // Today
      getDateXDaysAgo(1), // Yesterday
      getDateXDaysAgo(2), // Day before yesterday
    ];

    // Seed DailySummary data for cities in config
    for (const city of cities) {
      for (const date of dates) {
        await prisma.dailySummary.create({
          data: {
            city: city.name,
            date: date,
            avgTemp: 25 + Math.random() * 10, // Random temperature between 25 and 35
            maxTemp: 30 + Math.random() * 10, // Random max temperature between 30 and 40
            minTemp: 20 + Math.random() * 10, // Random min temperature between 20 and 30
            avgFeelsLike: 26 + Math.random() * 10, // Random feels like temperature between 26 and 36
            avgPressure: 1000 + Math.random() * 20, // Random pressure between 1000 and 1020
            avgHumidity: 50 + Math.random() * 30, // Random humidity between 50 and 80
            dominantWeather: ["Clear", "Cloudy", "Rainy"][
              Math.floor(Math.random() * 3)
            ], // Random weather condition
          },
        });
      }
    }

    console.log("Data seeding completed successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
