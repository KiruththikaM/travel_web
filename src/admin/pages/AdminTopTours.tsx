import AdminLayout from '../components/AdminLayout'
import { Box, Typography, Rating } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/Store'
import { fetchDestinations } from '../../store/slices/destinationsSlice'
import { fetchBookings } from '../../store/slices/bookingsSlice'
import { useEffect } from 'react'

function AdminTopTours() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: destinations, status: destStatus } = useSelector((state: RootState) => state.destinations)
  const { items: bookings, status: bookStatus } = useSelector((state: RootState) => state.bookings)

  useEffect(() => {
    if (destStatus === 'idle' && destinations.length === 0) dispatch(fetchDestinations())
    if (bookStatus === 'idle' && bookings.length === 0) dispatch(fetchBookings())
  }, [dispatch, destStatus, bookStatus, destinations.length, bookings.length])

  
  const bookingCounts: Record<string, number> = {}
  bookings.forEach(b => {
    const key = b.destinationName ?? b.destination ?? ''
    if (key) bookingCounts[key] = (bookingCounts[key] ?? 0) + 1
  })

 
  const ranked = [...destinations]
    .map(d => ({ ...d, bookings: bookingCounts[d.name] ?? 0 }))
    .sort((a, b) => b.rating - a.rating || b.bookings - a.bookings)

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 900, color: 'text.primary' }}>Top Tours</Typography>
        <Typography sx={{ color: 'text.secondary', mt: 0.5, fontSize: 14 }}>
          Best performing destinations ranked by rating and bookings
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {ranked.map((dest, i) => (
          <Box key={dest.id} sx={{
            display: 'flex', alignItems: 'center', gap: 3,
            p: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: 'box-shadow 0.2s',
            '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
          }}>
            
            <Box sx={{
              width: 36, height: 36, borderRadius: 2, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 15,
              bgcolor: i === 0 ? '#fb5b52' : i === 1 ? '#f59e0b' : i === 2 ? '#6366f1' : 'action.hover',
              color: i < 3 ? '#fff' : 'text.secondary',
            }}>
              #{i + 1}
            </Box>

           
            <Box
              component="img"
              src={dest.image}
              alt={dest.name}
              sx={{ width: 64, height: 52, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
            />

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 15, color: 'text.primary' }}>{dest.name}</Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.3 }}>{dest.location}</Typography>
              <Rating value={dest.rating} precision={0.1} readOnly size="small" sx={{ mt: 0.5 }} />
            </Box>

           
            <Box sx={{
              px: 2, py: 0.5, borderRadius: 3, fontSize: 11, fontWeight: 700,
              bgcolor: 'rgba(251,91,82,0.1)', color: '#fb5b52',
              display: { xs: 'none', sm: 'block' },
            }}>
              {dest.category}
            </Box>

          
            <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 900, color: 'text.primary' }}>
                {dest.bookings}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'text.secondary', fontWeight: 600 }}>bookings</Typography>
            </Box>

           
            <Box sx={{ textAlign: 'right', flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
              <Typography sx={{ fontSize: 16, fontWeight: 900, color: '#10b981' }}>
                ${dest.price}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'text.secondary', fontWeight: 600 }}>per person</Typography>
            </Box>
          </Box>
        ))}

        {ranked.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10, color: 'text.secondary' }}>
            <Typography fontWeight={700}>No destinations found.</Typography>
          </Box>
        )}
      </Box>
    </AdminLayout>
  )
}

export default AdminTopTours
