import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import useAxios from "../hooks/useAxiosSecure";
import EventCard from "./EventCard";
import { MdCalendarMonth, MdOutlineExplore } from "react-icons/md";

const Events = () => {
    const axiosInstance = useAxios();
    
    const { data: events = [], isLoading } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const res = await axiosInstance.get("/events");
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading />; // Added 'return' keyword here
    }

    return (
        <div className="min-h-screen bg-slate-50/50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Decorative Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-4">
                        <MdCalendarMonth className="text-lg" />
                        <span>{events.length} Upcoming Events</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        Don't Miss the <span className="text-indigo-600">Action</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl text-lg">
                        From tech workshops to cultural festivals—discover and register for events happening across your campus community.
                    </p>
                </div>

                {/* Events Display */}
                {events.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MdOutlineExplore className="text-4xl text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">No Events Scheduled</h3>
                        <p className="text-slate-500 mt-2">Check back later or follow your favorite clubs for updates.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;