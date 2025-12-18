import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading';
import Swal from 'sweetalert2';
import { IoMdArrowDropdown } from "react-icons/io";

const ClubMembers = () => {
    const { user } = useAuth();
    const [id, setId] = useState();
    const axiosSecure = useAxiosSecure()
    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ['clubs', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs?email=${user.email}`)
            return res.data
        }
    })
    const { data: members = [], refetch } = useQuery({
        queryKey: ['members', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/membership/${id}`)
            return res.data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleClub = (id) => {
        console.log(id);
        setId(id);
        refetch()
    }

    const handleExpired = (id, status) => {
        console.log(id, status)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/membership/${id}`, { status: status })
                    .then(res => {
                        console.log(res.data)
                        refetch();
                    })
                Swal.fire({
                    title: "Expired!",
                    text: "Your file has been set to expired.",
                    icon: "success"
                });
            }
        });


    }

    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-secondary m-1">Choose Club <IoMdArrowDropdown /></div>
                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    {
                        clubs.map(club => <li ><button onClick={() => handleClub(club._id)}>{club.clubName}</button></li>)
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
                            <th>Joined At</th>
                            <th>Status</th>
                            <th>Set Expired</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            members.map((mem, index) => <tr className="bg-base-200" key={mem._id}>
                                <th>{index + 1}</th>
                                <td>{mem.userEmail}</td>
                                <td>{new Date(mem.joinedAt).toLocaleDateString("en-GB")}</td>
                                <td className={mem.status === 'active' ? 'text-green-400' : 'text-red-400'}>{mem.status}</td>
                                <td>
                                    <button onClick={() => handleExpired(mem._id, 'expired')} className='btn '>
                                        x
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

export default ClubMembers;