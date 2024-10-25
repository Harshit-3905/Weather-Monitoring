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
    id: number;
    city: string;
    date: string;
    avgTemp: number;
    maxTemp: number;
    minTemp: number;
    avgFeelsLike: number;
    avgPressure: number;
    avgHumidity: number;
    dominantWeather: string;
    createdAt: string;
    updatedAt: string;
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
            const response = await axiosInstance.get(`/daily-summaries/${city}`);
            setDailySummaries(response.data);
        } catch (error) {
            console.error('Error fetching daily summaries:', error);
        }
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    };

    const createChartData = (datasets: { label: string; data: number[]; color: string }[]) => ({
        labels: dailySummaries.map((summary) => new Date(summary.date).toLocaleDateString()),
        datasets: datasets.map(({ label, data, color }) => ({
            label,
            data,
            borderColor: color,
            backgroundColor: `${color}33`, // 20% opacity
            borderWidth: 2,
            pointBackgroundColor: color,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: color,
        })),
    });

    const createChartOptions = (title: string) => ({
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#F3F4F6',
                    font: {
                        weight: 'bold',
                    },
                },
            },
            title: {
                display: true,
                text: `${title} for ${selectedCity}`,
                color: '#F3F4F6',
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
        },
        scales: {
            x: {
                ticks: { color: '#F3F4F6' },
                grid: { color: '#4B5563' },
            },
            y: {
                ticks: { color: '#F3F4F6' },
                grid: { color: '#4B5563' },
            },
        },
    });

    const temperatureData = createChartData([
        { label: 'Average Temperature (K)', data: dailySummaries.map((summary) => summary.avgTemp), color: '#FF6384' },
        { label: 'Maximum Temperature (K)', data: dailySummaries.map((summary) => summary.maxTemp), color: '#FF9F40' },
        { label: 'Minimum Temperature (K)', data: dailySummaries.map((summary) => summary.minTemp), color: '#36A2EB' },
    ]);

    const feelsLikeData = createChartData([
        { label: 'Feels Like (K)', data: dailySummaries.map((summary) => summary.avgFeelsLike), color: '#4BC0C0' },
    ]);

    const pressureData = createChartData([
        { label: 'Pressure (hPa)', data: dailySummaries.map((summary) => summary.avgPressure), color: '#9966FF' },
    ]);

    const humidityData = createChartData([
        { label: 'Humidity (%)', data: dailySummaries.map((summary) => summary.avgHumidity), color: '#FFCE56' },
    ]);

    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-100 mb-6">Weather Charts</h1>
            <div className="mb-6">
                <label htmlFor="city-select" className="block text-sm font-medium text-gray-300 mb-2">
                    Select a city:
                </label>
                <select
                    id="city-select"
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-100"
                >
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            {dailySummaries.length > 0 ? (
                <div className="space-y-8">
                    <div className="bg-black p-4 rounded-lg shadow max-w-2xl mx-auto">
                        <div style={{ height: '300px' }}>
                            {/* @ts-expect-error: Chart.js types are not fully compatible */}
                            <Line options={createChartOptions('Temperature')} data={temperatureData} />
                        </div>
                    </div>
                    <div className="bg-black p-4 rounded-lg shadow max-w-2xl mx-auto">
                        <div style={{ height: '300px' }}>
                            {/* @ts-expect-error: Chart.js types are not fully compatible */}
                            <Line options={createChartOptions('Feels Like Temperature')} data={feelsLikeData} />
                        </div>
                    </div>
                    <div className="bg-black p-4 rounded-lg shadow max-w-2xl mx-auto">
                        <div style={{ height: '300px' }}>
                            {/* @ts-expect-error: Chart.js types are not fully compatible */}
                            <Line options={createChartOptions('Pressure')} data={pressureData} />
                        </div>
                    </div>
                    <div className="bg-black p-4 rounded-lg shadow max-w-2xl mx-auto">
                        <div style={{ height: '300px' }}>
                            {/* @ts-expect-error: Chart.js types are not fully compatible */}
                            <Line options={createChartOptions('Humidity')} data={humidityData} />
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-400 text-center py-4">No data available for the selected city.</p>
            )}
        </div>
    );
};

export default Charts;
