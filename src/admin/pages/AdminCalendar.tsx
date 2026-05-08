import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { CalendarEvent, CalendarEventType } from '../../types';


const EVENTS: Record<string, CalendarEvent[]> = {
  '2026-05-01': [{ type: 'Confirmed', title: 'Elephant Jungle Sanctuary Half-Day Visit with Meal', guests: '4 Guests / 12 Max', location: 'Phuket, Thailand' }],
  '2026-05-02': [{ type: 'Confirmed', title: 'Swiss Alps Hiking Tour', guests: '2 Guests / 10 Max', location: 'Zermatt, Switzerland' }],
  '2026-05-06': [
    { type: 'Confirmed', title: 'Elephant Jungle Sanctuary Half-Day Visit with Meal', guests: '4 Guests / 12 Max', location: 'Phuket, Thailand' },
    { type: 'Pending', title: 'Grand Palace, Wat Pho, and Wat Arun Guided Tour', guests: '2 Guests / 24 Max', location: 'Bangkok, Thailand' },
  ],
  '2026-05-07': [{ type: 'Confirmed', title: 'Paradise Beach Sunset Cruise', guests: '6 Guests / 20 Max', location: 'Puducherry, India' }, { type: 'Confirmed', title: 'Eiffel Tower Night Tour', guests: '3 Guests / 15 Max', location: 'Paris, France' }],
  '2026-05-08': [{ type: 'Confirmed', title: 'Elephant Jungle Sanctuary Half-Day Visit with Meal', guests: '4 Guests / 12 Max', location: 'Phuket, Thailand' }, { type: 'Pending', title: 'Grand Palace, Wat Pho, and Wat Arun Guided Tour', guests: '2 Guests / 24 Max', location: 'Bangkok, Thailand' }],
  '2026-05-10': [{ type: 'Blocked', title: 'Maintenance Day', guests: '—', location: '—' }],
  '2026-05-11': [{ type: 'Confirmed', title: 'Swiss Alps Hiking Tour', guests: '5 Guests / 10 Max', location: 'Zermatt, Switzerland' }],
  '2026-05-15': [{ type: 'Confirmed', title: 'Paradise Beach Sunset Cruise', guests: '4 Guests / 20 Max', location: 'Puducherry, India' }, { type: 'Pending', title: 'Grand Palace, Wat Pho, and Wat Arun Guided Tour', guests: '3 Guests / 24 Max', location: 'Bangkok, Thailand' }],
};

