import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';

const MemberClubs = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: clubs = [] } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/member-clubs?userEmail=${user.email}`)
            return res.data
        }
    })

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-10 my-10'>
                {
                    clubs.map(club => <Link to={`/clubs/${club._id}`}><div key={club._id} className="card bg-base-100 w-full shadow-2xl hover:bg-base-300">
                        <figure className="px-10 pt-10">
                            <img
                                src={club.bannerImage}
                                alt="Shoes"
                                className="rounded-xl h-[200px] w-[300px] object-cover" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{club.clubName}</h2>
                            <p className="card-title">Location: {club.location}</p>
                            <p className="card-title">Membership Status: {club.membershipStatus}</p>
                            <div className="card-actions">
                            </div>
                        </div>
                    </div></Link>)
                }
            </div>
        </div>
    );
};

export default MemberClubs;