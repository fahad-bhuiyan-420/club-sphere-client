import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from './Loading';
import Swal from 'sweetalert2';
import { MdLocationOn, MdPayments, MdStars, MdCheckCircle, MdErrorOutline } from 'react-icons/md';

const Club = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

    const { data: club = {}, isLoading } = useQuery({
        queryKey: ['club', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/clubs/${id}`);
            return res.data;
        }
    });

    const { refetch, data: membership = {} } = useQuery({
        queryKey: ['membership', id, user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/membership?email=${user.email}&clubId=${id}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (user?.email) refetch();
    }, [user, refetch]);

    if (isLoading) return <Loading />;

    const handlePaidJoin = async () => {
        if (!user) return loginAlert();
        const paymentInfo = {
            name: club.clubName,
            amount: club.membershipFee,
            email: user.email,
            type: 'club',
            clubId: club._id,
        };
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    };

    const handleFreeJoin = () => {
        if (!user) return loginAlert();
        const membershipInfo = {
            userEmail: user.email,
            clubId: id,
            status: 'active',
            joinedAt: new Date()
        };
        axiosSecure.post('/membership', membershipInfo).then(() => refetch());
    };

    const loginAlert = () => {
        Swal.fire({
            icon: "error",
            title: "Authentication Required",
            text: "Please log in to join this club!",
            confirmButtonColor: '#4f46e5'
        });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Banner Section */}
            <div className="relative h-64 md:h-96 w-full overflow-hidden">
                <img src={club.bannerImage} className="w-full h-full object-cover blur-sm brightness-50 scale-105" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent"></div>
            </div>

            {/* Main Content Card */}
            <div className="max-w-5xl mx-auto px-4 -mt-32 relative z-10 pb-20">
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-6 md:p-12 border border-slate-100">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Club Image Container */}
                        <div className="w-full lg:w-1/3">
                            <div className="sticky top-10">
                                <img
                                    src={club.bannerImage}
                                    className="w-full aspect-square object-cover rounded-[2rem] shadow-xl ring-8 ring-slate-50"
                                    alt={club.clubName}
                                />
                                <div className="mt-6 flex flex-col gap-3">
                                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                                        <MdLocationOn className="text-indigo-600 text-2xl" />
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                                            <p className="text-slate-700 font-semibold">{club.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl">
                                        <MdPayments className="text-indigo-600 text-2xl" />
                                        <div>
                                            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Membership Fee</p>
                                            <p className="text-indigo-700 font-black text-xl">${club.membershipFee}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text & Actions Content */}
                        <div className="w-full lg:w-2/3 flex flex-col justify-between">
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-black uppercase">
                                        {club.category || 'Community'}
                                    </span>
                                    {club.status === 'approved' && (
                                        <span className="flex items-center gap-1 text-teal-600 text-xs font-bold">
                                            <MdStars /> Verified Club
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
                                    {club.clubName}
                                </h1>
                                <div className="prose prose-slate max-w-none">
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">About our club</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        {club.description}
                                    </p>
                                </div>
                            </div>

                            {/* Dynamic Action Area */}
                            <div className="mt-12 pt-8 border-t border-slate-100">
                                {membership.status === 'expired' ? (
                                    <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-2xl w-fit font-bold">
                                        <MdErrorOutline className="text-2xl" /> Membership Expired
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap items-center gap-4">
                                        {club.status === "approved" && membership.clubId !== id && (
                                            <button 
                                                onClick={club.membershipFee == 0 ? handleFreeJoin : handlePaidJoin}
                                                className="btn btn-lg bg-indigo-600 hover:bg-indigo-700 border-none text-white rounded-2xl px-10 shadow-lg shadow-indigo-200 transition-all hover:scale-105"
                                            >
                                                {club.membershipFee == 0 ? 'Join Club for Free' : `Unlock Membership for $${club.membershipFee}`}
                                            </button>
                                        )}

                                        {membership.clubId === id && (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-6 py-3 rounded-2xl font-black text-lg">
                                                    <MdCheckCircle className="text-2xl" /> You are a Member
                                                </div>
                                                {club.membershipFee !== 0 && (
                                                    <p className="text-xs text-slate-400 font-bold ml-1 uppercase tracking-tighter">Payment Verified by Stripe</p>
                                                )}
                                            </div>
                                        )}

                                        {club.status !== 'approved' && (
                                            <div className="badge badge-lg badge-warning p-4 font-bold uppercase tracking-widest">
                                                Status: {club.status}
                                            </div>
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

export default Club;