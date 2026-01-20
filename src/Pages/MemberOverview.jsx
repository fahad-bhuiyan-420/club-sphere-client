import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { MdOutlineGroups, MdEventAvailable, MdLocationOn, MdAttachMoney, MdCalendarToday } from 'react-icons/md';

const MemberOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: members = [] } = useQuery({
        queryKey: ['members', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/members?userEmail=${user.email}`);
            return res.data;
        }
    });

    const { data: registrations = [] } = useQuery({
        queryKey: ['registrations', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allEventRegistrations?userEmail=${user.email}`);
            return res.data;
        }
    });

    const { data: events = [] } = useQuery({
        queryKey: ['events', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/upcoming-events?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back!</h1>
                <p className="text-slate-500 font-medium">Here’s what’s happening with your clubs and events.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Clubs Card */}
                <div className="relative overflow-hidden bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 transition-all hover:shadow-md">
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                        <MdOutlineGroups className="text-3xl" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Clubs Joined</p>
                        <p className="text-3xl font-black text-slate-800">{members.length}</p>
                    </div>
                    <div className="absolute -right-4 -bottom-4 opacity-5 text-slate-900">
                        <MdOutlineGroups className="text-8xl" />
                    </div>
                </div>

                {/* Total Events Card */}
                <div className="relative overflow-hidden bg-indigo-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-100 flex items-center gap-5 transition-all hover:scale-[1.02]">
                    <div className="p-4 bg-white/20 text-white rounded-2xl backdrop-blur-md">
                        <MdEventAvailable className="text-3xl" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-indigo-100 uppercase tracking-widest">Events Joined</p>
                        <p className="text-3xl font-black text-white">{registrations.length}</p>
                    </div>
                    <div className="absolute -right-4 -bottom-4 opacity-20 text-white">
                        <MdEventAvailable className="text-8xl" />
                    </div>
                </div>
            </div>

            {/* Upcoming Events Table Section */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <MdCalendarToday className="text-indigo-600" /> Upcoming Events
                    </h2>
                    <span className="px-4 py-1 bg-indigo-100 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-tighter">
                        Next 30 Days
                    </span>
                </div>

                <div className="overflow-x-auto p-4">
                    <table className="table w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-slate-400 border-none uppercase text-[11px] tracking-widest font-bold">
                                <th className="bg-transparent">#</th>
                                <th className="bg-transparent">Event Info</th>
                                <th className="bg-transparent">Venue</th>
                                <th className="bg-transparent text-center">Fee</th>
                                <th className="bg-transparent text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <tr key={event._id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="font-bold text-slate-400 pl-6">{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                {event.title.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-800">{event.title}</div>
                                                <div className="text-xs text-slate-400 font-medium">Max: {event.maxAttendees} people</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1 text-slate-600 font-medium text-sm">
                                            <MdLocationOn className="text-indigo-500" />
                                            {event.location}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-black ${event.eventFee > 0 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                            {event.eventFee > 0 ? `$${event.eventFee}` : 'FREE'}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="text-sm font-bold text-slate-700 bg-slate-100 py-1 px-3 rounded-lg inline-block">
                                            {new Date(event.createdAt).toLocaleDateString("en-GB")}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {events.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-slate-400 font-medium italic">
                                        No upcoming events found.
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

export default MemberOverview;