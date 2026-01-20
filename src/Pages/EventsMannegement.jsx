import React from 'react';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from '../Components/Loading';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { FaPlus, FaRegEdit, FaRegTrashAlt, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

const EventsMannegement = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: events = [], isLoading, refetch } = useQuery({
        queryKey: ['events', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/total-events?email=${user.email}`)
            return res.data
        }
    })

    if (isLoading) return <Loading />;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This event will be permanently removed from your schedule!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5", // Indigo-600
            cancelButtonColor: "#ef4444",  // Red-500
            confirmButtonText: "Yes, delete it!",
            background: "#ffffff",
            customClass: {
                popup: 'rounded-[2rem]',
                title: 'text-slate-800 font-black'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`events/${id}`).then(res => {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "The event has been successfully removed.",
                        icon: "success",
                        confirmButtonColor: "#4f46e5",
                    });
                })
            }
        });
    }

    return (
        <div className="space-y-8">
            {/* Action Header Card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Event Management</h1>
                    <p className="text-slate-500 font-medium">Create, update, and manage your organized events.</p>
                </div>
                <Link to='/dashboard/create-event' className="w-full md:w-auto">
                    <button className="flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black transition-all shadow-lg shadow-indigo-100 hover:scale-[1.02] active:scale-95 w-full">
                        <FaPlus className="text-sm" /> Create New Event
                    </button>
                </Link>
            </div>

            {/* Data Table Container */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto p-4">
                    <table className="table w-full border-separate border-spacing-y-3">
                        {/* head */}
                        <thead>
                            <tr className="text-slate-400 uppercase text-[11px] tracking-widest font-bold border-none">
                                <th className="bg-transparent pl-8">#</th>
                                <th className="bg-transparent">Event Detail</th>
                                <th className="bg-transparent">Schedule</th>
                                <th className="bg-transparent">Entry Fee</th>
                                <th className="bg-transparent text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <tr key={event._id} className="group hover:bg-slate-50 transition-all duration-300">
                                    <th className="pl-8 text-slate-300 font-bold border-none">{index + 1}</th>
                                    
                                    <td className="border-none py-4">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
                                                {event.title}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                                                <FaMapMarkerAlt className="text-indigo-400" /> {event.location}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="border-none">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl w-fit">
                                            <FaCalendarAlt className="text-slate-400 text-xs" />
                                            <span className="text-sm font-black text-slate-600">
                                                {event.eventDate}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="border-none">
                                        <div className="flex items-center font-black text-slate-800">
                                            <FaDollarSign className="text-indigo-500 text-xs" />
                                            <span>{event.eventFee > 0 ? event.eventFee : "Free"}</span>
                                        </div>
                                    </td>

                                    <td className="border-none text-right pr-8">
                                        <div className="flex justify-end gap-3">
                                            <Link to={`/dashboard/update-event/${event._id}`}>
                                                <button className="p-3 bg-white border border-slate-100 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm tooltip" data-tip="Edit Event">
                                                    <FaRegEdit />
                                                </button>
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(event._id)} 
                                                className="p-3 bg-white border border-slate-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm tooltip" 
                                                data-tip="Delete Event"
                                            >
                                                <FaRegTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {events.length === 0 && (
                        <div className="text-center py-24 flex flex-col items-center gap-4 opacity-20">
                            <FaCalendarAlt className="text-7xl text-slate-400" />
                            <p className="text-slate-900 font-black uppercase tracking-widest text-sm italic">
                                No events found in your records
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventsMannegement;