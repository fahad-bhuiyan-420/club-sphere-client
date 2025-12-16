import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const MyClubs = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: clubs = [], refetch } = useQuery({
        queryKey: ['clubs', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs?email=${user.email}`);
            return res.data;
        }
    })

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
                axiosSecure.delete(`/clubs/${id}`)
                    .then(res => {
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

    return (
        <div>
            <div className="flex justify-center  my-5 ">
                <Link to='/dashboard/create-club'><button className="btn btn-accent w-full">Create Club</button></Link>
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
                            clubs.map((club, i) => <tr>
                                <th>{i + 1}</th>
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