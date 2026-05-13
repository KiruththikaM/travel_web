import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/Store';
import { fetchBookings, updateBookingStatus } from '../../store/slices/bookingsSlice';
import type { Booking } from '../../store/slices/bookingsSlice';
import AdminLayout from '../components/AdminLayout';
import { Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { CalendarEventType } from '../../types';

interface CalendarEvent {
  type: CalendarEventType;
  title: string;
  guests: string;
  location: string;
  bookingId: string;
  booking: Booking;
}


const TYPE_COLORS: Record<CalendarEventType, { pill: string; dot: string; cardBg: string; cardBorder: string; badgeBg: string; badgeText: string }> = {
  Confirmed: { pill: 'bg-teal-100 text-teal-700',    dot: 'bg-teal-500',   cardBg: 'rgba(20,184,166,0.12)',  cardBorder: 'rgba(20,184,166,0.35)',  badgeBg: 'rgba(20,184,166,0.18)',  badgeText: '#0d9488' },
  Pending:   { pill: 'bg-orange-100 text-orange-600', dot: 'bg-orange-400', cardBg: 'rgba(251,146,60,0.12)', cardBorder: 'rgba(251,146,60,0.35)', badgeBg: 'rgba(251,146,60,0.18)', badgeText: '#ea580c' },
  Blocked:   { pill: 'bg-red-100 text-red-600',       dot: 'bg-red-400',    cardBg: 'rgba(248,113,113,0.12)', cardBorder: 'rgba(248,113,113,0.35)', badgeBg: 'rgba(248,113,113,0.18)', badgeText: '#dc2626' },
};

const DAYS   = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year: number, month: number) { return new Date(year, month, 1).getDay(); }
function pad(n: number) { return String(n).padStart(2, '0'); }
function dateKey(year: number, month: number, day: number) { return `${year}-${pad(month + 1)}-${pad(day)}`; }

function toEventType(status: Booking['status']): CalendarEventType {
  if (status === 'Cancelled') return 'Blocked';
  return status;
}

function buildEventsMap(bookings: Booking[]): Record<string, CalendarEvent[]> {
  const map: Record<string, CalendarEvent[]> = {};
  for (const b of bookings) {
    const key = b.checkIn ? b.checkIn.slice(0, 10) : b.date.slice(0, 10);
    if (!key) continue;
    if (!map[key]) map[key] = [];
    map[key].push({ type: toEventType(b.status), title: b.destinationName || b.destination, guests: `${b.guests} Guest${b.guests !== 1 ? 's' : ''}`, location: b.location || b.destination, bookingId: b.id, booking: b });
  }
  return map;
}

