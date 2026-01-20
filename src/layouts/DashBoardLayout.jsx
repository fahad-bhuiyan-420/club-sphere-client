import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import UseRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth'; // Added to show user info
import { MdAppRegistration, MdEvent, MdHistoryEdu, MdManageAccounts, MdOutlinePayments, MdHome, MdDashboard, MdArrowBack } from 'react-icons/md';
import { GrOverview } from "react-icons/gr";
import { CiViewColumn } from "react-icons/ci";
import { SiBookmyshow, SiManageiq, SiPhotocrowd, SiUnacademy } from "react-icons/si";
import { FaCcDinersClub, FaUsers } from "react-icons/fa";

const DashBoardLayout = () => {
    const { role } = UseRole();
    const { user } = useAuth(); // Assuming useAuth provides the logged-in user
    const location = useLocation();

    // Active link style logic
    const activeClass = (path) => 
        location.pathname === path 
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
        : "text-slate-600 hover:bg-slate-100";

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                
                <div className="drawer-content flex flex-col">
                    {/* Top Navbar */}
                    <nav className="navbar w-full bg-white border-b border-slate-200 px-4 sticky top-0 z-30">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost text-slate-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2">
                            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                                Workspace / <span className="text-indigo-600 capitalize">{role?.replace('_', ' ')}</span>
                            </h2>
                        </div>
                    </nav>

                    {/* Content Area */}
                    <div className="p-6 md:p-10">
                        <Outlet />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="drawer-side z-40">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col w-72 bg-white border-r border-slate-200">
                        
                        {/* Logo / Brand Section */}
                        <div className="p-6 flex items-center gap-3 border-b border-slate-50">
                            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
                                <MdDashboard className="text-white text-xl" />
                            </div>
                            <span className="text-xl font-black text-slate-800 tracking-tighter">DASHBOARD</span>
                        </div>

                        {/* Navigation Menu */}
                        <ul className="menu p-4 w-full grow gap-1 text-[15px] font-semibold">
                            
                            {/* Utility Link */}
                            <li className="mb-4">
                                <Link to='/' className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                                    <MdHome className="text-xl" />
                                    <span>Return to Homepage</span>
                                </Link>
                            </li>

                            <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Management</p>

                            {/* Club Manager specific links */}
                            {role === 'club_manager' && (
                                <>
                                    <li><Link to='/dashboard/manager-overview' className={`${activeClass('/dashboard/manager-overview')} p-3 rounded-xl flex items-center gap-3 transition-all`}><MdManageAccounts className="text-xl"/> Overview</Link></li>
                                    <li><Link to='/dashboard/my-clubs' className={`${activeClass('/dashboard/my-clubs')} p-3 rounded-xl flex items-center gap-3 transition-all`}><FaCcDinersClub className="text-xl"/> My Clubs</Link></li>
                                    <li><Link to='/dashboard/club-members' className={`${activeClass('/dashboard/club-members')} p-3 rounded-xl flex items-center gap-3 transition-all`}><SiPhotocrowd className="text-xl"/> Club Members</Link></li>
                                    <li><Link to='/dashboard/events-management' className={`${activeClass('/dashboard/events-management')} p-3 rounded-xl flex items-center gap-3 transition-all`}><MdEvent className="text-xl"/> Events</Link></li>
                                    <li><Link to='/dashboard/event-registrations' className={`${activeClass('/dashboard/event-registrations')} p-3 rounded-xl flex items-center gap-3 transition-all`}><MdAppRegistration className="text-xl"/> Registrations</Link></li>
                                </>
                            )}

                            {/* Admin specific links */}
                            {role === 'admin' && (
                                <>
                                    <li><Link to='/dashboard/admin-overview' className={`${activeClass('/dashboard/admin-overview')} p-3 rounded-xl flex items-center gap-3 transition-all`}><GrOverview className="text-xl"/> Overview</Link></li>
                                    <li><Link to='/dashboard/manage-users' className={`${activeClass('/dashboard/manage-users')} p-3 rounded-xl flex items-center gap-3 transition-all`}><FaUsers className="text-xl"/> Manage Users</Link></li>
                                    <li><Link to='/dashboard/manage-clubs' className={`${activeClass('/dashboard/manage-clubs')} p-3 rounded-xl flex items-center gap-3 transition-all`}><SiManageiq className="text-xl"/> Manage Clubs</Link></li>
                                    <li><Link to='/dashboard/view-payments' className={`${activeClass('/dashboard/view-payments')} p-3 rounded-xl flex items-center gap-3 transition-all`}><MdOutlinePayments className="text-xl"/> Payments</Link></li>
                                </>
                            )}

                            {/* Member specific links */}
                            <div className='mt-6 space-y-1'>
                                <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Personal</p>
                                <li><Link to='/dashboard/member-overview' className={`${activeClass('/dashboard/member-overview')} p-3 rounded-xl flex items-center gap-3 transition-all`}><CiViewColumn className="text-xl"/> Member Overview</Link></li>
                                <li><Link to='/dashboard/member/my-clubs' className={`${activeClass('/dashboard/member/my-clubs')} p-3 rounded-xl flex items-center gap-3 transition-all`}><SiBookmyshow className="text-xl"/> My Clubs</Link></li>
                                <li><Link to='/dashboard/my-events' className={`${activeClass('/dashboard/my-events')} p-3 rounded-xl flex items-center gap-3 transition-all`}><SiUnacademy className="text-xl"/> My Events</Link></li>
                                <li><Link to='/dashboard/payment-history' className={`${activeClass('/dashboard/payment-history')} p-3 rounded-xl flex items-center gap-3 transition-all`}><MdHistoryEdu className="text-xl"/> Billing</Link></li>
                            </div>
                        </ul>

                        {/* Sidebar Bottom Profile */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-3 p-2">
                                <div className="avatar placeholder">
                                    <div className="bg-indigo-100 text-indigo-600 rounded-lg w-10 font-bold border border-indigo-200">
                                        <span>{user?.email?.charAt(0).toUpperCase() || 'U'}</span>
                                    </div>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-bold text-slate-800 truncate">{user?.email || 'User'}</p>
                                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">Online</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;