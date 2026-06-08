import AdminLayout from '../components/AdminLayout'
import { Box, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/Store'
import { fetchBookings } from '../../store/slices/bookingsSlice'
import { useEffect } from 'react'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function AdminAnalytics() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: bookings, status } = useSelector((state: RootState) => state.bookings)

  useEffect(() => {
    if (status === 'idle' && bookings.length === 0) dispatch(fetchBookings())
  }, [dispatch, status, bookings.length])

 
  const revenueByMonth = MONTHS.map((_, i) => {
    const month = String(i + 1).padStart(2, '0')
    return bookings
      .filter(b => b.date?.includes(`-${month}-`) || b.checkIn?.includes(`-${month}-`))
      .reduce((sum, b) => sum + (b.price ?? 0), 0)
  })

  const maxRevenue = Math.max(...revenueByMonth, 1)

 
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length
  const pending = bookings.filter(b => b.status === 'Pending').length
  const cancelled = bookings.filter(b => b.status === 'Cancelled').length
  const total = bookings.length || 1

  const statusData = [
    { label: 'Confirmed', count: confirmed, color: '#10b981', pct: Math.round((confirmed / total) * 100) },
    { label: 'Pending',   count: pending,   color: '#f59e0b', pct: Math.round((pending / total) * 100) },
    { label: 'Cancelled', count: cancelled, color: '#ef4444', pct: Math.round((cancelled / total) * 100) },
  ]

  const totalRevenue = bookings.reduce((s, b) => s + (b.price ?? 0), 0)

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 900, color: 'text.primary' }}>Analytics</Typography>
        <Typography sx={{ color: 'text.secondary', mt: 0.5, fontSize: 14 }}>
          Revenue trends and booking breakdown
        </Typography>
      </Box>

    
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 5 }}>
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: '#10b981' },
          { label: 'Total Bookings', value: total === 1 ? '0' : total, color: '#6366f1' },
          { label: 'Avg. per Booking', value: total > 1 ? `$${Math.round(totalRevenue / (total - 1)).toLocaleString()}` : '$0', color: '#f59e0b' },
        ].map(card => (
          <Box key={card.label} sx={{
            p: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider',
            bgcolor: 'background.paper',
          }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
              {card.label}
            </Typography>
            <Typography sx={{ fontSize: 28, fontWeight: 900, color: card.color, mt: 1 }}>
              {card.value}
            </Typography>
          </Box>
        ))}
      </Box>

      
      <Box sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', mb: 5 }}>
        <Typography sx={{ fontWeight: 800, fontSize: 16, color: 'text.primary', mb: 3 }}>
          Monthly Revenue
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 180 }}>
          {revenueByMonth.map((rev, i) => (
            <Box key={i} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontSize: 10, color: 'text.secondary', fontWeight: 600 }}>
                {rev > 0 ? `$${rev}` : ''}
              </Typography>
              <Box sx={{
                width: '100%',
                height: `${Math.max((rev / maxRevenue) * 140, rev > 0 ? 8 : 2)}px`,
                bgcolor: rev > 0 ? '#fb5b52' : 'divider',
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.5s ease',
              }} />
              <Typography sx={{ fontSize: 10, color: 'text.secondary', fontWeight: 600 }}>
                {MONTHS[i]}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      
      <Box sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Typography sx={{ fontWeight: 800, fontSize: 16, color: 'text.primary', mb: 3 }}>
          Booking Status Breakdown
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {statusData.map(s => (
            <Box key={s.label}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'text.primary' }}>{s.label}</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.count} ({s.pct}%)</Typography>
              </Box>
              <Box sx={{ height: 8, borderRadius: 4, bgcolor: 'action.hover', overflow: 'hidden' }}>
                <Box sx={{ height: '100%', width: `${s.pct}%`, bgcolor: s.color, borderRadius: 4, transition: 'width 0.6s ease' }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default AdminAnalytics
