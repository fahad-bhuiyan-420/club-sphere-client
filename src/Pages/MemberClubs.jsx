import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import { MdLocationOn, MdVerified, MdErrorOutline, MdAccessTime } from 'react-icons/md';

const MemberClubs = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: clubs = [] } = useQuery({
        queryKey: ['clubs', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/member-clubs?userEmail=${user.email}`)
            return res.data
        }
    })

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return {
                    bg: 'bg-emerald-500/10',
                    text: 'text-emerald-600',
                    icon: <MdVerified />,
                    dot: 'bg-emerald-500'
                };
            case 'expired':
                return {
                    bg: 'bg-rose-500/10',
                    text: 'text-rose-600',
                    icon: <MdErrorOutline />,
                    dot: 'bg-rose-500'
                };
            default:
                return {
                    bg: 'bg-amber-500/10',
                    text: 'text-amber-600',
                    icon: <MdAccessTime />,
                    dot: 'bg-amber-500'
                };
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Joined Clubs</h1>
                <p className="text-slate-500 font-medium">Manage your active memberships and explore club activities.</p>
            </div>

            {/* Clubs Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {clubs.map(club => {
                    const status = getStatusStyles(club.membershipStatus);
                    return (
                        <Link key={club._id} to={`/clubs/${club._id}`} className="group">
                            <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-indigo-100 group-hover:-translate-y-1 h-full flex flex-col">
                                
                                {/* Image Container */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={club.bannerImage}
                                        alt={club.clubName}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Status Overlay Badge */}
                                    <div className={`absolute top-4 right-4 backdrop-blur-md ${status.bg} ${status.text} px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-white/20 shadow-sm`}>
                                        {status.icon}
                                        {club.membershipStatus}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col grow">
                                    <div className="mb-4">
                                        <h2 className="text-xl font-black text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                            {club.clubName}
                                        </h2>
                                        <div className="flex items-center gap-1 text-slate-400 mt-1">
                                            <MdLocationOn className="text-indigo-400" />
                                            <span className="text-xs font-bold uppercase tracking-tighter italic">
                                                {club.location}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Info */}
                                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full animate-pulse ${status.dot}`}></div>
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                                Member Portal
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}

                {clubs.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-slate-100/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-black uppercase tracking-widest">No clubs joined yet</p>
                        <Link to="/all-clubs" className="text-indigo-600 font-bold hover:underline mt-2 inline-block">Explore Clubs</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemberClubs;