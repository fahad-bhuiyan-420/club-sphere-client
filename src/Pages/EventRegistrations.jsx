import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading';
import { IoMdArrowDropdown } from "react-icons/io";
import { MdPeopleOutline, MdAlternateEmail, MdCalendarMonth, MdVerifiedUser } from "react-icons/md";

const EventRegistrations = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [id, setId] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('Choose an Event');

    const { data: events = [], isLoading } = useQuery({
        queryKey: ['events', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/total-events?email=${user.email}`);
            return res.data;
        }
    });

    const { data: registrations = [], refetch } = useQuery({
        queryKey: ['registrations', id],
        enabled: !!id, // Only run query if an ID is selected
        queryFn: async () => {
            const res = await axiosSecure.get(`/event-registrations?eventId=${id}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const handleEvent = (event) => {
        setId(event._id);
        setSelectedTitle(event.title);
    };

    return (
        <div className="space-y-8">
            {/* Header and Filter Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Attendee Manager</h1>
                    <p className="text-slate-500 font-medium">Select an event to view and manage registered participants.</p>
                </div>

                {/* Styled Dropdown */}
                <div className="dropdown dropdown-end">
                    <div 
                        tabIndex={0} 
                        role="button" 
                        className="btn border-none bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black px-6 rounded-2xl flex items-center gap-3 transition-all min-w-[240px] justify-between"
                    >
                        <span className="truncate max-w-[180px]">{selectedTitle}</span>
                        <IoMdArrowDropdown className="text-xl" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-3 shadow-2xl bg-white rounded-2xl border border-slate-100 z-[1] w-72 mt-2 gap-1">
                        {events.map(event => (
                            <li key={event._id}>
                                <button 
                                    onClick={() => handleEvent(event)}
                                    className="p-3 hover:bg-indigo-600 hover:text-white rounded-xl font-bold transition-colors flex justify-between"
                                >
                                    {event.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Registration Summary Card */}
            {id && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-indigo-600 p-6 rounded-[2rem] shadow-lg shadow-indigo-100 flex items-center gap-5">
                        <div className="p-4 bg-white/20 rounded-2xl text-white">
                            <MdPeopleOutline className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest">Total Attendees</p>
                            <p className="text-2xl font-black text-white">{registrations.length}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Table Area */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto p-4">
                    <table className="table w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-slate-400 uppercase text-[11px] tracking-widest font-bold border-none">
                                <th className="bg-transparent pl-6">#</th>
                                <th className="bg-transparent">Participant Email</th>
                                <th className="bg-transparent">Registration Date</th>
                                <th className="bg-transparent text-center">Current Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((reg, index) => (
                                <tr key={reg._id} className="group hover:bg-slate-50 transition-all">
                                    <th className="pl-6 text-slate-300 font-bold border-none">{index + 1}</th>
                                    <td className="border-none py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                <MdAlternateEmail />
                                            </div>
                                            <span className="font-black text-slate-700 tracking-tight">{reg.userEmail}</span>
                                        </div>
                                    </td>
                                    <td className="border-none">
                                        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                            <MdCalendarMonth className="text-indigo-400" />
                                            {new Date(reg.registeredAt).toLocaleDateString("en-GB", {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className="border-none text-center">
                                        <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            reg.status === 'registered' 
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                            : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                            <MdVerifiedUser className="text-xs" />
                                            {reg.status}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {/* Empty State */}
                            {(!id || registrations.length === 0) && (
                                <tr>
                                    <td colSpan="4" className="text-center py-24 border-none">
                                        <div className="flex flex-col items-center justify-center opacity-20">
                                            <MdPeopleOutline className="text-7xl mb-2" />
                                            <p className="text-slate-900 font-black uppercase tracking-widest text-sm">
                                                {!id ? "Select an event to load data" : "No registrations found for this event"}
                                            </p>
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

export default EventRegistrations;