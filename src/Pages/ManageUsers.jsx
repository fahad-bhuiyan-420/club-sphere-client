import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { MdManageAccounts, MdOutlineAdminPanelSettings, MdOutlineBadge, MdOutlineMailOutline, MdCalendarMonth } from 'react-icons/md';
import { IoMdArrowDropdown } from "react-icons/io";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { user: currentUser } = useAuth();
    const userEmail = currentUser.email

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    const handleRole = (id, role) => {
        axiosSecure.patch(`/users/${id}`, { role: role })
            .then(res => {
                refetch();
                Swal.fire({
                    title: "Role Updated!",
                    text: `User is now assigned as ${role.replace('_', ' ')}`,
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
            {/* Page Header */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
                <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
                    <MdManageAccounts className="text-white text-3xl" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">User Directory</h1>
                    <p className="text-slate-500 font-medium">Control platform access and modify administrative privileges.</p>
                </div>
            </div>

            {/* Users Table Container */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto p-4">
                    <table className="table w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-slate-400 uppercase text-[11px] tracking-widest font-bold border-none">
                                <th className="bg-transparent pl-8">#</th>
                                <th className="bg-transparent">Identity</th>
                                <th className="bg-transparent">Email Contact</th>
                                <th className="bg-transparent">Active Role</th>
                                <th className="bg-transparent">Registration</th>
                                <th className="bg-transparent text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                const isSelf = userEmail === user.email;
                                return (
                                    <tr key={user._id} className={`group transition-all ${isSelf ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}>
                                        <th className="pl-8 text-slate-300 font-bold border-none">{index + 1}</th>
                                        
                                        <td className="border-none py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shadow-sm ${isSelf ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-slate-800 tracking-tight">
                                                        {user.name} {isSelf && <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full ml-1">YOU</span>}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="border-none">
                                            <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                                <MdOutlineMailOutline className="text-indigo-400" />
                                                {user.email}
                                            </div>
                                        </td>

                                        <td className="border-none">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit ${
                                                user.role === 'admin' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                                user.role === 'club_manager' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                'bg-slate-50 text-slate-500 border border-slate-100'
                                            }`}>
                                                <MdOutlineBadge className="text-sm" />
                                                {user?.role?.replace('_', ' ') || 'member'}
                                            </span>
                                        </td>

                                        <td className="border-none">
                                            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                                                <MdCalendarMonth />
                                                {new Date(user.createdAt).toLocaleDateString("en-GB")}
                                            </div>
                                        </td>

                                        <td className="border-none text-right pr-8">
                                            <div className="dropdown dropdown-left lg:dropdown-bottom dropdown-end">
                                                <div 
                                                    tabIndex={0} 
                                                    role="button" 
                                                    className="btn btn-sm border-none bg-white shadow-sm hover:bg-indigo-600 hover:text-white text-slate-600 font-black rounded-xl transition-all normal-case gap-2"
                                                >
                                                    Modify <IoMdArrowDropdown />
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content menu p-3 shadow-2xl bg-white rounded-2xl border border-slate-50 z-50 w-52 mt-2 gap-2">
                                                    <p className="text-[10px] font-black text-slate-400 px-2 pb-1 uppercase tracking-widest border-b border-slate-50 mb-1">Set Permission</p>
                                                    <li>
                                                        <button onClick={() => handleRole(user._id, 'admin')} className="flex items-center gap-2 p-2 hover:bg-purple-50 text-purple-600 font-bold rounded-xl transition-all">
                                                            <MdOutlineAdminPanelSettings className="text-lg" /> Administrator
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => handleRole(user._id, 'club_manager')} className="flex items-center gap-2 p-2 hover:bg-amber-50 text-amber-600 font-bold rounded-xl transition-all">
                                                            <MdManageAccounts className="text-lg" /> Club Manager
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => handleRole(user._id, 'member')} className="flex items-center gap-2 p-2 hover:bg-slate-50 text-slate-500 font-bold rounded-xl transition-all">
                                                            <MdOutlineBadge className="text-lg" /> Regular Member
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;