import app from "./app";
import { connectToDatabase } from "./db/db";
import { PORT } from "./config";
import { startWeatherFetchCron } from "./jobs/fetchWeather";
import { calculateDailySummaries } from "./jobs/dailySummary";

const startServer = async () => {
  try {
    await connectToDatabase();

    if (process.env.SEED_DATA === "true") {
      console.log("Seeding data...");
      await import("./db/seed");
    }

    startWeatherFetchCron();
    calculateDailySummaries();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
