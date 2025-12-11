import React from 'react';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import UseAxiosSecure from '../hooks/useAxiosSecure';

const Clubs = () => {

    const axiosInstance = useAxios();
    const axiosSecure = UseAxiosSecure()

    const { data: clubs = [] } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/clubs')
            return res.data
        }
    })



    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10 my-10'>
                {
                    clubs.map(club => <Link to={`/clubs/${club._id}`}><div  key={club._id} className="card bg-base-100 w-full shadow-2xl hover:bg-base-300">
                        <figure className="px-10 pt-10">
                            <img
                                src={club.bannerImage}
                                alt="Shoes"
                                className="rounded-xl h-[200px] w-[300px] object-cover" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{club.clubName}</h2>
                            <p>{club.description}</p>
                            <div className="card-actions">
                            </div>
                        </div>
                    </div></Link>)
                }
            </div>
    );
};

export default Clubs;