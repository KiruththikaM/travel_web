import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/Store';
import { fetchBookings } from '../../store/slices/bookingsSlice';
import { fetchStats } from '../../store/slices/statsSlice';
import AdminLayout from '../components/AdminLayout';
import StatCard from '../components/StatCard';
import AdminTable from '../components/AdminTable';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HistoryIcon from '@mui/icons-material/History';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const DashboardOverview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: bookings, status: bookingsStatus } = useSelector((state: RootState) => state.bookings);
  const { data: stats, status: statsStatus } = useSelector((state: RootState) => state.stats);

  useEffect(() => {
    if (bookingsStatus === 'idle' && bookings.length === 0) dispatch(fetchBookings());
    if (statsStatus === 'idle' && stats.totalRevenue === 0) dispatch(fetchStats());
  }, [dispatch, bookingsStatus, statsStatus, bookings.length, stats.totalRevenue]);

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
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 m-0 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2 text-base font-medium">
          Welcome back! Here's a snapshot of your travel platform's performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Revenue" value={`${stats.totalRevenue.toLocaleString()}`} icon={<AttachMoneyIcon fontSize="inherit" />} color="#10b981" />
        <StatCard title="Active Users" value={stats.activeUsers.toLocaleString()} icon={<PeopleAltIcon fontSize="inherit" />} color="#6366f1" />
        <StatCard title="Upcoming Trips" value={stats.pendingBookings} icon={<HistoryIcon fontSize="inherit" />} color="#f59e0b" />
        <StatCard title="Total Destinations" value={stats.totalTrips} icon={<FlightTakeoffIcon fontSize="inherit" />} color="#8b5cf6" />
      </div>

      <div className="grid gap-8">
        <AdminTable title="Recent Activity" columns={columns} data={bookings} />
      </div>
    </AdminLayout>
  );
};

export default DashboardOverview;
