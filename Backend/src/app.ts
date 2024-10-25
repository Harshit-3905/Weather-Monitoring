import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", weatherRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Weather Monitoring Backend by Harshit Joshi");
});

export default app;
