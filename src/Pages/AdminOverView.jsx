import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminOverView = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })
    const { data: clubs = [] } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/clubs');
            return res.data
        }
    })
    const { data: members = [] } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosSecure.get('/members');
            return res.data
        }
    })
    const { data: events = [] } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosSecure.get('/events');
            return res.data
        }
    })
    const { data: eventRegistrations = [] } = useQuery({
        queryKey: ['eventRegistrations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allEventRegistrations');
            return res.data
        }
    })
    const { data: BarData = [] } = useQuery({
        queryKey: ['BarData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/club-members');
            return res.data
        }
    })
    console.log(BarData);

    const totalEventFees = eventRegistrations.reduce((total, event) => {
        return total + (event.amount || 0);
    }, 0);

    const totalMembershipFees = members.reduce((total, member) => {
        return total + (member.amount || 0);
    }, 0);

    const totalCost = totalEventFees + totalMembershipFees;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Admin Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* My Clubs */}
                <div className="bg-base-200 p-5 rounded-2xl shadow-md">
                    <p className="text-lg font-semibold">Total Users</p>
                    <p className="text-2xl font-bold mt-2">{users.length}</p>
                </div>

                {/* Total Members */}
                <div className="bg-base-200 p-5 rounded-2xl shadow-md">
                    <p className="text-lg font-semibold">Total Clubs</p>
                    <p className="text-2xl font-bold mt-2">{clubs.length}</p>
                </div>

                {/* Events Created */}
                <div className="bg-base-200 p-5 rounded-2xl shadow-md">
                    <p className="text-lg font-semibold">Total Memberships</p>
                    <p className="text-2xl font-bold mt-2">{members.length}</p>
                </div>
            </div>

            {/* Revenue */}
            <div className="bg-base-200 p-6 rounded-2xl shadow-md">
                <p className="text-xl font-semibold">Total Events</p>
                <p className="text-3xl font-bold mt-2">{events.length}</p>
            </div>

            <div className="bg-base-200 p-6 rounded-2xl shadow-md">
                <p className="text-xl font-semibold">Total Payments Amount</p>
                <p className="text-3xl font-bold mt-2">${totalCost}</p>
            </div>

            <div className=' flex justify-center'>
                <BarChart
                    style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                    responsive
                    data={BarData}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis width="auto" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="membership" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            </div>
        </div>
    );
};

export default AdminOverView;