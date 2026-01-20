import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { MdOutlineReceiptLong, MdAttachMoney, MdOutlineEmail, MdCalendarMonth, MdLabelOutline } from 'react-icons/md';

const ViewPayments = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    // Calculate total revenue for the summary card
    const totalRevenue = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

    return (
        <div className="space-y-8">
            {/* Header and Summary Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
                        <MdOutlineReceiptLong className="text-white text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Transaction History</h1>
                        <p className="text-slate-500 font-medium">A complete record of all platform financial activities.</p>
                    </div>
                </div>

                <div className="bg-slate-900 px-8 py-4 rounded-3xl text-white shadow-xl shadow-slate-200">
                    <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Volume</p>
                    <div className="flex items-center gap-1">
                        <span className="text-2xl font-black text-white">${totalRevenue.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto p-4">
                    <table className="table w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-slate-400 uppercase text-[11px] tracking-widest font-bold border-none">
                                <th className="bg-transparent pl-8">#</th>
                                <th className="bg-transparent">Payer Details</th>
                                <th className="bg-transparent">Contact</th>
                                <th className="bg-transparent text-center">Amount</th>
                                <th className="bg-transparent text-center">Payment Type</th>
                                <th className="bg-transparent text-right pr-8">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="group hover:bg-slate-50 transition-all duration-300">
                                    <th className="pl-8 text-slate-300 font-bold border-none">{index + 1}</th>
                                    
                                    <td className="border-none py-4">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800 text-base">{payment.name}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: {payment._id.slice(-8)}</span>
                                        </div>
                                    </td>

                                    <td className="border-none">
                                        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                            <MdOutlineEmail className="text-indigo-400" />
                                            {payment.userEmail}
                                        </div>
                                    </td>

                                    <td className="border-none text-center">
                                        <div className="inline-flex items-center font-black text-slate-800 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
                                            <MdAttachMoney className="text-sm" />
                                            {payment.amount}
                                        </div>
                                    </td>

                                    <td className="border-none text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            payment.type === 'membership' 
                                            ? 'bg-purple-50 text-purple-600 border-purple-100' 
                                            : 'bg-blue-50 text-blue-600 border-blue-100'
                                        }`}>
                                            <MdLabelOutline className="inline mr-1 text-sm align-middle" />
                                            {payment.type}
                                        </span>
                                    </td>

                                    <td className="border-none text-right pr-8">
                                        <div className="flex items-center justify-end gap-2 text-slate-400 font-bold text-xs">
                                            <MdCalendarMonth />
                                            {new Date(payment.createdAt).toLocaleDateString("en-GB", {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-20 opacity-20">
                                        <MdOutlineReceiptLong className="text-6xl mx-auto mb-2" />
                                        <p className="font-black uppercase tracking-widest text-sm">No transactions found</p>
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

export default ViewPayments;