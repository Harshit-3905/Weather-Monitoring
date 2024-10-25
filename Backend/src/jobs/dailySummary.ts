import prisma from "../db/db";
import { cities } from "../config";
import cron from "node-cron";
import { WeatherData } from "@prisma/client";

export const calculateDailySummaries = () => {
  cron.schedule("0 0 * * *", async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const summaryPromises = cities.map(async (city) => {
      const weatherData = await prisma.weatherData.findMany({
        where: { city: city.name, timestamp: { gte: today } },
      });

      if (weatherData.length > 0) {
        const avgTemp = calculateAverage(weatherData.map((data) => data.temp));
        const maxTemp = Math.max(...weatherData.map((data) => data.temp));
        const minTemp = Math.min(...weatherData.map((data) => data.temp));
        const avgFeelsLike = calculateAverage(
          weatherData.map((data) => data.feels_like)
        );
        const avgPressure = calculateAverage(
          weatherData.map((data) => data.pressure)
        );
        const avgHumidity = calculateAverage(
          weatherData.map((data) => data.humidity)
        );
        const dominantWeather = getDominantWeather(weatherData);

        return {
          city: city.name,
          avgTemp,
          maxTemp,
          minTemp,
          avgFeelsLike,
          avgPressure,
          avgHumidity,
          dominantWeather,
          date: today,
        };
      }
    });

    const summaries = await Promise.all(summaryPromises);
    const validSummaries = summaries.filter((summary) => summary !== undefined);

    if (validSummaries.length > 0) {
      await prisma.dailySummary.createMany({
        data: validSummaries,
      });
    }
  });
};

function calculateAverage(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

function getDominantWeather(weatherData: WeatherData[]): string {
  const weatherCounts = weatherData.reduce((acc, data) => {
    acc[data.main] = (acc[data.main] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(weatherCounts).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];
}
