import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import type { RootState } from '../store/Store'
import type { UserBooking } from '../types'
import {
  Box, Container, Typography, Avatar, Chip, Divider, Grid, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material'
import type { Theme } from '@mui/material/styles'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PeopleIcon from '@mui/icons-material/People'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import Button from '../components/Button'

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  Pending:   { bg: 'rgba(245,158,11,0.1)',  color: '#d97706', border: 'rgba(245,158,11,0.3)' },
  Confirmed: { bg: 'rgba(16,185,129,0.1)',  color: '#059669', border: 'rgba(16,185,129,0.3)' },
  Cancelled: { bg: 'rgba(239,68,68,0.1)',   color: '#dc2626', border: 'rgba(239,68,68,0.3)'  },
}

function Profile() {
  const user = useSelector((state: RootState) => state.auth.user)

  if (!user) return <Navigate to="/" replace />

  const [bookings, setBookings] = useState<UserBooking[]>(() => {
    const key = `bookings_${user.email}`
    return JSON.parse(localStorage.getItem(key) || '[]')
  })
  const [cancelTarget, setCancelTarget] = useState<UserBooking | null>(null)

  const handleCancel = useCallback(() => {
    if (!cancelTarget || !user) return
    const key = `bookings_${user.email}`
    const updated = bookings.map(b =>
      b.id === cancelTarget.id ? { ...b, status: 'Cancelled' as const } : b
    )
    localStorage.setItem(key, JSON.stringify(updated))
    setBookings(updated)
    setCancelTarget(null)
    window.dispatchEvent(new CustomEvent('bookingUpdated'))
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Booking cancelled successfully.', severity: 'info' } }))
  }, [cancelTarget, bookings, user])

  const handleConfirm = useCallback((id: string) => {
    if (!user) return
    const key = `bookings_${user.email}`
    const updated = bookings.map(b =>
      b.id === id ? { ...b, status: 'Confirmed' as const } : b
    )
    localStorage.setItem(key, JSON.stringify(updated))
    setBookings(updated)
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Booking confirmed!', severity: 'success' } }))
  }, [bookings, user])

  const handleRemove = useCallback((id: string) => {
    if (!user) return
    const key = `bookings_${user.email}`
    const updated = bookings.filter(b => b.id !== id)
    localStorage.setItem(key, JSON.stringify(updated))
    setBookings(updated)
    window.dispatchEvent(new CustomEvent('bookingUpdated'))
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Booking removed.', severity: 'success' } }))
  }, [bookings, user])

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const stats = [
    { label: 'Total Trips', value: bookings.length, icon: <FlightTakeoffIcon sx={{ fontSize: 22, color: '#fb5b52' }} /> },
    { label: 'Confirmed',   value: bookings.filter(b => b.status === 'Confirmed').length,  icon: <CalendarMonthIcon sx={{ fontSize: 22, color: '#10b981' }} /> },
    { label: 'Pending',     value: bookings.filter(b => b.status === 'Pending').length,    icon: <PeopleIcon sx={{ fontSize: 22, color: '#f59e0b' }} /> },
    { label: 'Total Spent', value: `$${bookings.reduce((s, b) => s + b.total, 0).toLocaleString()}`, icon: <AttachMoneyIcon sx={{ fontSize: 22, color: '#6366f1' }} /> },
  ]

  return (
    <div className=''>
    <Box sx={{
      pt: '30px', minHeight: '100vh',
      background: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
          : 'linear-gradient(160deg, #fff1f0 0%, #fff5f5 50%, #fff1f0 100%)',
    }}>

     
      <Box sx={{
        position: 'relative', height: 100, overflow: 'hidden',
        background: 'linear-gradient(135deg, #fc8e88 0%, #d5342c 50%, #ead0cd 100%)',
      }}>
        <Box sx={{
          position: 'absolute', inset: 0, opacity: 0.08,
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', mt: -8, pb: 12 }}>


        <Paper elevation={0} sx={{
          p: { xs: 3, md: 5 }, borderRadius: 6, mb: 6,
          background: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(30,41,59,0.8)' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Avatar sx={{
              width: 80, height: 80, fontSize: 28, fontWeight: 900,
              background: 'linear-gradient(135deg, #fb5b52, #e04a42)',
              boxShadow: '0 8px 24px rgba(251,91,82,0.35)',
              border: '4px solid',
              borderColor: 'background.paper',
            }}>
              {initials}
            </Avatar>
            <Box flex={1}>
              <Typography variant="h5" fontWeight={900} color="text.primary">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>{user.email}</Typography>
              <Chip label="Traveler" size="small" sx={{ mt: 1, bgcolor: 'rgba(251,91,82,0.1)', color: '#fb5b52', fontWeight: 700, fontSize: 11 }} />
            </Box>
            <Button component={Link} to="/destinations" variant="contained"
              sx={{ bgcolor: '#fb5b52', '&:hover': { bgcolor: '#e04a42' }, fontWeight: 700, borderRadius: 3, px: 3 }}>
              Book New Trip
            </Button>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={3}>
            {stats.map(s => (
              <Grid item xs={6} md={3} key={s.label}>
                <Box sx={{
                  p: 2.5, borderRadius: 4, textAlign: 'center',
                  background: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(251,91,82,0.04)',
                  border: '1px solid',
                  borderColor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(251,91,82,0.1)',
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>{s.icon}</Box>
                  <Typography variant="h5" fontWeight={900} color="text.primary">{s.value}</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>{s.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

       
        <Typography variant="h5" fontWeight={900} color="text.primary" mb={3}>
          Booking History
        </Typography>

        {bookings.length === 0 ? (
          <Paper elevation={0} sx={{
            p: { xs: 6, md: 10 }, textAlign: 'center', borderRadius: 6,
            background: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(30,41,59,0.5)' : 'rgba(255,255,255,0.7)',
            border: '1px solid', borderColor: 'divider',
          }}>
            <FlightTakeoffIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" fontWeight={700} color="text.secondary">No bookings yet</Typography>
            <Typography variant="body2" color="text.disabled" mt={1} mb={4}>
              Your travel history will appear here once you book a trip.
            </Typography>
            <Button component={Link} to="/destinations" variant="contained"
              sx={{ bgcolor: '#fb5b52', '&:hover': { bgcolor: '#e04a42' }, fontWeight: 700, borderRadius: 3, px: 4 }}>
              Explore Destinations
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {bookings.map(b => (
              <Paper key={b.id} elevation={0} sx={{
                borderRadius: 5, overflow: 'hidden',
                background: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(16px)',
                border: '1px solid', borderColor: 'divider',
                transition: 'all 0.3s',
                '&:hover': { boxShadow: '0 12px 32px rgba(0,0,0,0.1)', transform: 'translateY(-2px)' },
              }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>

                  
                  <Box sx={{
                    width: { xs: '100%', sm: 180 }, height: { xs: 160, sm: 'auto' },
                    flexShrink: 0, overflow: 'hidden',
                  }}>
                    <Box component="img" src={b.destinationImage} alt={b.destinationName}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', '&:hover': { transform: 'scale(1.08)' } }} />
                  </Box>

                  
                  <Box sx={{ p: { xs: 3, md: 4 }, flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                      <Box>
                        <Typography variant="h6" fontWeight={900} color="text.primary">{b.destinationName}</Typography>
                        <Chip label={b.destinationCategory} size="small"
                          sx={{ mt: 0.5, bgcolor: 'rgba(251,91,82,0.1)', color: '#fb5b52', fontWeight: 700, fontSize: 10 }} />
                      </Box>
                      <Box sx={{
                        px: 2, py: 0.6, borderRadius: 3, fontSize: 12, fontWeight: 800,
                        border: '1.5px solid',
                        bgcolor: statusColors[b.status]?.bg,
                        color: statusColors[b.status]?.color,
                        borderColor: statusColors[b.status]?.border,
                      }}>
                        {b.status}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                        <CalendarMonthIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                          {b.checkIn} → {b.checkOut}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                        <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                          {b.guests} guest{b.guests > 1 ? 's' : ''}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1 }}>
                      <Box>
                        <Typography variant="caption" color="text.disabled">Booking ID: {b.id}</Typography>
                        <Typography variant="caption" color="text.disabled" sx={{ display: 'block' }}>
                          Booked on {new Date(b.bookedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {b.status === 'Pending' && (
                          <Button
                            size="small"
                            onClick={() => handleConfirm(b.id)}
                            sx={{
                              color: '#059669', fontWeight: 700, fontSize: 12,
                              border: '1.5px solid rgba(16,185,129,0.3)',
                              borderRadius: 3, px: 2,
                              '&:hover': { bgcolor: 'rgba(16,185,129,0.08)', borderColor: '#059669' },
                            }}
                          >
                            ✓ Confirm
                          </Button>
                        )}
                        {b.status !== 'Cancelled' && (
                          <Button
                            size="small"
                            startIcon={<CancelOutlinedIcon />}
                            onClick={() => setCancelTarget(b)}
                            sx={{
                              color: '#dc2626', fontWeight: 700, fontSize: 12,
                              border: '1.5px solid rgba(239,68,68,0.3)',
                              borderRadius: 3, px: 2,
                              '&:hover': { bgcolor: 'rgba(239,68,68,0.08)', borderColor: '#dc2626' },
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                        {b.status === 'Cancelled' && (
                          <Button
                            size="small"
                            onClick={() => handleRemove(b.id)}
                            sx={{
                              color: 'text.secondary', fontWeight: 700, fontSize: 12,
                              border: '1.5px solid',
                              borderColor: 'divider',
                              borderRadius: 3, px: 2,
                              '&:hover': { bgcolor: 'rgba(0,0,0,0.05)', borderColor: 'text.secondary' },
                            }}
                          >
                            Remove
                          </Button>
                        )}
                        <Typography variant="h6" fontWeight={900} color="#fb5b52">${b.total.toLocaleString()}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Container>

      
      <Dialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        PaperProps={{ sx: { borderRadius: 4, p: 1, maxWidth: 420 } }}
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
          <CancelOutlinedIcon sx={{ fontSize: 48, color: '#dc2626', mb: 1 }} />
          <Typography variant="h6" fontWeight={900}>Cancel Booking?</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 1 }}>
          <Typography color="text.secondary">
            Are you sure you want to cancel your trip to{' '} 
            <Box component="span" fontWeight={800} color="text.primary">{cancelTarget?.destinationName}</Box>?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3, px: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setCancelTarget(null)}
            sx={{ borderRadius: 3, px: 3, fontWeight: 700 }}
          >
            Keep Booking
          </Button>
          <Button 
            variant="contained"
            onClick={handleCancel}
            sx={{ borderRadius: 3, px: 3, fontWeight: 700, bgcolor: '#dc2626', '&:hover': { bgcolor: '#b91c1c' } }}
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </div>
  )
}

export default Profile
