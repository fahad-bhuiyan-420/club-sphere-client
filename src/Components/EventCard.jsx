import React from 'react';
import { Link } from 'react-router';
import { MdLocationOn, MdCalendarToday, MdArrowForward, MdAccountBalanceWallet } from 'react-icons/md';

const EventCard = ({ event }) => {
    const {
        _id,
        title,
        description,
        location,
        eventDate,
        isPaid,
        eventFee,
        image // Assuming your event object might have an image, if not I've added a fallback
    } = event;

    // Formatting the date for the decorative badge
    const dateObj = new Date(eventDate);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });

    return (
        <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full">
            {/* Image & Date Badge Section */}
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={image || "https://images.unsplash.com/photo-1540575861501-7ad058df321d?q=80&w=2070"} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Glassmorphism Date Badge */}
                <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 px-3 text-center shadow-lg border border-white/20">
                        <span className="block text-indigo-600 font-black text-xl leading-none">{day || "00"}</span>
                        <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-widest">{month || "Date"}</span>
                    </div>
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
                        isPaid ? 'bg-orange-500/90 text-white' : 'bg-emerald-500/90 text-white'
                    }`}>
                        {isPaid ? `${eventFee}৳` : 'Free'}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors mb-3 line-clamp-1">
                    {title}
                </h3>

                <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <MdLocationOn className="text-indigo-500 text-lg" />
                        <span className="truncate">{location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <MdCalendarToday className="text-indigo-500 text-base" />
                        <span>{eventDate?.slice(0, 10)}</span>
                    </div>
                </div>

                {/* Action Section */}
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <MdAccountBalanceWallet className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">
                            {isPaid ? 'Paid Entry' : 'Open Entry'}
                        </span>
                    </div>
                    
                    <Link to={`/events/${_id}`}>
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-bold text-sm rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                            Details <MdArrowForward />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCard;