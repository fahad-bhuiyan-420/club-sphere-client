import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';
import { TbSocialOff } from 'react-icons/tb';
import logo from '../assets/logo.png'
import useAuth from '../hooks/useAuth';

const Navbar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut();
    }

    const links = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/clubs'>Clubs</Link></li>
        <li><Link to='/events'>Events</Link></li>

        {
            user && <>
                <li><Link to='/dashboard'>Dashboard</Link></li>
            </>
        }
    </>

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <p className="btn btn-ghost text-xl">
                        <Link to='/'><Logo></Logo></Link>
                    </p>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <button onClick={handleLogOut} className="btn">LogOut</button> : <>
                            <Link to='/login'><button className='btn mr-3'>LogIn</button></Link>
                            <Link to='/register'><button className='btn'>Register</button></Link>
                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;