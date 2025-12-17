import React from 'react';
import Banner from './Banner';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { Link, useNavigate } from 'react-router';
import { MdArrowDropDownCircle } from 'react-icons/md';


const Home = () => {
    const axiosInstance = useAxios();

    const navigate = useNavigate();


    const { data: clubs = [] } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosInstance.get('/clubs?sortedKey=createdAt&sortedValue=1')
            return res.data
        }
    })

    const handleClub = (id) => {
        console.log(id);
        navigate(`/clubs/${id}`)
    }

    return (
        <div className='my-5'>

            <Banner></Banner>


            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 my-10'>
                {
                    clubs.slice(0, 6).map(club => <div onClick={() => handleClub(club._id)} key={club._id} className="card bg-base-100 w-full shadow-2xl hover:bg-base-300">
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

            <Link to='/clubs'><button className='btn btn-primary w-full mb-10 font-bold text-2xl'>Click To See More Clubs <MdArrowDropDownCircle /></button></Link>

            {/* How ClubSphere Works */}
            <section className="my-20 px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                    How ClubSphere Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    <div className="p-6 rounded-2xl shadow-lg bg-base-100 hover:shadow-2xl transition">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">Explore Clubs</h3>
                        <p>Browse clubs by category, location, or popularity.</p>
                    </div>

                    <div className="p-6 rounded-2xl shadow-lg bg-base-100 hover:shadow-2xl transition">
                        <div className="text-5xl mb-4">🤝</div>
                        <h3 className="text-xl font-semibold mb-2">Join a Club</h3>
                        <p>Request membership and connect with like-minded people.</p>
                    </div>

                    <div className="p-6 rounded-2xl shadow-lg bg-base-100 hover:shadow-2xl transition">
                        <div className="text-5xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold mb-2">Attend Events</h3>
                        <p>Participate in meetups, workshops, and activities.</p>
                    </div>

                    <div className="p-6 rounded-2xl shadow-lg bg-base-100 hover:shadow-2xl transition">
                        <div className="text-5xl mb-4">🚀</div>
                        <h3 className="text-xl font-semibold mb-2">Grow Together</h3>
                        <p>Build skills, friendships, and leadership experience.</p>
                    </div>
                </div>
            </section>

            {/* Why Join a Club */}
            <section className="my-20 px-4 bg-base-200 py-16 rounded-3xl">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Why Join a Club?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="p-8 bg-base-100 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-semibold mb-3">🌱 Personal Growth</h3>
                        <p>
                            Develop leadership, communication, and teamwork skills beyond academics.
                        </p>
                    </div>

                    <div className="p-8 bg-base-100 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-semibold mb-3">🌍 Community</h3>
                        <p>
                            Meet people who share your interests and build lasting connections.
                        </p>
                    </div>

                    <div className="p-8 bg-base-100 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-semibold mb-3">🎯 Opportunities</h3>
                        <p>
                            Gain access to exclusive events, workshops, and career opportunities.
                        </p>
                    </div>
                </div>
            </section>



        </div>
    );
};

export default Home;