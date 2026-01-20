import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading';
import Swal from 'sweetalert2';
import { IoMdArrowDropdown } from "react-icons/io";
import { MdGroups, MdAlternateEmail, MdCalendarToday, MdBlock, MdCheckCircleOutline } from "react-icons/md";

const ClubMembers = () => {
    const { user } = useAuth();
    const [id, setId] = useState();
    const [selectedClubName, setSelectedClubName] = useState('Select a Club');
    const axiosSecure = useAxiosSecure();

    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ['clubs', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs?email=${user.email}`)
            return res.data
        }
    });

    const { data: members = [], refetch } = useQuery({
        queryKey: ['members', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/membership/${id}`)
            return res.data
        }
    });

    if (isLoading) return <Loading />;

    const handleClub = (club) => {
        setId(club._id);
        setSelectedClubName(club.clubName);
    };

    const handleExpired = (memberId, status) => {
        Swal.fire({
            title: "Revoke Membership?",
            text: "This user's access will be set to expired.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#f43f5e",
            confirmButtonText: "Yes, expire it!",
            background: "#ffffff",
            customClass: {
                popup: 'rounded-[2rem]',
                title: 'font-black text-slate-800'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/membership/${memberId}`, { status: status })
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: "Updated!",
                            text: "Membership status has been changed.",
                            icon: "success",
                            confirmButtonColor: "#4f46e5",
                        });
                    });
            }
        });
    };

    return (
        <div className="space-y-8">
            {/* Header and Filter Card */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 hidden sm:block">
                        <MdGroups className="text-white text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Membership Roster</h1>
                        <p className="text-slate-500 font-medium text-sm">Monitor and manage access for your club members.</p>
                    </div>
                </div>

                {/* Modern Dropdown */}
                <div className="dropdown dropdown-end">
                    <div 
                        tabIndex={0} 
                        role="button" 
                        className="btn border-none bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 font-black px-6 rounded-2xl flex items-center gap-3 transition-all min-w-[220px] justify-between"
                    >
                        <span className="truncate">{selectedClubName}</span>
                        <IoMdArrowDropdown className="text-xl" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-3 shadow-2xl bg-white rounded-2xl border border-slate-50 z-[1] w-64 mt-2 gap-1">
                        {clubs.map(club => (
                            <li key={club._id}>
                                <button 
                                    onClick={() => handleClub(club)}
                                    className="p-3 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl font-bold transition-all text-slate-600"
                                >
                                    {club.clubName}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* List Table Container */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto p-4">
                    <table className="table w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-slate-400 uppercase text-[11px] tracking-widest font-bold border-none">
                                <th className="bg-transparent pl-8">#</th>
                                <th className="bg-transparent">Member Identity</th>
                                <th className="bg-transparent">Joined Date</th>
                                <th className="bg-transparent text-center">Status</th>
                                <th className="bg-transparent text-right pr-8">Management</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((mem, index) => (
                                <tr key={mem._id} className="group hover:bg-slate-50/80 transition-all">
                                    <th className="pl-8 text-slate-300 font-bold border-none">{index + 1}</th>
                                    <td className="border-none py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                                <MdAlternateEmail />
                                            </div>
                                            <span className="font-black text-slate-700">{mem.userEmail}</span>
                                        </div>
                                    </td>
                                    <td className="border-none">
                                        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                            <MdCalendarToday className="text-indigo-400" />
                                            {new Date(mem.joinedAt).toLocaleDateString("en-GB")}
                                        </div>
                                    </td>
                                    <td className="border-none text-center">
                                        <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            mem.status === 'active' 
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                            : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                            {mem.status === 'active' ? <MdCheckCircleOutline /> : <MdBlock />}
                                            {mem.status}
                                        </div>
                                    </td>
                                    <td className="border-none text-right pr-8">
                                        {mem.status === 'active' && (
                                            <button 
                                                onClick={() => handleExpired(mem._id, 'expired')} 
                                                className="btn btn-sm border-none bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-400 rounded-lg normal-case font-black transition-all"
                                            >
                                                Revoke Access
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {/* Empty State */}
                            {(!id || members.length === 0) && (
                                <tr>
                                    <td colSpan="5" className="text-center py-24 border-none">
                                        <div className="flex flex-col items-center justify-center opacity-20">
                                            <MdGroups className="text-7xl mb-2" />
                                            <p className="text-slate-900 font-black uppercase tracking-widest text-sm">
                                                {!id ? "Select a club to load roster" : "This club has no members yet"}
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

export default ClubMembers;