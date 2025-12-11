import React from 'react';
import { Link } from 'react-router';

const EventCard = ({event}) => {
      const {
    _id,
    title,
    description,
    location,
    eventDate,
    isPaid,
    eventFee,
  } = event;

    return (
        <div className="bg-base-200 rounded-xl shadow-md p-5 flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>

            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {description}
            </p>

            <p className="text-sm mb-1">
                <span className="font-medium">📅 Date:</span> {eventDate?.slice(0, 10)}
            </p>

            <p className="text-sm mb-2">
                <span className="font-medium">📍 Location:</span> {location}
            </p>

            <div className="mt-auto">
                <p className="font-semibold mb-3">
                    {isPaid ? (
                        <span className="text-red-600">Paid — {eventFee}৳</span>
                    ) : (
                        <span className="text-green-600">Free Event</span>
                    )}
                </p>

                <Link to={`/events/${_id}`}>
                    <button className="btn btn-primary w-full">View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default EventCard;