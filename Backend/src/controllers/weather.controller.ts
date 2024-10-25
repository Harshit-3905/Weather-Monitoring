import { Request, Response } from "express";
import axios from "axios";
import prisma from "../db/db";
import { API_KEY } from "../config";

// Fetch weather data from OpenWeatherMap API
const fetchWeatherData = async (city: string) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const response = await axios.get(url);
  const data = response.data;
  return {
    city,
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    main: data.weather[0].main,
    description: data.weather[0].description,
    timestamp: new Date(data.dt * 1000),
  };
};

export const getDailySummaries = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;

    if (!city) {
      res.status(400).json({ error: "City parameter is required" });
      return;
    }

    const dailySummaries = await prisma.dailySummary.findMany({
      where: {
        city: city as string,
      },
      orderBy: {
        date: "asc",
      },
      take: 30,
    });

    res.status(200).json(dailySummaries);
  } catch (error) {
    console.error("Error fetching daily summaries:", error);
    res.status(500).json({ error: "Failed to fetch daily summaries." });
  }
};

// Controller function to fetch current weather data for a single city
export const getCurrentWeather = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    if (!city) {
      res.status(400).json({ error: "City parameter is required" });
      return;
    }

    const weatherData = await fetchWeatherData(city);
    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Error fetching current weather data:", error);
    res.status(500).json({ error: "Failed to fetch current weather data." });
  }
};
