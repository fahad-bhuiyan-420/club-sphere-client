import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-2xl mt-4">Oops! Page Not Found</p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;