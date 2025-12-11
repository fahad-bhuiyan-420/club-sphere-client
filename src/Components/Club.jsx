import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Club = () => {
    const {user} = useAuth();
    const params = useParams();
    const id = params.id;
    const axiosInstance = useAxios()
    const axiosSecure = useAxiosSecure();

    const { data: club = {} } = useQuery({
        queryKey: ['club'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/clubs/${id}`)
            return res.data
        }
    })

    const {refetch, data: membership = {}} = useQuery({
        queryKey: ['membership'],
        queryFn: async () => {
            const res = await axiosSecure.get(`http://localhost:3000/membership?email=${user.email}&clubId=${id}`);
            return res.data
        }
    })

    useEffect(() => {
        refetch()
    }, [])


    const handlePaidJoin = async () => {
        const paymentInfo = {
            name: club.clubName,
            amount: club.membershipFee,
            email: user.email,
            type: 'club',
            clubId: club._id,
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    }

    const handleFreeJoin = () => {
        
        const membershipInfo = {
            userEmail: user.email,
            clubId: id,
            status: 'active',
            joinedAt: new Date()
        }
        axiosSecure.post('/membership', membershipInfo)
            .then(res => {
                console.log(res.data);
                refetch();
            })
        
    }
    

    return (
        <div className="hero bg-base-200 min-h-screen space-y-5">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={club.bannerImage}
                    className="max-w-sm rounded-lg shadow-2xl "
                />
                <div>
                    <h1 className="text-5xl font-bold">{club.clubName}</h1>
                    <p className="py-6 text-2xl font-semibold">
                        <span className='font-bold'>Description: </span> {club.description}
                    </p>
                    <p className="py-6 text-2xl font-semibold">
                        <span className='font-bold'>Location: </span> {club.location}
                    </p>
                    <p className="py-6 text-2xl font-semibold">
                        <span className='font-bold'>MembershipFee: </span> {club.membershipFee}  
                    </p>

                    {
                        club.status == "approved" && membership.clubId != id &&
                         <>
                         {
                            club.membershipFee == 0 ? <button onClick={handleFreeJoin} className="btn btn-success w-[50%] text-black text-2xl font-bold">Join Club for Free</button> : <button onClick={handlePaidJoin} className="btn btn-success w-[50%] text-black text-2xl font-bold">Join Club for {club.membershipFee}$</button>
                         }
                         
                         </> 
                         
                    }
                    {
                      club.status !== 'approved' && <h3 className='text-3xl font-semibold text-red-400'>{club.status}</h3>
                    }
                    {
                        membership.clubId == id  && <h3 className='font-bold text-xl text-accent'>Joined</h3>
                    }
                    {
                        membership.clubId == id  && club.membershipFee !== 0 && <h3 className='font-bold text-xl text-red-400'>Payment Complete</h3> 
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Club;