import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading';

const EventRegistrations = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const [id, setId] = useState('');
    const { data: events = [], isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/total-events?email=${user.email}`);
            return res.data
        }
    });

    const { data: registrations = [], refetch,  } = useQuery({
        queryKey: ['registrations', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/event-registrations?eventId=${id}`);
            return res.data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleEvent = (id) => {
        setId(id)
        refetch();
    }

    // console.log(events, registrations);

    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">Choose Event</div>
                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    {
                        events.map(event => <li ><button onClick={() => handleEvent(event._id)}>{event.title}</button></li>)
                    }

                </ul>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Registered At</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registrations.map((reg, index) => <tr className="bg-base-200" key={reg._id}>
                                <th>{index + 1}</th>
                                <td>{reg.userEmail}</td>
                                <td>{reg.registeredAt}</td>
                                <td>{reg.status}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventRegistrations;