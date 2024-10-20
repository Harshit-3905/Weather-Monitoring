import cron from "node-cron";
import prisma from "../db/db";
import { API_KEY, cities } from "../config";
import axiosInstance from "../utils/axiosInstance";

const fetchWeatherData = async () => {
  try {
    const weatherPromises = cities.map(async (city) => {
      const response = await axiosInstance.get(
        `/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`
      );

      const weatherData = response.data;

      return {
        city: city,
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
    });

    const weatherDataArray = await Promise.all(weatherPromises);
    const formattedWeatherData = weatherDataArray.map((data) => ({
      city: data.city.name,
      temp: data.temp,
      feels_like: data.feels_like,
      temp_min: data.temp_min,
      temp_max: data.temp_max,
      pressure: data.pressure,
      humidity: data.humidity,
      main: data.main,
      description: data.description,
      timestamp: data.timestamp,
    }));

    await prisma.weatherData.createMany({
      data: formattedWeatherData,
    });

    console.log(
      `Weather data fetched and stored successfully at ${new Date().toISOString()}`
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

export const startWeatherFetchCron = () => {
  cron.schedule("*/5 * * * *", fetchWeatherData);
  console.log("Weather fetch cron job started (running every 5 minutes)");
};
