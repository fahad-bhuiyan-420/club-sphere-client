import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { ImCross } from "react-icons/im";
import Swal from 'sweetalert2';
import { SiTicktick } from 'react-icons/si';
import { MdOutlineSecurity, MdOutlineMail, MdOutlinePayments, MdGroups } from 'react-icons/md';

const ManageClubs = () => {
    const axiosSecure = useAxiosSecure();
    
    const { data: clubs = [], refetch } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/clubs');
            return res.data
        }
    })

    const { data: clubMembers = [] } = useQuery({
        queryKey: ['clubMembers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/club-members');
            return res.data
        }
    })

    const handleStatus = (id, status) => {
        const data = { status: status }
        axiosSecure.patch(`/clubs/${id}`, data)
            .then(res => {
                refetch();
                Swal.fire({
                    title: status === 'approved' ? 'Club Approved' : 'Club Rejected',
                    text: `The club status has been successfully set to ${status}.`,
                    icon: "success",
                    confirmButtonColor: "#4f46e5",
                    customClass: {
                        popup: 'rounded-[2rem]',
                    }
                });
            })
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
                        <MdOutlineSecurity className="text-white text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Club Governance</h1>
                        <p className="text-slate-500 font-medium">Review and moderate club applications and membership tiers.</p>
                    </div>
                </div>
                <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest block">Active Requests</span>
                    <span className="text-2xl font-black text-indigo-600">{clubs.filter(c => c.status === 'pending').length}</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto p-4">
                    <table className="table w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-slate-400 uppercase text-[11px] tracking-widest font-bold border-none">
                                <th className="bg-transparent pl-8">#</th>
                                <th className="bg-transparent">Club Identity</th>
                                <th className="bg-transparent">Management</th>
                                <th className="bg-transparent">Status</th>
                                <th className="bg-transparent">Financials</th>
                                <th className="bg-transparent text-center">Roster</th>
                                <th className="bg-transparent text-right pr-8">Decision</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clubs.map((club, index) => {
                                const members = clubMembers.find(cm => cm.name === club.clubName);
                                const isApproved = club.status === 'approved';
                                const isRejected = club.status === 'rejected';

                                return (
                                    <tr key={club._id} className="group hover:bg-slate-50 transition-all duration-300">
                                        <th className="pl-8 text-slate-300 font-bold border-none">{index + 1}</th>
                                        
                                        <td className="border-none py-4">
                                            <span className="font-black text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
                                                {club.clubName}
                                            </span>
                                        </td>

                                        <td className="border-none">
                                            <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                                                <MdOutlineMail className="text-indigo-400 text-sm" />
                                                {club.managerEmail}
                                            </div>
                                        </td>

                                        <td className="border-none">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                isApproved ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                isRejected ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                                {club.status}
                                            </span>
                                        </td>

                                        <td className="border-none font-black text-slate-700">
                                            <div className="flex items-center gap-1">
                                                <MdOutlinePayments className="text-slate-400" />
                                                ${club.membershipFee}
                                            </div>
                                        </td>

                                        <td className="border-none text-center">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-600">
                                                <MdGroups />
                                                {members?.membership || 0}
                                            </div>
                                        </td>

                                        <td className="border-none text-right pr-8">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    disabled={isApproved}
                                                    onClick={() => handleStatus(club._id, 'approved')} 
                                                    className={`p-3 rounded-xl transition-all shadow-sm ${
                                                        isApproved 
                                                        ? 'bg-emerald-100 text-emerald-600 cursor-not-allowed' 
                                                        : 'bg-white border border-slate-100 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                                                    }`}
                                                >
                                                    <SiTicktick />
                                                </button>
                                                <button 
                                                    disabled={isRejected}
                                                    onClick={() => handleStatus(club._id, 'rejected')} 
                                                    className={`p-3 rounded-xl transition-all shadow-sm ${
                                                        isRejected 
                                                        ? 'bg-rose-100 text-rose-600 cursor-not-allowed' 
                                                        : 'bg-white border border-slate-100 text-rose-500 hover:bg-rose-500 hover:text-white'
                                                    }`}
                                                >
                                                    <ImCross className="text-xs" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageClubs;