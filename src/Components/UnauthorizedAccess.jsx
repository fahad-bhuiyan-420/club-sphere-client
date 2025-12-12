import React from 'react';

const UnauthorizedAccess = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center">


                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mx-auto mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12 text-red-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75M6.75 10.5h10.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5z"
                        />
                    </svg>
                </div>


                <h1 className="text-3xl font-bold mb-3 text-red-500">Unauthorized</h1>
                <p className="text-base text-gray-600">
                    You do not have permission to view this page.
                </p>


                <button
                    className="btn btn-primary mt-6"
                    onClick={() => (window.location.href = '/')}
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default UnauthorizedAccess;