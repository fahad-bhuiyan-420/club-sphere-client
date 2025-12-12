import React from 'react';
import UseRole from '../hooks/useRole';

const AdminRoute = ({children}) => {

    const {role, isLoading} = UseRole()

    if (isLoading) {
        return <Loading></Loading>
    }

    if (role === 'admin') {
        return children
    }

    return (<UnauthorizedAccess></UnauthorizedAccess>)
};

export default AdminRoute;