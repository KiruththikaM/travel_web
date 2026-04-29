import AdminLayout from '../components/AdminLayout';
import AdminTable from '../components/AdminTable';
import { mockBookings } from '../../data/mockData';

const ManageBookings = () => {
    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'User', accessor: 'user' },
        { header: 'Destination', accessor: 'destination' },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Status',
            accessor: 'status',
            render: (item: any) => {
                const colors = {
                    Confirmed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
                    Pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
                    Cancelled: 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                };
                const statusClass = colors[item.status as keyof typeof colors] || 'bg-slate-500/10 text-slate-600 border-slate-500/20';
                
                return (
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border ${statusClass}`}>
                        {item.status}
                    </span>
                );
            }
        },
        {
            header: 'Price',
            accessor: 'price',
            render: (item: any) => <span className="font-bold text-slate-900">${item.price.toLocaleString()}</span>
        }
    ];

    return (
        <AdminLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 m-0 tracking-tight">Manage Bookings</h1>
                <p className="text-slate-500 mt-2 text-base font-medium">View and manage customer reservations.</p>
            </div>
            <AdminTable title="Customer Bookings" columns={columns} data={mockBookings} />
        </AdminLayout>
    );
};

export default ManageBookings;
