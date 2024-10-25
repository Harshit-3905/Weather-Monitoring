import express from "express";
import {
  getDailySummaries,
  getCurrentWeather,
} from "../controllers/weather.controller";
import { createTrigger } from "../controllers/trigger.controller";

const router = express.Router();

router.get("/daily-summaries/:city", getDailySummaries);
router.get("/current-weather/:city", getCurrentWeather);
router.post("/triggers", createTrigger);

export default router;
