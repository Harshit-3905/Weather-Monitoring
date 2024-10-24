import express from "express";
import {
  fetchAndSaveWeatherData,
  getDailySummaries,
  getCurrentWeather,
} from "../controllers/weather.controller";

const router = express.Router();

router.get("/fetch-weather", fetchAndSaveWeatherData);
router.get("/daily-summaries", getDailySummaries);
router.get("/current-weather/:city", getCurrentWeather);

export default router;
