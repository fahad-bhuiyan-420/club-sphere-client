import { useQueries, useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const MyClubs = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
    const {data: clubs = [], refetch} = useQuery({
        queryKey: ['clubs'],
        queryFn: async() => {
           const res = await axiosSecure.get(`/clubs?email=${user.email}`);
           return res.data;
        }
    })

    const handleDelete = (id) => {
        axiosSecure.delete(`/clubs/${id}`)
            .then(res => {
                console.log(res.data);
                refetch()
            })
    }

    return (
        <div>
            <div className="flex justify-center  my-5 ">
                <Link to='/dashboard/create-club'><button  className="btn btn-accent w-full">Create Club</button></Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Membership Fees</th>
                            <th>Update Club</th>
                            <th>Delete club</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                          clubs.map(club => <tr>
                                <th>{1}</th>
                                <td>{club.clubName}</td>
                                <td>{club.category}</td>
                                <td>{club.location}</td>
                                <td>{club.membershipFee}</td>

                                <td>
                                    <Link to={`/dashboard/update-club/${club._id}`}>
                                        <button className='btn'>
                                            Update
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(club._id)} className='btn'>
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

export default MyClubs;