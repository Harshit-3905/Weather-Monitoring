import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import axiosInstance from '../api/axiosInstance';

interface DailySummary {
    city: string;
    avgTemp: number;
    maxTemp: number;
    minTemp: number;
    avgFeelsLike: number;
    avgPressure: number;
    avgHumidity: number;
    dominantWeather: string;
    date: string;
}

const cities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Kolkata",
    "Hyderabad"
];

const Charts: React.FC = () => {
    const [dailySummaries, setDailySummaries] = useState<DailySummary[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>(cities[0]);

    useEffect(() => {
        if (selectedCity) {
            fetchDailySummaries(selectedCity);
        }
    }, [selectedCity]);

    const fetchDailySummaries = async (city: string) => {
        try {
            const response = await axiosInstance.get(`/daily-summaries?city=${city}`);
            setDailySummaries(response.data);
        } catch (error) {
            console.error('Error fetching daily summaries:', error);
        }
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    };

    const chartData = {
        labels: dailySummaries.map((summary) => summary.date),
        datasets: [
            {
                label: 'Average Temperature',
                data: dailySummaries.map((summary) => summary.avgTemp),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Max Temperature',
                data: dailySummaries.map((summary) => summary.maxTemp),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Min Temperature',
                data: dailySummaries.map((summary) => summary.minTemp),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Daily Weather Summary for ${selectedCity}`,
            },
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Weather Charts</h1>
            <div className="mb-6">
                <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select a city:
                </label>
                <select
                    id="city-select"
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            {dailySummaries.length > 0 ? (
                <div className="bg-white p-4 rounded-lg shadow">
                    <Line options={options} data={chartData} />
                </div>
            ) : (
                <p className="text-gray-600 text-center py-4">No data available for the selected city.</p>
            )}
        </div>
    );
};

export default Charts;
