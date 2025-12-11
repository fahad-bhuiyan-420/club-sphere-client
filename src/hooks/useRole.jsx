import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import UseAxiosSecure from './useAxiosSecure';

const UseRole = () => {

    const { user } = useAuth();
    console.log(user);
    const axiosSecure = UseAxiosSecure();
    const { isLoading, data: role = ''} = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            // console.log('in the useRole', res.data.role);
            return res.data.role;
        }
    })

    return { role, isLoading };
};

export default UseRole;