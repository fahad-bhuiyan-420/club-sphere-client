import React from 'react';
import Banner from './Banner';
import Marquee from 'react-fast-marquee';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import UseRole from '../hooks/useRole';


const Home = () => {
    const {user} = useAuth();
    console.log(user);
    const axiosInstance = useAxios();
    const {role, isLoading} = UseRole()

    const { data: clubs = [] } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosInstance.get('/clubs')
            return res.data
        }
    })

    return (
        <div>
            This is Home
            <Banner></Banner>
            <p>Total clubs are: {clubs.length}</p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 my-10'>
                {
                    clubs.slice(0, 6).map(club => <div key={club._id} className="card bg-base-100 w-full shadow-2xl hover:bg-base-300">
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
                    </div>)
                }
            </div>

            <button className='btn btn-accent w-full mb-10 font-bold text-2xl'>Click To See More Clubs</button>


        </div>
    );
};

export default Home;