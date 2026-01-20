import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaPlus, FaEdit, FaTrashAlt, FaMapMarkerAlt, FaTag, FaCcDinersClub } from 'react-icons/fa';

const MyClubs = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: clubs = [], refetch } = useQuery({
        queryKey: ['clubs', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs?email=${user.email}`);
            return res.data;
        }
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This club and its data will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5", // Indigo-600
            cancelButtonColor: "#ef4444",  // Red-500
            confirmButtonText: "Yes, delete it!",
            background: "#ffffff",
            customClass: {
                title: 'text-slate-800 font-bold',
                popup: 'rounded-[2rem]'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/clubs/${id}`)
                    .then(res => {
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "The club has been removed.",
                            icon: "success",
                            confirmButtonColor: "#4f46e5",
                        });
                    })
            }
        });
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Clubs</h1>
                    <p className="text-slate-500 font-medium">Manage and monitor the clubs you've created.</p>
                </div>
                <Link to='/dashboard/create-club'>
                    <button className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black transition-all shadow-lg shadow-indigo-100 hover:scale-[1.02] active:scale-95 w-full md:w-auto">
                        <FaPlus /> Create New Club
                    </button>
                </Link>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-0">
                        {/* head */}
                        <thead className="bg-slate-50/50">
                            <tr className="text-slate-400 uppercase text-[11px] tracking-widest font-bold border-none">
                                <th className="py-5 pl-8">#</th>
                                <th>Club Identity</th>
                                <th>Location</th>
                                <th className="text-center">Entry Fee</th>
                                <th className="text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {clubs.map((club, i) => (
                                <tr key={club._id} className="hover:bg-slate-50/50 transition-colors">
                                    <th className="pl-8 text-slate-400 font-bold">{i + 1}</th>
                                    <td className="py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg">
                                                {club.clubName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-800 text-base">{club.clubName}</div>
                                                <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-500 uppercase tracking-tighter">
                                                    <FaTag className="text-[10px]" /> {club.category}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1 text-slate-600 font-medium italic">
                                            <FaMapMarkerAlt className="text-slate-400" /> {club.location}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-full font-black text-xs">
                                            {club.membershipFee > 0 ? `${club.membershipFee}৳` : 'Free Join'}
                                        </span>
                                    </td>
                                    <td className="text-right pr-8">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/dashboard/update-club/${club._id}`}>
                                                <button className="p-3 bg-white border border-slate-200 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm tooltip" data-tip="Edit Club">
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(club._id)} 
                                                className="p-3 bg-white border border-slate-200 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm tooltip" 
                                                data-tip="Delete Club"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {clubs.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-slate-300 text-6xl flex justify-center mb-4 opacity-20"><FaCcDinersClub /></div>
                            <p className="text-slate-400 font-medium italic">You haven't created any clubs yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyClubs;