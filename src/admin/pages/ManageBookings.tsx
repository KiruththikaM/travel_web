import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/Store';
import { fetchBookings } from '../../store/slices/bookingsSlice';
import AdminLayout from '../components/AdminLayout';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import GroupIcon from '@mui/icons-material/Group';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AVATAR_COLORS = ['#fb5b52', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  const days = Math.floor(diff / 86400);
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return '1 week ago';
  return `${Math.floor(days / 7)} weeks ago`;
}

const ManageBookings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: bookings, status } = useSelector((state: RootState) => state.bookings);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (status === 'idle' && bookings.length === 0) dispatch(fetchBookings());
  }, [dispatch, status, bookings.length]);

  const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
  const pending = bookings.filter(b => b.status === 'Pending').length;
  const totalGuests = bookings.reduce((sum, b) => sum + (b.price > 1000 ? 4 : b.price > 500 ? 2 : 1), 0);

  const filtered = bookings.filter(b => {
    const matchStatus = statusFilter === 'All Status' || b.status === statusFilter;
    const matchSearch =
      b.user.toLowerCase().includes(search.toLowerCase()) ||
      b.destination.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const statCards = [
    { icon: <EventNoteIcon sx={{ fontSize: 26, color: '#fb5b52' }} />, label: 'Total Reservations', value: bookings.length, iconBg: '#fff1f0' },
    { icon: <HourglassEmptyIcon sx={{ fontSize: 26, color: '#f59e0b' }} />, label: 'Awaiting Action', value: pending, iconBg: '#fffbeb' },
    { icon: <FlightTakeoffIcon sx={{ fontSize: 26, color: '#10b981' }} />, label: 'Upcoming Trips', value: confirmed, iconBg: '#f0fdf4' },
    { icon: <GroupIcon sx={{ fontSize: 26, color: '#3b82f6' }} />, label: 'Total Guests', value: totalGuests, iconBg: '#eff6ff' },
  ];

  return (
    <AdminLayout>
      
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Bookings</h1>
        <p className="text-slate-400 text-sm mt-0.5">Togo / Bookings</p>
      </div>

   
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(card => (
          <div key={card.label} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-slate-100">
            <div className="rounded-xl p-3 flex-shrink-0" style={{ backgroundColor: card.iconBg }}>
              {card.icon}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium mb-0.5">{card.label}</p>
              <p className="text-2xl font-black text-slate-800 leading-none">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

    
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-black text-slate-800">All Reservations</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage every booking from all your published tours</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search customer or tour..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-red-400 bg-white text-slate-800 placeholder-slate-400 w-48"
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none bg-white text-slate-600"
            >
              <option>All Status</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {status === 'loading' && <p className="text-slate-400 text-sm px-6 py-8">Loading...</p>}
        {status === 'error' && <p className="text-rose-500 text-sm px-6 py-8">Failed to load bookings.</p>}

        {status !== 'loading' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['CUSTOMER & TOUR', 'GUESTS', 'TOTAL PRICE', 'PAYMENT', 'STATUS', 'DATE', 'ACTION'].map(col => (
                    <th key={col} className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center text-slate-400 py-12 text-sm">No bookings found.</td>
                  </tr>
                )}
                {filtered.map((booking, i) => {
                  const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  const isPaid = booking.status === 'Confirmed';
                  const statusStyles: Record<string, string> = {
                    Confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                    Pending: 'bg-amber-100 text-amber-700 border-amber-200',
                    Cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
                  };

                  return (
                    <tr key={booking.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                     
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ backgroundColor: avatarColor }}
                          >
                            {getInitials(booking.user)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm leading-tight">{booking.user}</p>
                            <p className="text-[11px] text-red-500 font-semibold uppercase tracking-wide leading-tight mt-0.5 truncate max-w-[180px]">
                              ⊙ {booking.destination}
                            </p>
                            <p className="text-[11px] text-slate-400 leading-tight">
                              {booking.user.toLowerCase().replace(' ', '.')}@gmail.com
                            </p>
                          </div>
                        </div>
                      </td>

                     
                      <td className="px-6 py-4 text-slate-700 font-semibold">
                        {booking.price > 1000 ? 4 : booking.price > 500 ? 2 : 1}
                      </td>

                      
                      <td className="px-6 py-4 font-bold text-slate-800">
                        ${booking.price.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold uppercase tracking-wide ${isPaid ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {isPaid ? 'PAID' : 'UNPAID'}
                        </span>
                      </td>

                     
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border ${statusStyles[booking.status] || ''}`}>
                          {booking.status}
                        </span>
                      </td>

                     
                      <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                        {timeAgo(booking.date)}
                      </td>

                     
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                            <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                            <MoreVertIcon sx={{ fontSize: 18 }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageBookings;
