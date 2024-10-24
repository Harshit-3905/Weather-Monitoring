import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-300 hover:text-blue-400 hover:border-b-2 hover:border-blue-400";
    };

    return (
        <header className="bg-gray-900 shadow-lg">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-blue-400">WeatherApp</span>
                        </div>
                        <div className="ml-10 flex space-x-8">
                            <Link to="/" className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-300 ${isActive('/')}`}>
                                Home
                            </Link>
                            <Link to="/current" className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-300 ${isActive('/current')}`}>
                                Current Weather
                            </Link>
                            <Link to="/charts" className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-300 ${isActive('/charts')}`}>
                                Charts
                            </Link>
                            <Link to="/triggers" className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-300 ${isActive('/triggers')}`}>
                                Set Triggers
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
