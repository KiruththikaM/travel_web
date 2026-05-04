import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/Store';
import { fetchBookings } from '../../store/slices/bookingsSlice';
import AdminLayout from '../components/AdminLayout';
import AdminTable from '../components/AdminTable';

const ManageBookings = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: bookings, status } = useSelector((state: RootState) => state.bookings);

    useEffect(() => {
        if (status === 'idle' && bookings.length === 0) {
            dispatch(fetchBookings());
        }
    }, [dispatch, status, bookings.length]);

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
            {status === 'loading' && <p className="text-slate-400 text-sm">Loading...</p>}
            {status === 'error' && <p className="text-rose-500 text-sm">Failed to load bookings.</p>}
            <AdminTable title="Customer Bookings" columns={columns} data={bookings} />
        </AdminLayout>
    );
};

export default ManageBookings;
