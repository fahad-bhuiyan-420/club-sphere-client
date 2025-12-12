import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading';
import { Navigate } from 'react-router';
import UnauthorizedAccess from '../Components/UnauthorizedAccess';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        return children
    }
    return (
        <UnauthorizedAccess></UnauthorizedAccess>
    );
};

export default PrivateRoute;