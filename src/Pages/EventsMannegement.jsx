import React from 'react';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from '../Components/Loading';
import { Link,  } from 'react-router';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';

const EventsMannegement = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: events = [], isLoading, refetch } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/total-events?email=${user.email}`)
            return res.data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`events/${id}`).then(res => {
                    console.log(res.data);
                    refetch()
                })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    console.log(events)
    return (
        <div>

            <div className="flex justify-center  my-5 ">
                <Link to='/dashboard/create-event'>
                    <button className="btn btn-accent w-full">Create Event <FaPlus /></button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Event Date</th>
                            <th>Location</th>
                            <th>Event Fees</th>
                            <th>Update Event</th>
                            <th>Delete Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map((event, index) => <tr key={event._id}>
                                <th>{index + 1}</th>
                                <td>{event.title}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.location}</td>
                                <td>{event.eventFee}</td>
                                <td>
                                    <Link to={`/dashboard/update-event/${event._id}`}>
                                        <button className='btn btn-primary'>
                                            Update
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(event._id)} className='btn bg-red-400'>
                                        Delete
                                    </button>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventsMannegement;