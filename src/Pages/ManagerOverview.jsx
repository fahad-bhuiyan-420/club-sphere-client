import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const ManagerOverview = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: members = [] } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/total-members?email=${user.email}`);
            return res.data
        }
    })

    const { data: registrations = [] } = useQuery({
        queryKey: ['registrations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/created-event-registrations?email=${user.email}`);
            return res.data
        }
    })

    const { data: events = [] } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/total-events?email=${user.email}`)
            return res.data
        }
    })


    const { data: clubs = [] } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs?email=${user.email}`)
            return res.data
        }
    })

    const clubCost = members.reduce((sum, item) => {
        return sum + Number(item.amount || 0);
    }, 0);

    const eventCost = registrations.reduce((sum, item) => {
        return sum + Number(item.amount || 0);
    }, 0);

    const totalRevenue = clubCost + eventCost

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Manager Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* My Clubs */}
                <div className="bg-base-200 p-5 rounded-2xl shadow-md">
                    <p className="text-lg font-semibold">My Clubs</p>
                    <p className="text-2xl font-bold mt-2">{clubs.length}</p>
                </div>

                {/* Total Members */}
                <div className="bg-base-200 p-5 rounded-2xl shadow-md">
                    <p className="text-lg font-semibold">Total Club Members</p>
                    <p className="text-2xl font-bold mt-2">{members.length}</p>
                </div>

                {/* Events Created */}
                <div className="bg-base-200 p-5 rounded-2xl shadow-md">
                    <p className="text-lg font-semibold">Events Created</p>
                    <p className="text-2xl font-bold mt-2">{events.length}</p>
                </div>
            </div>

            {/* Revenue */}
            <div className="bg-base-200 p-6 rounded-2xl shadow-md">
                <p className="text-xl font-semibold">Total Revenue</p>
                <p className="text-3xl font-bold mt-2">${totalRevenue}</p>
            </div>
        </div>
    );
};

export default ManagerOverview;