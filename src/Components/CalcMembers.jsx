import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CalcMembers = ({club, members, setMembers}) => {
    const axiosSecure = useAxiosSecure();
    const {data: membership = []} = useQuery({
        queryKey: ['membership'],
        queryFn: async () => {
            const res = axiosSecure.get(`/membership/${club._id}`);
            return res.data
        }
    })
    setMembers(members + membership.length)
    console.log(members)
    return (
        <div>
            
        </div>
    );
};

export default CalcMembers;