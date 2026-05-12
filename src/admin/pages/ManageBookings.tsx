import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/Store';
import { fetchBookings, updateBookingStatus } from '../../store/slices/bookingsSlice';
import type { Booking } from '../../store/slices/bookingsSlice';
import AdminLayout from '../components/AdminLayout';
import { Box } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import GroupIcon from '@mui/icons-material/Group';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

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

const statusStyles: Record<string, { pill: string; text: string }> = {
  Confirmed: { pill: 'bg-emerald-100 text-emerald-700 border-emerald-200', text: 'text-emerald-600' },
  Pending:   { pill: 'bg-amber-100 text-amber-700 border-amber-200',       text: 'text-amber-600'   },
  Cancelled: { pill: 'bg-rose-100 text-rose-700 border-rose-200',          text: 'text-rose-600'    },
};

const ManageBookings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: bookings, status } = useSelector((state: RootState) => state.bookings);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (status === 'idle' && bookings.length === 0) dispatch(fetchBookings());
  }, [dispatch, status, bookings.length]);

  const handleStatusChange = (id: string, newStatus: Booking['status']) => {
    dispatch(updateBookingStatus({ id, status: newStatus }));
  };

  const confirmed   = bookings.filter(b => b.status === 'Confirmed').length;
  const pending     = bookings.filter(b => b.status === 'Pending').length;
  const totalGuests = bookings.reduce((sum, b) => sum + (b.price > 1000 ? 4 : b.price > 500 ? 2 : 1), 0);

  const filtered = bookings.filter(b => {
    const matchStatus = statusFilter === 'All Status' || b.status === statusFilter;
    const matchSearch =
      b.user.toLowerCase().includes(search.toLowerCase()) ||
      b.destination.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const statCards = [
    { icon: <EventNoteIcon sx={{ fontSize: 26, color: '#fb5b52' }} />,      label: 'Total Reservations', value: bookings.length, iconBg: 'rgba(251,91,82,0.1)'  },
    { icon: <HourglassEmptyIcon sx={{ fontSize: 26, color: '#f59e0b' }} />, label: 'Awaiting Action',    value: pending,         iconBg: 'rgba(245,158,11,0.1)' },
    { icon: <FlightTakeoffIcon sx={{ fontSize: 26, color: '#10b981' }} />,  label: 'Upcoming Trips',     value: confirmed,       iconBg: 'rgba(16,185,129,0.1)' },
    { icon: <GroupIcon sx={{ fontSize: 26, color: '#3b82f6' }} />,          label: 'Total Guests',       value: totalGuests,     iconBg: 'rgba(59,130,246,0.1)' },
  ];

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ fontSize: 24, fontWeight: 900, color: 'text.primary', letterSpacing: '-0.5px' }}>Bookings</Box>
        <Box sx={{ color: 'text.secondary', fontSize: 13, mt: 0.5 }}>Togo / Bookings</Box>
      </Box>

      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', lg: 'repeat(4,1fr)' }, gap: 2, mb: 4 }}>
        {statCards.map(card => (
          <Box key={card.label} sx={{
            bgcolor: 'background.paper', borderRadius: 3,
            p: 2.5, display: 'flex', alignItems: 'center', gap: 2,
            border: '1px solid', borderColor: 'divider',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <Box sx={{ borderRadius: 2.5, p: 1.5, flexShrink: 0, bgcolor: card.iconBg }}>
              {card.icon}
            </Box>
            <Box>
              <Box sx={{ fontSize: 12, color: 'text.secondary', fontWeight: 500, mb: 0.25 }}>{card.label}</Box>
              <Box sx={{ fontSize: 24, fontWeight: 900, color: 'text.primary', lineHeight: 1 }}>{card.value}</Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>

       
        <Box sx={{
          display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' }, justifyContent: 'space-between',
          gap: 2, px: 3, py: 2.5,
          borderBottom: '1px solid', borderColor: 'divider',
        }}>
          <Box>
            <Box sx={{ fontSize: 15, fontWeight: 900, color: 'text.primary' }}>All Reservations</Box>
            <Box sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>Manage every booking from all your published tours</Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Box
              component="input"
              type="text"
              placeholder="Search customer or tour..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              sx={{
                border: '1px solid', borderColor: 'divider', borderRadius: 2,
                px: 1.5, py: 0.75, fontSize: 13, outline: 'none', width: 200,
                bgcolor: 'background.default', color: 'text.primary',
                '&:focus': { borderColor: '#fb5b52' },
              }}
            />
            <Box
              component="select"
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
              sx={{
                border: '1px solid', borderColor: 'divider', borderRadius: 2,
                px: 1.5, py: 0.75, fontSize: 13, outline: 'none',
                bgcolor: 'background.default', color: 'text.primary', cursor: 'pointer',
              }}
            >
              <option>All Status</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </Box>
          </Box>
        </Box>

        {status === 'loading' && <Box sx={{ color: 'text.secondary', fontSize: 13, px: 3, py: 4 }}>Loading...</Box>}
        {status === 'error'   && <Box sx={{ color: 'error.main',    fontSize: 13, px: 3, py: 4 }}>Failed to load bookings.</Box>}

        {status !== 'loading' && (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr>
                  {['CUSTOMER & TOUR', 'GUESTS', 'TOTAL PRICE', 'PAYMENT', 'STATUS', 'DATE', 'ACTION'].map(col => (
                    <Box
                      component="th"
                      key={col}
                      sx={{
                        textAlign: 'left', px: 3, py: 1.5,
                        fontSize: 11, fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: 1.5,
                        color: 'text.disabled', whiteSpace: 'nowrap',
                        borderBottom: '1px solid', borderColor: 'divider',
                        bgcolor: 'action.hover',
                      }}
                    >
                      {col}
                    </Box>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <Box component="td" colSpan={7} sx={{ textAlign: 'center', color: 'text.secondary', py: 6, fontSize: 13 }}>
                      No bookings found.
                    </Box>
                  </tr>
                )}
                {filtered.map((booking, i) => {
                  const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  const isPaid = booking.status === 'Confirmed';
                  const pill = statusStyles[booking.status]?.pill || '';

                  return (
                    <Box
                      component="tr"
                      key={booking.id}
                      sx={{
                        borderBottom: '1px solid', borderColor: 'divider',
                        transition: 'background 0.15s',
                        '&:last-child': { borderBottom: 'none' },
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                     
                      <Box component="td" sx={{ px: 3, py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                            {getInitials(booking.user)}
                          </Box>
                          <Box>
                            <Box sx={{ fontWeight: 700, color: 'text.primary', fontSize: 13 }}>{booking.user}</Box>
                            <Box sx={{ fontSize: 11, color: '#fb5b52', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                              ⊙ {booking.destination}
                            </Box>
                            <Box sx={{ fontSize: 11, color: 'text.disabled' }}>
                              {booking.user.toLowerCase().replace(' ', '.')}@gmail.com
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                  
                      <Box component="td" sx={{ px: 3, py: 2, color: 'text.primary', fontWeight: 600 }}>
                        {booking.price > 1000 ? 4 : booking.price > 500 ? 2 : 1}
                      </Box>

                     
                      <Box component="td" sx={{ px: 3, py: 2, fontWeight: 700, color: 'text.primary' }}>
                        ${booking.price.toLocaleString()}
                      </Box>

                     
                      <Box component="td" sx={{ px: 3, py: 2 }}>
                        <Box sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: isPaid ? '#10b981' : '#fb5b52' }}>
                          {isPaid ? 'PAID' : 'UNPAID'}
                        </Box>
                      </Box>

                     
                      <Box component="td" sx={{ px: 3, py: 2 }}>
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border ${pill}`}>
                          {booking.status}
                        </span>
                      </Box>

                      
                      <Box component="td" sx={{ px: 3, py: 2, color: 'text.disabled', fontSize: 12, whiteSpace: 'nowrap' }}>
                        {timeAgo(booking.date)}
                      </Box>

                      
                      <Box component="td" sx={{ px: 3, py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Box
                            component="button"
                            onClick={() => handleStatusChange(booking.id, 'Confirmed')}
                            title="Confirm"
                            sx={{
                              p: 0.75, borderRadius: 1.5, border: 'none', cursor: 'pointer',
                              bgcolor: 'transparent', color: 'text.disabled',
                              '&:hover': { bgcolor: 'rgba(16,185,129,0.1)', color: '#10b981' },
                              transition: 'all 0.15s',
                            }}
                          >
                            <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                          </Box>
                          <Box
                            component="select"
                            value={booking.status}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleStatusChange(booking.id, e.target.value as Booking['status'])}
                            sx={{
                              border: '1px solid', borderColor: 'divider', borderRadius: 1.5,
                              px: 1, py: 0.5, fontSize: 12, outline: 'none',
                              bgcolor: 'background.default', color: 'text.primary', cursor: 'pointer',
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </tbody>
            </table>
          </Box>
        )}
      </Box>
    </AdminLayout>
  );
};

export default ManageBookings;
