import React from 'react';
import Banner from './Banner';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { Link, useNavigate } from 'react-router';
import { MdArrowDropDownCircle, MdOutlineExplore, MdGroups, MdEventAvailable, MdAutoGraph } from 'react-icons/md';

const Home = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const { data: clubs = [] } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosInstance.get('/clubs?sortedKey=createdAt&sortedValue=1');
            return res.data;
        }
    });

    const handleClub = (id) => {
        navigate(`/clubs/${id}`);
    };

    return (
        <div className='min-h-screen bg-slate-50'>
            {/* Banner Section */}
            <Banner />

            {/* Clubs Grid Section */}
            <div className='max-w-7xl mx-auto px-4 py-16'>
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Featured Clubs</h2>
                    <div className="h-1.5 w-20 bg-indigo-600 rounded-full"></div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {clubs.slice(0, 6).map(club => (
                        <div 
                            onClick={() => handleClub(club._id)} 
                            key={club._id} 
                            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:-translate-y-2"
                        >
                            <div className="relative overflow-hidden h-[220px]">
                                <img
                                    src={club.bannerImage}
                                    alt={club.clubName}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white font-medium">View Details →</span>
                                </div>
                            </div>
                            
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                                    {club.clubName}
                                </h2>
                                <p className="text-slate-600 line-clamp-2 leading-relaxed">
                                    {club.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link to='/clubs'>
                        <button className='group flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg shadow-indigo-200 transition-all w-full md:w-auto mx-auto'>
                            Explore All Clubs 
                            <MdArrowDropDownCircle className="group-hover:rotate-180 transition-transform duration-300" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* How ClubSphere Works - Steps Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-16">
                        How <span className="text-indigo-600">ClubSphere</span> Works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {[
                            { icon: <MdOutlineExplore />, title: "Explore", desc: "Browse clubs by category or location.", color: "bg-blue-50 text-blue-600" },
                            { icon: <MdGroups />, title: "Join", desc: "Connect with like-minded people.", color: "bg-purple-50 text-purple-600" },
                            { icon: <MdEventAvailable />, title: "Attend", desc: "Participate in workshops & events.", color: "bg-indigo-50 text-indigo-600" },
                            { icon: <MdAutoGraph />, title: "Grow", desc: "Build leadership & skills.", color: "bg-teal-50 text-teal-600" },
                        ].map((step, idx) => (
                            <div key={idx} className="relative flex flex-col items-center">
                                <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                                <p className="text-slate-500 text-center">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Join a Club - Benefits Section */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-extrabold text-center mb-16">Why Join a Club?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-indigo-500 transition-colors">
                            <div className="text-indigo-400 text-4xl mb-6">🌱</div>
                            <h3 className="text-2xl font-bold mb-4">Personal Growth</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Develop leadership, communication, and teamwork skills that your future career demands.
                            </p>
                        </div>

                        <div className="p-10 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-900/20 transform md:-translate-y-4">
                            <div className="text-white text-4xl mb-6">🌍</div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Vibrant Community</h3>
                            <p className="text-indigo-100 leading-relaxed">
                                Escape the bubble. Meet people who share your passions and build connections that last a lifetime.
                            </p>
                        </div>

                        <div className="p-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-indigo-500 transition-colors">
                            <div className="text-indigo-400 text-4xl mb-6">🎯</div>
                            <h3 className="text-2xl font-bold mb-4">Exclusive Access</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Gain priority access to specialized workshops, industry meetups, and unique career opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;