import React from 'react';
import logo from '../assets/logo.png'

const Logo = () => {
    return (
        <button className='hover:bg-base-300'>
            <div className='flex'>
                <img src={logo} className='w-[30px] h-[30px] rounded-full' alt="" />
                <p>Club Sphere</p>
            </div>
        </button>
    );
};

export default Logo;    