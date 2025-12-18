import React from 'react';
import UseRole from '../hooks/useRole';
import UnauthorizedAccess from '../Components/UnauthorizedAccess';
import Loading from '../Components/Loading';

const ClubManagerRoute = ({children}) => {

    const {role, isLoading} = UseRole()
    // console.log(role);
    if (isLoading) {
        return <Loading></Loading>
    }

    if (role === 'club_manager') {
        return children
    }

    return (<UnauthorizedAccess></UnauthorizedAccess>)
};

export default ClubManagerRoute;