const TYPE_STYLE: Record<CalendarEventType, { pill: string; dot: string; badge: string }> = {
  Confirmed: { pill: 'bg-teal-100 text-teal-700', dot: 'bg-teal-500', badge: 'bg-teal-50 border-teal-200 text-teal-700' },
  Pending:   { pill: 'bg-orange-100 text-orange-600', dot: 'bg-orange-400', badge: 'bg-orange-50 border-orange-200 text-orange-600' },
  Blocked:   { pill: 'bg-red-100 text-red-600', dot: 'bg-red-400', badge: 'bg-red-50 border-red-200 text-red-600' },
};

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function pad(n: number) { return String(n).padStart(2, '0'); }
function dateKey(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export default function AdminCalendar() {
  const today = new Date();
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
  );

  const { year, month } = current;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1 < 0 ? 11 : month - 1);

  const goToToday = () => {
    setCurrent({ year: today.getFullYear(), month: today.getMonth() });
    setSelectedDate(`${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`);
  };
  const prevMonth = () => setCurrent(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  const nextMonth = () => setCurrent(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });

  
  const cells: { day: number; curMonth: boolean; key: string }[] = [];
  for (let i = 0; i < firstDay; i++) {
    const day = prevMonthDays - firstDay + 1 + i;
    const m = month - 1 < 0 ? 11 : month - 1;
    const y = month - 1 < 0 ? year - 1 : year;
    cells.push({ day, curMonth: false, key: `${y}-${pad(m + 1)}-${pad(day)}` });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, curMonth: true, key: dateKey(year, month, d) });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month + 1 > 11 ? 0 : month + 1;
    const y = month + 1 > 11 ? year + 1 : year;
    cells.push({ day: d, curMonth: false, key: `${y}-${pad(m + 1)}-${pad(d)}` });
  }

  const selectedEvents = EVENTS[selectedDate] || [];
  const selectedDay = parseInt(selectedDate.split('-')[2]);
  const todayKey = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  return (
    <AdminLayout>
     
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Calendar</h1>
        <p className="text-slate-400 text-sm mt-0.5">Togo / Calendar</p>
      </div>

      <div className="flex gap-5 items-start">
      
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
         
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-lg font-black text-slate-800">{MONTHS[month]} {year}</span>
              <button onClick={prevMonth} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                <ChevronLeftIcon sx={{ fontSize: 20 }} />
              </button>
              <button onClick={nextMonth} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                <ChevronRightIcon sx={{ fontSize: 20 }} />
              </button>
              <button onClick={goToToday} className="text-sm font-bold text-red-500 hover:text-red-600 px-2 py-0.5 rounded-lg hover:bg-red-50 transition-colors">
                Today
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />Confirmed</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />Pending</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />Blocked</span>
            </div>
          </div>

          
          <div className="grid grid-cols-7 border-b border-slate-100">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider py-2.5">
                {d}
              </div>
            ))}
          </div>

         
          <div className="grid grid-cols-7">
            {cells.map((cell, idx) => {
              const events = EVENTS[cell.key] || [];
              const isToday = cell.key === todayKey;
              const isSelected = cell.key === selectedDate;
              const isLastRow = idx >= 35;

              return (
                <div
                  key={cell.key + idx}
                  onClick={() => setSelectedDate(cell.key)}
                  className={`min-h-[90px] p-2 border-b border-r border-slate-100 cursor-pointer transition-colors
                    ${isLastRow ? 'border-b-0' : ''}
                    ${(idx + 1) % 7 === 0 ? 'border-r-0' : ''}
                    ${isSelected ? 'bg-slate-50' : 'hover:bg-slate-50/60'}
                    ${!cell.curMonth ? 'opacity-40' : ''}
                  `}
                >
                  <div className="flex justify-end mb-1">
                    <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full
                      ${isToday ? 'bg-red-500 text-white' : 'text-slate-600'}
                    `}>
                      {cell.day}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {events.slice(0, 2).map((ev, i) => (
                      <div key={i} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded truncate ${TYPE_STYLE[ev.type].pill}`}>
                        {ev.type} ({events.filter(e => e.type === ev.type).length})
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-[10px] text-slate-400 font-semibold px-1">+{events.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

       
        <div className="w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-black text-slate-800 text-base">
                Selected: {MONTHS[parseInt(selectedDate.split('-')[1]) - 1].slice(0, 3)} {selectedDay}
              </span>
              {selectedDate === todayKey && (
                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Today</span>
              )}
            </div>

            {selectedEvents.length === 0 ? (
              <div className="text-center py-10">
                <CalendarTodayIcon sx={{ fontSize: 36, color: '#cbd5e1' }} />
                <p className="text-slate-400 text-sm mt-2">No bookings on this day</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {selectedEvents.map((ev, i) => (
                  <div key={i} className={`rounded-xl border p-4 ${TYPE_STYLE[ev.type].badge}`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${TYPE_STYLE[ev.type].pill} px-2 py-0.5 rounded-full`}>
                      {ev.type} Trip
                    </span>
                    <p className="font-bold text-slate-800 text-sm mt-2 leading-snug">{ev.title}</p>
                    <div className="flex flex-col gap-1 mt-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CalendarTodayIcon sx={{ fontSize: 13 }} />
                        {selectedDate.replace(/-/g, '/')}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <PeopleIcon sx={{ fontSize: 13 }} />
                        {ev.guests}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <LocationOnIcon sx={{ fontSize: 13 }} />
                        {ev.location}
                      </div>
                    </div>
                    <button className="mt-3 w-full border border-slate-200 rounded-lg py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      View Detail Booking
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
