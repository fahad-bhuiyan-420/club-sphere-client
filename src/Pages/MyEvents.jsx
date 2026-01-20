import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { MdEventAvailable, MdCheckCircle, MdCalendarToday, MdSearch, MdFilterList, MdOutlineArrowForward } from 'react-icons/md';

const MyEvents = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: events = [] } = useQuery({
        queryKey: ['events', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/member-events?userEmail=${user.email}`);
            return res.data;
        }
    });

    // Filter logic for search
    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        event.clubName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header & Stats Section */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 hidden sm:block">
                        <MdEventAvailable className="text-white text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Event Schedule</h1>
                        <p className="text-slate-500 font-medium">You are currently participating in {events.length} events.</p>
                    </div>
                </div>

                {/* Quick Search Bar */}
                <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 flex items-center px-6 gap-3 min-w-[300px]">
                    <MdSearch className="text-slate-400 text-xl" />
                    <input 
                        type="text" 
                        placeholder="Search events or clubs..." 
                        className="bg-transparent border-none outline-none text-slate-600 font-medium w-full placeholder:text-slate-300"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                        <MdFilterList />
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto p-4">
                    <table className="table w-full border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-slate-400 uppercase text-[11px] tracking-widest font-bold border-none">
                                <th className="bg-transparent pl-6">#</th>
                                <th className="bg-transparent">Event Detail</th>
                                <th className="bg-transparent">Club</th>
                                <th className="bg-transparent text-center">Status</th>
                                <th className="bg-transparent text-center">Joined Date</th>
                                <th className="bg-transparent"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map((event, index) => (
                                <tr key={event._id} className="group hover:bg-slate-50 transition-all">
                                    <th className="pl-6 text-slate-400 font-bold border-none">{index + 1}</th>
                                    <td className="border-none py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                                <MdCalendarToday className="text-xl" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 text-base leading-tight">{event.title}</p>
                                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Confirmed Participant</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-none">
                                        <span className="font-bold text-slate-600 text-sm px-3 py-1.5 bg-slate-100 rounded-xl">
                                            {event.clubName}
                                        </span>
                                    </td>
                                    <td className="border-none text-center">
                                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                            <MdCheckCircle className="text-sm" />
                                            {event.registrationStatus || 'Registered'}
                                        </div>
                                    </td>
                                    <td className="border-none text-center">
                                        <div className="text-xs font-bold text-slate-400">
                                            {new Date(event.createdAt).toLocaleDateString("en-GB", {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className="border-none pr-6 text-right">
                                        <button className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            <MdOutlineArrowForward />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredEvents.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-24 border-none">
                                        <div className="flex flex-col items-center justify-center space-y-3 opacity-30">
                                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                                                <MdEventAvailable className="text-4xl text-slate-400" />
                                            </div>
                                            <p className="text-slate-500 font-black uppercase tracking-widest text-sm">No Events Matching Your Search</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyEvents;