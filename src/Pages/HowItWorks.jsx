import React from 'react';
import { MdSearch, MdGroupAdd, MdEvent, MdRocketLaunch } from 'react-icons/md';
import { useNavigate } from 'react-router';

const HowItWorks = () => {
    const navigate = useNavigate();

    const steps = [
        {
            icon: <MdSearch />,
            title: "Find Your Interest",
            desc: "Browse through hundreds of clubs spanning technology, arts, sports, and more.",
            color: "text-blue-500",
            path: "/clubs" // Redirects to Clubs
        },
        {
            icon: <MdGroupAdd />,
            title: "Join the Community",
            desc: "Request to join and get instant access to club discussions and member lists.",
            color: "text-purple-500",
            path: "/register" // Redirects to Register
        },
        {
            icon: <MdEvent />,
            title: "Attend Exclusive Events",
            desc: "Register for workshops, competitions, and meetups organized by your clubs.",
            color: "text-indigo-500",
            path: "/events" // Suggested path
        },
        {
            icon: <MdRocketLaunch />,
            title: "Grow and Lead",
            desc: "Take on leadership roles, build your portfolio, and grow your network.",
            color: "text-teal-500",
            path: "/dashboard" // Suggested path
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h1 className="text-5xl font-black text-slate-900 mb-6">
                        Experience <span className="text-indigo-600">ClubSphere</span>
                    </h1>
                    <p className="text-slate-600 text-xl max-w-2xl mx-auto">
                        Everything you need to know about navigating your campus life and community activities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {steps.map((step, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => navigate(step.path)}
                            className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex gap-6 hover:shadow-xl transition-all cursor-pointer group"
                        >
                            <div className={`text-5xl ${step.color} bg-slate-50 p-4 rounded-2xl h-fit group-hover:scale-110 transition-transform`}>
                                {step.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-indigo-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                    <p className="mb-8 text-indigo-100">Join thousands of students already making the most of their campus life.</p>
                    <div className="flex justify-center gap-4">
                        <button 
                            onClick={() => navigate('/register')}
                            className="btn bg-white text-indigo-600 hover:bg-slate-100 border-none px-10 font-bold"
                        >
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;