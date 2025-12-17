import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import UseAxiosSecure from '../hooks/useAxiosSecure';

const Clubs = () => {

    const axiosSecure = UseAxiosSecure()
    const [searchText, setSearchText] = useState('')
    const [sortKey, setSortKey] = useState('createdAt');
    const [sortValue, setSortValue] = useState(1);

    const { data: clubs = [], refetch } = useQuery({
        queryKey: ['clubs', searchText, sortKey, sortValue],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs?search=${searchText}&sortedKey=${sortKey}&sortedValue=${sortValue}&user=khalu@khala.com`)
            return res.data
        }
    })

    const handleSort = (data) => {

        const key = data.split(' ')[0]
        const value = (data.split(' ')[1])
        setSortKey(key);
        setSortValue(value)
        console.log(sortKey, sortValue)
        refetch()
    }

    return (
        <div>
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="search" required placeholder="Search" />
            </label>

            <details className="dropdown flex justify-end">
                <summary className="btn ">Sort By:</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1  p-2 shadow-sm">
                    <li onClick={() => handleSort('createdAt -1')} ><a>Newest First</a></li>
                    <li onClick={() => handleSort('createdAt 1')}><a>Oldest First</a></li>
                    <li onClick={() => handleSort('membershipFee -1')}><a>Highest Fee</a></li>
                    <li onClick={() => handleSort('membershipFee 1')}><a>Lowest Fee</a></li>
                </ul>
            </details>


            <div className='grid grid-cols-1 md:grid-cols-4 gap-10 my-10'>
                {
                    clubs.map(club => <Link to={`/clubs/${club._id}`}><div key={club._id} className="card bg-base-100 w-full shadow-2xl hover:bg-base-300">
                        <figure className="px-10 pt-10">
                            <img
                                src={club.bannerImage}
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
        </div>
    );
};

export default Clubs;