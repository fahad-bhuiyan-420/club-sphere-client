import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import UseAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const EventDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    console.log(id)
    const axiosSecure = UseAxiosSecure();
    const { data: event = {} } = useQuery({
        queryKey: ['event'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/events/${id}`);
            return res.data
        }
    })

    const { refetch, data: eventRegistration = {} } = useQuery({
        queryKey: ['eventRegistration'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/eventRegistrations?eventId=${id}&email=${user.email}`)
            return res.data;
        }
    })

    const handlePayment = async () => {

        if (!user) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User not yet logged in!",
            });
        }

        const paymentInfo = {
            name: event.title,
            amount: event.eventFee,
            email: user.email,
            type: 'event',
            clubId: event.clubId,
            eventId: event._id,
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
        window.location.href = res.data.url;
    }

    const handleFreeJoin = () => {

        if (!user) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User not yet logged in!",
            });
        }

        const eventRegistrationInfo = {
            userEmail: user.email,
            clubId: event.clubId,
            eventId: id,
            status: 'registered',
            registeredAt: new Date()
        }

        axiosSecure.post('/eventRegistrations', eventRegistrationInfo)
            .then(res => {
                console.log(res.data);
                refetch();
            })
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

            <p className="mb-2">
                <strong>Description:</strong> {event.description}
            </p>
            <p className="mb-2">
                <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
            </p>
            <p className="mb-2">
                <strong>Location:</strong> {event.location}
            </p>
            <p className="mb-2">
                <strong>Max Attendees:</strong> {event.maxAttendees || "Unlimited"}
            </p>
            <p className="mb-4">
                <strong>Fee:</strong>{" "}
                {event.isPaid ? `$${event.eventFee}` : "Free"}
            </p>

            {event.isPaid && eventRegistration.eventId !== id &&
                <button
                    onClick={handlePayment}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Pay Now
                </button>
            }

            {
                event.isPaid == false && eventRegistration.eventId !== id && <button onClick={handleFreeJoin} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Join Free
                </button>
            }
            {
                eventRegistration.eventId == id && <h3 className='font-bold text-xl text-accent'>Joined</h3>
            }
            {
                eventRegistration.eventId == id && event.isPaid && <h3 className='text-xl font-bold text-red-400'>Payment Complete</h3>
            }

        </div>
    );
};

export default EventDetails;