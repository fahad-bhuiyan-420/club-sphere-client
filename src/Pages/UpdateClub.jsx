import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';

const UpdateClub = () => {
    const {id} = useParams();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const isPaid = watch('isPaid');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        reset()
    }, [])

    const handleUpdateClub = (data) => {
        console.log(data)
        const clubData = {
            ...data,
            updatedAt: new Date(),   
        }
        axiosSecure.patch(`/clubs/${id}`, clubData)
            .then(res => {
                console.log(res.data);
            })
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow-md mt-10">
            {/* Form Title */}
            <h2 className="text-2xl font-bold mb-6 text-center">Update Club</h2>

            {/* Form */}
            <form onClick={handleSubmit(handleUpdateClub)} className="space-y-4">

                {/* Title */}
                <div>
                    <label className="font-medium">Club Name</label>
                    <input
                        type="text"
                        placeholder="Enter club name"
                        className="input input-bordered w-full"
                        {...register("clubName", { required: "Club Name is required" })}
                    />
                    {errors.clubName && <p className="text-red-500 text-sm">{errors.clubName.message}</p>}
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

                <div>
                    <label className="font-medium">Club Category</label>
                    <input
                        type="text"
                        placeholder="Enter Club Category"
                        className="input input-bordered w-full"
                        {...register("category", { required: "category is required" })}
                    />
                </div>

                <div>
                    <label className="font-medium">Banner Image</label>
                    <input
                        type="text"
                        placeholder="Enter Banner Image URL"
                        className="input input-bordered w-full"
                        {...register("banner", { required: "Banner is required" })}
                    />
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
                  isPaid === 'true' &&  (
                    <div>
                        <label className="font-medium">Membership Fee</label>
                        <input
                            type="number"
                            min="1"
                            placeholder="Event fee"
                            className="input input-bordered w-full"
                            {...register("membershipFee", { required: "Fee is required for paid clubs" })}
                        />
                        {errors.membershipFee && <p className="text-red-500 text-sm">{errors.membershipFee.message}</p>}
                    </div>
                )}



                {/* Submit */}
                <div className="text-center">
                    <button className="btn btn-primary px-6" type="submit">
                        Update Club
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateClub;