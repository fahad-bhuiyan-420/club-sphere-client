import { useQuery } from "@tanstack/react-query";

import Loading from "./Loading";
import useAxios from "../hooks/useAxiosSecure";
import EventCard from "./EventCard";

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
    <Loading></Loading>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events: {events.length}</h2>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
