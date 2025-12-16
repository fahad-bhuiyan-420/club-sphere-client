import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import Swal from 'sweetalert2';

const ManageClubs = () => {
    const axiosSecure = useAxiosSecure();
    const { data: clubs = [], refetch } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/clubs');
            return res.data
        }
    })
    const { data: clubMembers = [], } = useQuery({
        queryKey: ['clubMembers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/club-members');
            return res.data
        }
    })
    const handleStatus = (id, status) => {
        const data = { status: status }
        axiosSecure.patch(`/clubs/${id}`, data)
            .then(res => {
                console.log(res.data);
                refetch();
                Swal.fire({
                    title: status === 'approved' ? 'Approved' : 'Rejected',
                    text: `Your file has been ${status}.`,
                    icon: "success"
                });
            })
    }
    console.log(clubMembers)
    return (
        <div>
            {/* <h2 className='text-5xl text-center font-semibold my-5'>Club Data</h2> */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Club Name</th>
                            <th>Manager Email</th>
                            <th>Status</th>
                            <th>Membership Fees</th>
                            <th>Members</th>
                            <th>Approve</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clubs.map((club, index) => {

                                const members = clubMembers.find(cm => cm.name === club.clubName)

                                return (
                                    <tr key={club._id} >
                                        <th>{index + 1}</th>
                                        <td>{club.clubName}</td>
                                        <td>{club.managerEmail}</td>
                                        <td className={club.status === 'approved' ? 'text-green-400' : 'text-red-400'}>{club.status}</td>
                                        <td>{club.membershipFee} $</td>
                                        <td>{members?.membership}</td>
                                        <td><button onClick={() => handleStatus(club._id, 'approved')} className='btn'>
                                            <FcApprove />
                                        </button></td>
                                        <td>
                                            <button onClick={() => handleStatus(club._id, 'rejected')} className='btn'>
                                                <FcDisapprove />
                                            </button>
                                        </td>
                                    </tr>)
                            })
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClubs;