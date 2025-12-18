import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const MyEvents = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: events = [] } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/member-events?userEmail=${user.email}`);
            return res.data
        }
    })
    console.log(events)
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Event Title</th>
                            <th>Club Name</th>
                            <th>Registration Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map((event, index) => <tr key={event._id}>
                            <th>{index + 1}</th>
                            <td>{event.title}</td>
                            <td>{event.clubName}</td>
                            <td className='text-green-400'>{event.registrationStatus}</td>
                            <td>{new Date(event.createdAt).toLocaleDateString("en-GB")}</td>
                        </tr>)
                        }
                        

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEvents;