import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import UseAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { MdLocationOn, MdCalendarMonth, MdPeople, MdPayments, MdCheckCircle, MdInfo } from 'react-icons/md';

const EventDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = UseAxiosSecure();

    const { data: event = {} } = useQuery({
        queryKey: ['event'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/events/${id}`);
            return res.data;
        }
    });

    const { refetch, data: eventRegistration = {} } = useQuery({
        queryKey: ['eventRegistration'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/eventRegistrations?eventId=${id}&email=${user.email}`);
            return res.data;
        }
    });

    const handlePayment = async () => {
        if (!user) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User not yet logged in!",
            });
        }
        const paymentInfo = {
            name: event.title,
            amount: event.eventFee,
            email: user.email,
            type: 'event',
            clubId: event.clubId,
            eventId: event._id,
        };
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    };

    const handleFreeJoin = () => {
        if (!user) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User not yet logged in!",
            });
        }
        const eventRegistrationInfo = {
            userEmail: user.email,
            clubId: event.clubId,
            eventId: id,
            status: 'registered',
            registeredAt: new Date()
        };
        axiosSecure.post('/eventRegistrations', eventRegistrationInfo)
            .then(res => {
                refetch();
            });
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Banner */}
            <div className="relative h-64 md:h-80 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                    <div className="z-10">
                        <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                            Event Details
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white">{event.title}</h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left: Information */}
                    <div className="lg:w-2/3 space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                <MdInfo className="text-indigo-600" /> Description
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-indigo-100 pl-6">
                                {event.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl">
                                    <MdCalendarMonth className="text-3xl text-indigo-600" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date</p>
                                        <p className="text-slate-700 font-bold">{event.eventDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl">
                                    <MdLocationOn className="text-3xl text-indigo-600" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                                        <p className="text-slate-700 font-bold">{event.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Registration Card */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-indigo-50 sticky top-10">
                            <div className="mb-8">
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Registration Fee</p>
                                <h3 className="text-4xl font-black text-slate-900">
                                    {event.isPaid ? `${event.eventFee}৳` : "Free Admission"}
                                </h3>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 flex items-center gap-2"><MdPeople /> Capacity</span>
                                    <span className="font-bold text-slate-700">{event.maxAttendees || "Unlimited"} Spots</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 flex items-center gap-2"><MdPayments /> Access</span>
                                    <span className={`font-bold ${event.isPaid ? 'text-indigo-600' : 'text-emerald-600'}`}>
                                        {event.isPaid ? 'Paid Ticket' : 'Open Entry'}
                                    </span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="space-y-4">
                                {event.isPaid && eventRegistration.eventId !== id && (
                                    <button
                                        onClick={handlePayment}
                                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]"
                                    >
                                        Pay & Register
                                    </button>
                                )}

                                {event.isPaid === false && eventRegistration.eventId !== id && (
                                    <button 
                                        onClick={handleFreeJoin} 
                                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]"
                                    >
                                        Join for Free
                                    </button>
                                )}

                                {eventRegistration.eventId === id && (
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-center gap-2 py-4 bg-emerald-50 text-emerald-700 rounded-2xl font-black text-lg border border-emerald-100">
                                            <MdCheckCircle className="text-2xl" /> Already Joined
                                        </div>
                                        {event.isPaid && (
                                            <p className="text-center text-xs font-bold text-indigo-500 uppercase">Payment Complete ✅</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventDetails;