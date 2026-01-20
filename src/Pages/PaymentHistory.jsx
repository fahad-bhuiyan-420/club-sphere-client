import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdHistoryEdu, MdOutlineReceiptLong, MdCreditScore, MdArrowOutward } from 'react-icons/md';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?userEmail=${user.email}`)
            return res.data
        }
    });

    // Calculate total expenditure for the summary card
    const totalSpent = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

    return (
        <div className="space-y-8">
            {/* Header & Total Summary Section */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
                        <MdHistoryEdu className="text-white text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Billing History</h1>
                        <p className="text-slate-500 font-medium">Review your transactions and membership dues.</p>
                    </div>
                </div>

                <div className="bg-indigo-900 p-8 rounded-[2rem] shadow-xl text-white min-w-[280px] relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Total Investment</p>
                        <h2 className="text-4xl font-black">${totalSpent.toFixed(2)}</h2>
                    </div>
                    <MdCreditScore className="absolute -right-4 -bottom-4 text-8xl opacity-10 rotate-12" />
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center gap-2">
                    <MdOutlineReceiptLong className="text-indigo-600 text-xl" />
                    <h3 className="font-black text-slate-800 uppercase text-sm tracking-tighter">Recent Transactions</h3>
                </div>

                <div className="overflow-x-auto p-4">
                    <table className="table w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-slate-400 uppercase text-[11px] tracking-widest font-bold border-none">
                                <th className="bg-transparent pl-6">#</th>
                                <th className="bg-transparent">Description</th>
                                <th className="bg-transparent">Category</th>
                                <th className="bg-transparent">Amount</th>
                                <th className="bg-transparent text-center">Status</th>
                                <th className="bg-transparent text-right pr-6">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="group hover:bg-slate-50/80 transition-all">
                                    <th className="pl-6 text-slate-400 font-bold border-none">{index + 1}</th>
                                    <td className="border-none py-4">
                                        <div className="font-black text-slate-800">{payment.name}</div>
                                        <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-tighter">
                                            ID: {payment._id.slice(-8)} <MdArrowOutward />
                                        </div>
                                    </td>
                                    <td className="border-none">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                            payment.type === 'club' ? 'bg-indigo-50 text-indigo-600' : 'bg-purple-50 text-purple-600'
                                        }`}>
                                            {payment.type}
                                        </span>
                                    </td>
                                    <td className="border-none font-black text-slate-800">
                                        ${parseFloat(payment.amount).toFixed(2)}
                                    </td>
                                    <td className="border-none text-center">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                            Successful
                                        </div>
                                    </td>
                                    <td className="border-none text-right pr-6">
                                        <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg inline-block">
                                            {new Date(payment.createdAt).toLocaleDateString("en-GB")}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-20 border-none">
                                        <p className="text-slate-400 font-bold italic">No payment history found.</p>
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

export default PaymentHistory;