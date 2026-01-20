import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import UseAxiosSecure from '../hooks/useAxiosSecure';
import { MdSearch, MdSort, MdLocationOn, MdAttachMoney } from 'react-icons/md';

const Clubs = () => {
    const axiosSecure = UseAxiosSecure();
    const [searchText, setSearchText] = useState('');
    const [sortKey, setSortKey] = useState('createdAt');
    const [sortValue, setSortValue] = useState(-1); // Changed to -1 for "Newest First" default

    // The queryKey includes dependencies. 
    // When searchText, sortKey, or sortValue changes, refetch happens automatically.
    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ['clubs', searchText, sortKey, sortValue],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs`, {
                params: {
                    search: searchText,
                    sortedKey: sortKey,
                    sortedValue: sortValue,
                    user: 'khalu@khala.com' // Ensure this dynamic user email logic is correct for your app
                }
            });
            return res.data;
        }
    });

    const handleSort = (data) => {
        const [key, value] = data.split(' ');
        setSortKey(key);
        setSortValue(Number(value)); // Ensure value is a number for the backend
        // Note: No need to call refetch() here manually.
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header & Controls Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                        Explore <span className="text-indigo-600">Clubs</span>
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium">Find the community where you belong.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-80 group">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-2xl group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            onChange={(e) => setSearchText(e.target.value)}
                            type="search"
                            placeholder="Search clubs..."
                            className="input w-full pl-12 bg-white border-slate-200 rounded-2xl shadow-sm focus:border-indigo-500 transition-all outline-none"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="dropdown dropdown-end w-full sm:w-auto">
                        <div tabIndex={0} role="button" className="btn bg-white border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl w-full flex items-center gap-2">
                            <MdSort className="text-xl" />
                            Sort By
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow-2xl bg-white border border-slate-100 rounded-2xl w-52 mt-2">
                            <li onClick={() => handleSort('createdAt -1')}><a>Newest First</a></li>
                            <li onClick={() => handleSort('createdAt 1')}><a>Oldest First</a></li>
                            <li onClick={() => handleSort('membershipFee -1')}><a>Highest Fee</a></li>
                            <li onClick={() => handleSort('membershipFee 1')}><a>Lowest Fee</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg text-indigo-600"></span>
                </div>
            ) : (
                <>
                    {/* Clubs Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {clubs.map(club => (
                            <Link 
                                to={`/clubs/${club._id}`} 
                                key={club._id} // Fixed: Key moved to the Link component
                                className="group"
                            >
                                <div className="card bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] overflow-hidden h-full">
                                    <figure className="relative h-52 overflow-hidden">
                                        <img
                                            src={club.bannerImage}
                                            alt={club.clubName}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm capitalize">
                                                {club.category || 'General'}
                                            </span>
                                        </div>
                                    </figure>
                                    
                                    <div className="card-body p-6">
                                        <h2 className="card-title text-slate-800 font-extrabold group-hover:text-indigo-600 transition-colors">
                                            {club.clubName}
                                        </h2>
                                        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                                            {club.description}
                                        </p>
                                        
                                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                                                <MdLocationOn className="text-indigo-400" />
                                                {club.location || "On Campus"}
                                            </div>
                                            <div className="flex items-center gap-1 text-indigo-600 font-black text-sm">
                                                <MdAttachMoney className="text-lg" />
                                                {club.membershipFee === 0 ? 'Free' : `${club.membershipFee}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {clubs.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                            <div className="text-slate-300 text-6xl mb-4 flex justify-center">
                                <MdSearch />
                            </div>
                            <h3 className="text-xl font-bold text-slate-400">No clubs found</h3>
                            <p className="text-slate-400">Try adjusting your search or sort criteria.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Clubs;