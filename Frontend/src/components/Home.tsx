const Home = () => {
    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-2xl mx-auto mt-10">
            <h1 className="text-4xl font-bold text-blue-400 mb-6">Welcome to WeatherApp</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
                Explore real-time weather data and insightful charts for various cities across India. Use the navigation menu to switch between the home page, current weather, charts, and trigger setup.
            </p>
            <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-100">Features:</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>View current weather conditions</li>
                    <li>Analyze historical weather data through interactive charts</li>
                    <li>Set up custom weather triggers and notifications</li>
                    <li>Compare weather across multiple cities</li>
                </ul>
            </div>
        </div>
    )
}

export default Home
