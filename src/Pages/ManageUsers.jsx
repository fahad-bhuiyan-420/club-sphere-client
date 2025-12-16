import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    const userEmail = user.email
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    const handleRole = (id, role) => {
        console.log(id, role);
        axiosSecure.patch(`/users/${id}`, { role: role })
            .then(res => {
                console.log(res.data)
                refetch();
                Swal.fire({
                    title: "Changed!",
                    text: `Role has been changed to ${role}`,
                    icon: "success"
                });
            })

    }

    return (
        <div className="relative overflow-x-auto">
            <table className="table table-zebra ">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Change Roles</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => <tr key={user._id} className={userEmail === user.email && `bg-gray-300`}>
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user?.role || 'member'}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString("en-GB")}</td>
                            <td className='relative'>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn btn-primary m-1">Choose Role</div>
                                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm overflow-visible gap-2">
                                        <button onClick={() => handleRole(user._id, 'admin')} className='btn btn-accent'> Admin</button>
                                        <button onClick={() => handleRole(user._id, 'club_manager')} className='btn btn-warning'> Club Manager</button >
                                        <button onClick={() => handleRole(user._id, 'member')} className='btn btn-error'> Member</button>
                                    </ul>
                                </div>


                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;