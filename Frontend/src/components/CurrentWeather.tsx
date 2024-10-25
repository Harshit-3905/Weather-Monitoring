import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { cities } from '../common/cities';

interface WeatherData {
    city: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    main: string;
    description: string;
    timestamp: string;
}

type TemperatureUnit = 'K' | 'C' | 'F';

const CurrentWeather: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string>(cities[0]);
    const [tempUnit, setTempUnit] = useState<TemperatureUnit>('C');

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/current-weather`, {
                    params: { city: selectedCity }
                });
                console.log(response);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setWeatherData(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setError('An unexpected error occurred. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [selectedCity]);

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    };

    const handleTempUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTempUnit(event.target.value as TemperatureUnit);
    };

    const convertTemperature = (kelvin: number | undefined): number | undefined => {
        if (kelvin === undefined) return undefined;
        switch (tempUnit) {
            case 'C':
                return kelvin - 273.15;
            case 'F':
                return (kelvin - 273.15) * 9 / 5 + 32;
            default:
                return kelvin;
        }
    };

    const formatTemperature = (kelvin: number | undefined): string => {
        const converted = convertTemperature(kelvin);
        if (converted === undefined) return 'N/A';

        if (tempUnit === 'K') {
            return `${converted.toFixed(1)} K`;
        } else {
            return `${converted.toFixed(1)}°${tempUnit}`;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">Current Weather</h1>
            <div className="max-w-md mx-auto mb-6 flex justify-between">
                <div className="w-1/2 mr-2">
                    <label htmlFor="city-select" className="block mb-2 text-sm font-medium text-gray-300">Select a city:</label>
                    <select
                        id="city-select"
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="bg-gray-700 border border-gray-600 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className="w-1/2 ml-2">
                    <label htmlFor="temp-unit-select" className="block mb-2 text-sm font-medium text-gray-300">Temperature unit:</label>
                    <select
                        id="temp-unit-select"
                        value={tempUnit}
                        onChange={handleTempUnitChange}
                        className="bg-gray-700 border border-gray-600 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="K">Kelvin</option>
                        <option value="C">Celsius</option>
                        <option value="F">Fahrenheit</option>
                    </select>
                </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto h-96 flex items-center justify-center">
                {loading ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-300">Loading...</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">
                        <p>{error}</p>
                        <p className="mt-2">Please check your internet connection and try again.</p>
                    </div>
                ) : weatherData ? (
                    <div className="w-full">
                        <h2 className="text-3xl font-semibold mb-4 text-blue-400">{weatherData.city}</h2>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-5xl font-bold text-gray-100">{formatTemperature(weatherData.temp)}</p>
                            <p className="text-xl font-medium text-gray-300 capitalize">{weatherData.main}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-gray-300">
                            <p>Feels like: {formatTemperature(weatherData.feels_like)}</p>
                            <p>Humidity: {weatherData.humidity !== undefined ? `${weatherData.humidity}%` : 'N/A'}</p>
                            <p>Min: {formatTemperature(weatherData.temp_min)}</p>
                            <p>Max: {formatTemperature(weatherData.temp_max)}</p>
                            <p>Pressure: {weatherData.pressure !== undefined ? `${weatherData.pressure} hPa` : 'N/A'}</p>
                            <p className="capitalize">{weatherData.description || 'N/A'}</p>
                        </div>
                        <p className="text-sm text-gray-400 mt-6">
                            Last updated: {weatherData.timestamp ? new Date(weatherData.timestamp).toLocaleString() : 'N/A'}
                        </p>
                    </div>
                ) : (
                    <div className="text-center text-yellow-500">
                        <p>No weather data available for the selected city.</p>
                        <p className="mt-2">Please try again later or select a different city.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrentWeather;
