import React from 'react';
import logo from '../assets/logo.png';

const Logo = () => {
    return (
        <div className='flex items-center gap-3 group cursor-pointer transition-all duration-300'>
            {/* Logo Icon Container */}
            <div className="relative">
                <div className="absolute inset-0 bg-indigo-400 blur-md opacity-0 group-hover:opacity-40 transition-opacity rounded-full"></div>
                <img 
                    src={logo} 
                    className='w-10 h-10 rounded-full object-cover relative z-10 border-2 border-transparent group-hover:border-indigo-500 transition-all duration-300 transform group-hover:rotate-12' 
                    alt="Club Sphere Logo" 
                />
            </div>

            {/* Logo Text */}
            <div className='flex flex-col leading-tight'>
                <h1 className='text-xl md:text-2xl font-black tracking-tighter text-slate-800 flex items-center'>
                    Club
                    <span className='bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent ml-1'>
                        Sphere
                    </span>
                </h1>
                <div className='flex items-center gap-1'>
                    <span className='h-[2px] w-0 group-hover:w-full bg-indigo-500 transition-all duration-500 rounded-full'></span>
                    <p className='text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 group-hover:text-indigo-500 transition-colors'>
                        Connect • Grow
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Logo;