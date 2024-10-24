import cron from "node-cron";
import prisma from "../db/db";
import { API_KEY, cities } from "../config";
import axiosInstance from "../utils/axiosInstance";
import { checkTriggers } from "../services/triggerService";

const fetchWeatherData = async () => {
  try {
    const weatherPromises = cities.map(async (city) => {
      const response = await axiosInstance.get(
        `/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`
      );

      const weatherData = response.data;

      const formattedWeatherData = {
        city: city.name,
        temp: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        main: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        timestamp: new Date(),
      };

      // Check triggers for this city's weather data
      await checkTriggers(formattedWeatherData);

      return formattedWeatherData;
    });

    const weatherDataArray = await Promise.all(weatherPromises);

    await prisma.weatherData.createMany({
      data: weatherDataArray,
    });

    console.log(
      `Weather data fetched, triggers checked, and data stored successfully at ${new Date().toISOString()}`
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

export const startWeatherFetchCron = () => {
  cron.schedule("*/5 * * * *", fetchWeatherData);
  console.log("Weather fetch cron job started (running every 5 minutes)");
};
