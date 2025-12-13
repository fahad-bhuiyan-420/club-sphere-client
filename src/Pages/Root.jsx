import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading';

const Root = () => {
    const {loading} = useAuth();

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='max-w-[1500px] mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;