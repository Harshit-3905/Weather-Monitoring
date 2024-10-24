import { Request, Response } from "express";
import axios from "axios";
import { convertKelvinToCelsius } from "../utils";
import prisma from "../db/db";
import { cities, API_KEY } from "../config";

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

// Store weather data in the database
const saveWeatherData = async (weatherData: any) => {
  return await prisma.weatherData.create({
    data: weatherData,
  });
};

// Controller function to fetch and store weather data for all cities
export const fetchAndSaveWeatherData = async (req: Request, res: Response) => {
  try {
    const promises = cities.map((city) => fetchWeatherData(city.name));
    const weatherDataArray = await Promise.all(promises);

    await Promise.all(weatherDataArray.map((data) => saveWeatherData(data)));

    res
      .status(200)
      .json({ message: "Weather data fetched and saved successfully." });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
};

export const getDailySummaries = async (req: Request, res: Response) => {
  try {
    const { city } = req.query;

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
