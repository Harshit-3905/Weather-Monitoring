import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 shadow-lg mt-12">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} WeatherApp. All rights reserved.
                </p>
                <div className="mt-4 flex justify-center space-x-6">
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                        Privacy Policy
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                        Terms of Service
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                        Contact Us
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
