import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import UseAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const CreateEvent = ({ clubId }) => {
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const isPaid = watch("isPaid");

    const { data: clubs = [] } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosSecure.get('clubs?status=approved')
            return res.data
        }
    })

    // --- Submit Handler ---
    const handleCreateEvent = (data) => {
        const eventData = {
            ...data,
            isPaid: data.isPaid === "true",
            eventFee: data.isPaid === "true" ? Number(data.eventFee) : 0,
            eventDate: new Date(data.eventDate),
            maxAttendees: Number(data.maxAttendees) || null,
            createdAt: new Date(),
        };
        console.log(eventData)
        // axiosSecure.post('/events', eventData).then((res) => {
        //     console.log(res.data);
        // })
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow-md mt-10">
            {/* Form Title */}
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>

            {/* Form */}
            <form onSubmit={handleSubmit(handleCreateEvent)} className="space-y-4">
                {/* Club Selection */}
                <div>
                    <label className="font-medium">Select a Club</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("clubId", { required: "Please select a club" })}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            -- Choose a Club --
                        </option>
                        {clubs.map((club) => (
                            <option key={club._id} value={club._id}>
                                {club.clubName}
                            </option>
                        ))}
                    </select>
                    {errors.clubId && <p className="text-red-500 text-sm">{errors.clubId.message}</p>}
                </div>

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
                {isPaid === "true" && (
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
                )}

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
                        Create Event
                    </button>
                </div>
            </form>
        </div>

    );
};

export default CreateEvent;
