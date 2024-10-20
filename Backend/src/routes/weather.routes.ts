import express from "express";
import { fetchAndSaveWeatherData } from "../controllers/weather.controller";
import { getDailySummaries } from "../controllers/weather.controller";

const router = express.Router();

router.get("/fetch-weather", fetchAndSaveWeatherData);
router.get("/daily-summaries", getDailySummaries);

export default router;
