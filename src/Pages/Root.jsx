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
        <div className='mx-10 md:mx-30'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;