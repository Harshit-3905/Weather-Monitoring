# Weather-Monitoring

Weather-Monitoring is a full-stack application that provides real-time weather information and historical data for various cities. This project combines a frontend built with React and TypeScript, and a backend powered by Node.js with a PostgreSQL database.

## Features

- **Real-time Weather Data**: Get up-to-the-minute weather information for multiple cities around the world.
- **Historical Data Visualization**: View historical weather data with interactive charts and graphs.
- **User-Friendly Interface**: Easily navigate through current weather conditions with a clean and intuitive UI.
- **Temperature Trends**: Analyze temperature trends over time with customizable charts.
- **Customizable City Selection**: Select and save your favorite cities for quick access to weather data.

## Tech Stack

### Frontend

- React
- TypeScript
- Chart.js for data visualization

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL database

## Getting Started

1. Clone the repository
2. Run the application using Docker Compose:
   - Ensure Docker and Docker Compose are installed on your machine
   - In the root directory of the project, run: `docker-compose up`
   - This will build and start both the frontend and backend services along with the PostgreSQL database
   - The frontend will be accessible at `http://localhost:3000`
   - The backend will be running at `http://localhost:5000`