export default function AdminCalendar() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: bookings, status } = useSelector((state: RootState) => state.bookings);

  const today = new Date();
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDate, setSelectedDate] = useState(`${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`);

  useEffect(() => {
    if (status === 'idle' && bookings.length === 0) dispatch(fetchBookings());
  }, [dispatch, status, bookings.length]);

  const EVENTS = buildEventsMap(bookings);
  const { year, month } = current;
  const daysInMonth  = getDaysInMonth(year, month);
  const firstDay     = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1 < 0 ? 11 : month - 1);

  const goToToday = () => { setCurrent({ year: today.getFullYear(), month: today.getMonth() }); setSelectedDate(`${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`); };
  const prevMonth = () => setCurrent(c => c.month === 0  ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  const nextMonth = () => setCurrent(c => c.month === 11 ? { year: c.year + 1, month: 0  } : { ...c, month: c.month + 1 });

  const cells: { day: number; curMonth: boolean; key: string }[] = [];
  for (let i = 0; i < firstDay; i++) {
    const day = prevMonthDays - firstDay + 1 + i;
    const m = month - 1 < 0 ? 11 : month - 1;
    const y = month - 1 < 0 ? year - 1 : year;
    cells.push({ day, curMonth: false, key: `${y}-${pad(m + 1)}-${pad(day)}` });
  }
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, curMonth: true, key: dateKey(year, month, d) });
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month + 1 > 11 ? 0 : month + 1;
    const y = month + 1 > 11 ? year + 1 : year;
    cells.push({ day: d, curMonth: false, key: `${y}-${pad(m + 1)}-${pad(d)}` });
  }

  const selectedEvents = EVENTS[selectedDate] || [];
  const selectedDay    = parseInt(selectedDate.split('-')[2]);
  const todayKey       = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    dispatch(updateBookingStatus({ id: bookingId, status: newStatus }));
  };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ fontSize: 24, fontWeight: 900, color: 'text.primary', letterSpacing: '-0.5px' }}>Calendar</Box>
        <Box sx={{ color: 'text.secondary', fontSize: 13, mt: 0.5 }}>Togo / Calendar</Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>

       
        <Box sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>

       
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ fontSize: 17, fontWeight: 900, color: 'text.primary' }}>{MONTHS[month]} {year}</Box>
              <Box component="button" onClick={prevMonth} sx={{ p: 0.5, borderRadius: 1.5, border: 'none', bgcolor: 'transparent', cursor: 'pointer', color: 'text.disabled', display: 'flex', '&:hover': { bgcolor: 'action.hover', color: 'text.primary' } }}>
                <ChevronLeftIcon sx={{ fontSize: 20 }} />
              </Box>
              <Box component="button" onClick={nextMonth} sx={{ p: 0.5, borderRadius: 1.5, border: 'none', bgcolor: 'transparent', cursor: 'pointer', color: 'text.disabled', display: 'flex', '&:hover': { bgcolor: 'action.hover', color: 'text.primary' } }}>
                <ChevronRightIcon sx={{ fontSize: 20 }} />
              </Box>
              <Box component="button" onClick={goToToday} sx={{ fontSize: 13, fontWeight: 700, color: '#fb5b52', px: 1, py: 0.25, borderRadius: 1.5, border: 'none', bgcolor: 'transparent', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(251,91,82,0.08)' } }}>
                Today
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}><Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#14b8a6' }} />Confirmed</Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}><Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#fb923c' }} />Pending</Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}><Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f87171' }} />Cancelled</Box>
            </Box>
          </Box>

          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: '1px solid', borderColor: 'divider' }}>
            {DAYS.map(d => (
              <Box key={d} sx={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: 1, py: 1.25 }}>
                {d}
              </Box>
            ))}
          </Box>

         
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
            {cells.map((cell, idx) => {
              const events    = EVENTS[cell.key] || [];
              const isToday   = cell.key === todayKey;
              const isSelected = cell.key === selectedDate;
              const isLastRow  = idx >= 35;

              return (
                <Box
                  key={cell.key + idx}
                  onClick={() => setSelectedDate(cell.key)}
                  sx={{
                    minHeight: 90, p: 1,
                    borderBottom: isLastRow ? 'none' : '1px solid',
                    borderRight: (idx + 1) % 7 === 0 ? 'none' : '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    opacity: cell.curMonth ? 1 : 0.35,
                    bgcolor: isSelected ? 'action.selected' : 'transparent',
                    transition: 'background 0.15s',
                    '&:hover': { bgcolor: isSelected ? 'action.selected' : 'action.hover' },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 0.5 }}>
                    <Box sx={{
                      fontSize: 13, fontWeight: 700,
                      width: 28, height: 28,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: isToday ? '#fb5b52' : 'transparent',
                      color: isToday ? '#fff' : 'text.primary',
                    }}>
                      {cell.day}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                    {events.slice(0, 2).map((ev, i) => (
                      <span key={i} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded truncate ${TYPE_COLORS[ev.type].pill}`}>
                        {ev.type} ({events.filter(e => e.type === ev.type).length})
                      </span>
                    ))}
                    {events.length > 2 && (
                      <Box sx={{ fontSize: 10, color: 'text.disabled', fontWeight: 600, px: 0.5 }}>+{events.length - 2} more</Box>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

      
        <Box sx={{ width: 280, flexShrink: 0 }}>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
              <Box sx={{ fontWeight: 900, color: 'text.primary', fontSize: 15 }}>
                {MONTHS[parseInt(selectedDate.split('-')[1]) - 1].slice(0, 3)} {selectedDay}
              </Box>
              {selectedDate === todayKey && (
                <Box sx={{ fontSize: 11, fontWeight: 700, color: '#fb5b52', bgcolor: 'rgba(251,91,82,0.08)', px: 1.5, py: 0.25, borderRadius: 10 }}>Today</Box>
              )}
            </Box>

            {selectedEvents.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <CalendarTodayIcon sx={{ fontSize: 36, color: 'text.disabled' }} />
                <Box sx={{ color: 'text.secondary', fontSize: 13, mt: 1 }}>No bookings on this day</Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {selectedEvents.map((ev, i) => (
                  <Box key={i} sx={{
                    borderRadius: 3, border: '1px solid',
                    borderColor: TYPE_COLORS[ev.type].cardBorder,
                    bgcolor: TYPE_COLORS[ev.type].cardBg,
                    p: 2,
                  }}>
                    <Box sx={{
                      display: 'inline-block', fontSize: 10, fontWeight: 900,
                      textTransform: 'uppercase', letterSpacing: 1.5,
                      bgcolor: TYPE_COLORS[ev.type].badgeBg,
                      color: TYPE_COLORS[ev.type].badgeText,
                      px: 1.5, py: 0.5, borderRadius: 10, mb: 1,
                    }}>
                      {ev.booking.status} Trip
                    </Box>
                    <Box sx={{ fontWeight: 700, color: 'text.primary', fontSize: 13, lineHeight: 1.3 }}>{ev.title}</Box>
                    <Box sx={{ fontSize: 11, color: 'text.secondary', mt: 0.5 }}>by {ev.booking.user}</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mt: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 12, color: 'text.secondary' }}>
                        <CalendarTodayIcon sx={{ fontSize: 13 }} />{ev.booking.checkIn} → {ev.booking.checkOut}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 12, color: 'text.secondary' }}>
                        <PeopleIcon sx={{ fontSize: 13 }} />{ev.guests}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 12, color: 'text.secondary' }}>
                        <LocationOnIcon sx={{ fontSize: 13 }} />{ev.location}
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.75, mt: 1.5 }}>
                      {(['Confirmed', 'Pending', 'Cancelled'] as Booking['status'][]).map(s => (
                        <Box
                          key={s}
                          component="button"
                          onClick={() => handleStatusChange(ev.bookingId, s)}
                          sx={{
                            flex: 1, py: 0.75, fontSize: 10, fontWeight: 700, borderRadius: 1.5,
                            border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
                            bgcolor: ev.booking.status === s ? 'text.primary' : 'transparent',
                            color: ev.booking.status === s ? 'background.paper' : 'text.secondary',
                            borderColor: ev.booking.status === s ? 'text.primary' : 'divider',
                            '&:hover': ev.booking.status !== s ? { bgcolor: 'action.hover' } : {},
                          }}
                        >
                          {s}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </AdminLayout>
  );
}
