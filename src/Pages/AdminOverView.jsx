import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { MdPeople, MdSecurity, MdEmojiEvents, MdOutlineAccountBalanceWallet, MdOutlineHub } from 'react-icons/md';

const AdminOverView = () => {
    const axiosSecure = useAxiosSecure();

    // Data Fetching
    const { data: users = [] } = useQuery({ queryKey: ['users'], queryFn: async () => (await axiosSecure.get('/users')).data });
    const { data: clubs = [] } = useQuery({ queryKey: ['clubs'], queryFn: async () => (await axiosSecure.get('/clubs')).data });
    const { data: members = [] } = useQuery({ queryKey: ['members'], queryFn: async () => (await axiosSecure.get('/members')).data });
    const { data: events = [] } = useQuery({ queryKey: ['events'], queryFn: async () => (await axiosSecure.get('/events')).data });
    const { data: eventRegistrations = [] } = useQuery({ queryKey: ['eventRegistrations'], queryFn: async () => (await axiosSecure.get('/allEventRegistrations')).data });
    const { data: BarData = [] } = useQuery({ queryKey: ['BarData'], queryFn: async () => (await axiosSecure.get('/club-members')).data });

    const totalEventFees = eventRegistrations.reduce((total, event) => total + (event.amount || 0), 0);
    const totalMembershipFees = members.reduce((total, member) => total + (member.amount || 0), 0);
    const totalRevenue = totalEventFees + totalMembershipFees;

    const stats = [
        { label: 'Total Users', value: users.length, icon: <MdPeople />, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Clubs', value: clubs.length, icon: <MdOutlineHub />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Memberships', value: members.length, icon: <MdSecurity />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Events Hosted', value: events.length, icon: <MdEmojiEvents />, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-8 p-2">
            {/* Header Section */}
            <div>
                <h1 className="text-4xl font-black text-slate-800 tracking-tight">System Overview</h1>
                <p className="text-slate-500 font-medium">Real-time analytics and platform performance metrics.</p>
            </div>

            {/* Financial & Main Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Card - Gradient Focus */}
                <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-indigo-300 mb-2">
                                <MdOutlineAccountBalanceWallet className="text-xl" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Total Platform Revenue</span>
                            </div>
                            <h2 className="text-5xl font-black tracking-tighter">${totalRevenue.toLocaleString()}</h2>
                        </div>
                        <div className="flex gap-8 mt-8">
                            <div>
                                <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Membership Dues</p>
                                <p className="text-xl font-bold">${totalMembershipFees.toLocaleString()}</p>
                            </div>
                            <div className="w-[1px] bg-slate-700 h-10 self-center"></div>
                            <div>
                                <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Event Tickets</p>
                                <p className="text-xl font-bold">${totalEventFees.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                </div>

                {/* Vertical Secondary Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    {stats.slice(0, 2).map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} text-2xl`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Row - More Stats & Chart */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Remaining Small Stats */}
                <div className="flex flex-col gap-4">
                    {stats.slice(2).map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 grow">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} text-2xl`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bar Chart Section */}
                <div className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-800">Membership Distribution</h3>
                            <p className="text-slate-400 text-xs font-bold">Total members per club</p>
                        </div>
                        <div className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase text-slate-500">Live Data</div>
                    </div>
                    
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={BarData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                />
                                <Tooltip 
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="membership" radius={[10, 10, 0, 0]} barSize={40}>
                                    {BarData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#818cf8'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverView;