import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from './Logo';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut();
    };

    const navStyles = ({ isActive }) => 
        `font-semibold transition-all duration-200 px-4 py-2 rounded-lg ${
            isActive 
            ? 'text-indigo-600 bg-indigo-50' 
            : 'text-slate-600 hover:text-indigo-500 hover:bg-slate-50'
        }`;

    const links = (
        <>
            <li><NavLink to='/' className={navStyles}>Home</NavLink></li>
            <li><NavLink to='/clubs' className={navStyles}>Clubs</NavLink></li>
            <li><NavLink to='/events' className={navStyles}>Events</NavLink></li>
            {user && (
                <li><NavLink to='/dashboard' className={navStyles}>Dashboard</NavLink></li>
            )}
        </>
    );

    return (
        <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="navbar max-w-7xl mx-auto px-4 lg:px-8 min-h-[70px]">
                
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-2xl z-[1] mt-3 w-52 p-4 shadow-xl border border-slate-100 gap-2">
                            {links}
                        </ul>
                    </div>
                    <Link to='/' className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Logo />
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end gap-3">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-indigo-100 hover:border-indigo-500 transition-all">
                                <div className="w-10 rounded-full">
                                    <img 
                                        alt="User Avatar" 
                                        src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-white rounded-2xl w-60 border border-slate-100">
                                <li className="px-4 py-3">
                                    <p className="font-bold text-slate-800 text-base leading-tight line-clamp-1">
                                        {user?.displayName || 'User'}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                </li>
                                <div className="h-px bg-slate-100 mx-2 my-1"></div>
                                <li>
                                    <button 
                                        onClick={handleLogOut}
                                        className="py-3 mt-1 text-red-500 hover:bg-red-50 font-bold flex justify-between items-center"
                                    >
                                        Log Out
                                        <span className="text-[10px] bg-red-100 px-2 py-0.5 rounded text-red-600 uppercase tracking-wider">Session</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to='/login'>
                                <button className='btn btn-ghost text-indigo-600 font-bold hidden sm:flex'>
                                    Log In
                                </button>
                            </Link>
                            <Link to='/register'>
                                <button className='btn bg-indigo-600 hover:bg-indigo-700 border-none text-white font-bold px-6 shadow-md shadow-indigo-100 rounded-xl'>
                                    Join Now
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;