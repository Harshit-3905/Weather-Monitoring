import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { cities } from '../common/cities';

const TriggerSetup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [parameter, setParameter] = useState('temp');
    const [triggerValue, setTriggerValue] = useState('');
    const [isAbove, setIsAbove] = useState(true);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/triggers', {
                email,
                city,
                parameter,
                triggerValue: parseFloat(triggerValue),
                isAbove,
            });
            setMessage('Trigger set successfully!');
            // Reset form
            setEmail('');
            setCity('');
            setParameter('temp');
            setTriggerValue('');
            setIsAbove(true);
        } catch (error) {
            console.error('Error setting trigger:', error);
            setMessage('Failed to set trigger. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Set Weather Trigger</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-300">City:</label>
                    <select
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="parameter" className="block mb-2 text-sm font-medium text-gray-300">Parameter:</label>
                    <select
                        id="parameter"
                        value={parameter}
                        onChange={(e) => setParameter(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="temp">Temperature</option>
                        <option value="humidity">Humidity</option>
                        <option value="pressure">Pressure</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="triggerValue" className="block mb-2 text-sm font-medium text-gray-300">Trigger Value:</label>
                    <input
                        type="number"
                        id="triggerValue"
                        value={triggerValue}
                        onChange={(e) => setTriggerValue(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">Condition:</label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center text-gray-300">
                            <input
                                type="radio"
                                value="above"
                                checked={isAbove}
                                onChange={() => setIsAbove(true)}
                                className="form-radio text-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2">Above</span>
                        </label>
                        <label className="inline-flex items-center text-gray-300">
                            <input
                                type="radio"
                                value="below"
                                checked={!isAbove}
                                onChange={() => setIsAbove(false)}
                                className="form-radio text-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2">Below</span>
                        </label>
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Set Trigger
                </button>
            </form>
            {message && <p className="mt-4 text-center font-bold text-green-400">{message}</p>}
        </div>
    );
};

export default TriggerSetup;
