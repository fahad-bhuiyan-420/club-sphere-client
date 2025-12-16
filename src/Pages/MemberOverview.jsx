import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const MemberOverview = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: members = []} = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/members?userEmail=${user.email}`);
            return res.data
        }
    })
    const {data: registrations = []} = useQuery({
        queryKey: ['registrations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allEventRegistrations?userEmail=${user.email}`);
            return res.data
        }
    })
    const {data: events = []} = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/upcoming-events?email=${user.email}`);
            return res.data
        }
    })
    console.log(members, registrations);
    return (
        <div className='m-5'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* My Clubs */}
                <div className="bg-base-200 p-5 rounded-2xl shadow-md">
                    <p className="text-lg font-semibold">Total Clubs joined</p>
                    <p className="text-2xl font-bold mt-2">{members.length}</p>
                </div>

                {/* Total Members */}
                <div className="bg-base-200 p-5 rounded-2xl shadow-md">
                    <p className="text-lg font-semibold">Total Events Registered</p>
                    <p className="text-2xl font-bold mt-2">{registrations.length}</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Upcoming Events</th>
                            <th>Event Location</th>
                            <th>Event Fees</th>
                            <th>Max Attendees</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map((event, index) => <tr key={event._id}>
                            <th>{index + 1}</th>
                            <td>{event.title}</td>
                            <td>{event.location}</td>
                            <td>{event.eventFee}</td>
                            <td>{event.maxAttendees}</td>
                            <td>{new Date(event.createdAt).toLocaleDateString("en-GB")}</td>
                        </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberOverview;