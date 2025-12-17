import React from 'react';
import { useForm } from 'react-hook-form';
import {  useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateEvent = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    console.log(id);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleUpdateEvent = (data) => {
        const eventData = {
            ...data,
            isPaid: data.isPaid === "true",
            eventFee: data.isPaid === "true" ? Number(data.eventFee) : 0,
            eventDate: new Date(data.eventDate).toLocaleDateString("en-GB"),
            maxAttendees: Number(data.maxAttendees) || null,
        };

        axiosSecure.patch(`/events/${id}`, eventData).then(res => {
            console.log(res.data)
        })

        Swal.fire({
            title: "Updated!",
            text: "Your Event has been Updated.",
            icon: "success"
        });
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow-md mt-10">
            {/* Form Title */}
            <h2 className="text-2xl font-bold mb-6 text-center">Update Event</h2>

            {/* Form */}
            <form onSubmit={handleSubmit(handleUpdateEvent)} className="space-y-4">


                {/* Title */}
                <div>
                    <label className="font-medium">Event Title</label>
                    <input
                        type="text"
                        placeholder="Enter event title"
                        className="input input-bordered w-full"
                        {...register("title", { required: "Event title is required" })}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="font-medium">Description</label>
                    <textarea
                        placeholder="Event description"
                        className="textarea textarea-bordered w-full"
                        {...register("description", { required: "Description is required" })}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Event Date */}
                <div>
                    <label className="font-medium">Event Date</label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        {...register("eventDate", { required: "Event date is required" })}
                    />
                    {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate.message}</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="font-medium">Location</label>
                    <input
                        type="text"
                        placeholder="Event location"
                        className="input input-bordered w-full"
                        {...register("location", { required: "Location is required" })}
                    />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                </div>

                {/* Paid / Free */}
                <div>
                    <label className="font-medium">Is this a paid event?</label>
                    <select className="select select-bordered w-full" {...register("isPaid", { required: true })}>
                        <option value="false">No (Free)</option>
                        <option value="true">Yes (Paid)</option>
                    </select>
                </div>

                {/* Event Fee (only if paid) */}
                {
                    <div>
                        <label className="font-medium">Event Fee</label>
                        <input
                            type="number"
                            min="1"
                            placeholder="Event fee"
                            className="input input-bordered w-full"
                            {...register("eventFee", { required: "Fee is required for paid events" })}
                        />
                        {errors.eventFee && <p className="text-red-500 text-sm">{errors.eventFee.message}</p>}
                    </div>
                }

                {/* Max Attendees (optional) */}
                <div>
                    <label className="font-medium">Max Attendees (optional)</label>
                    <input
                        type="number"
                        min="1"
                        placeholder="Maximum attendees"
                        className="input input-bordered w-full"
                        {...register("maxAttendees")}
                    />
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button className="btn btn-primary px-6" type="submit">
                        Update Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEvent;