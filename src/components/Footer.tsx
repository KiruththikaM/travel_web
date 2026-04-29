import { Link } from 'react-router-dom'
import { Box, Container, Grid, Typography, Divider } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'

const contactItems = [
  { icon: <LocationOnIcon fontSize="small" />, text: 'Colombo, Sri Lanka' },
  { icon: <PhoneIcon fontSize="small" />, text: '+94 11 234 5678' },
  { icon: <EmailIcon fontSize="small" />, text: 'hello@tourxpro.com' },
]

function Footer() {
  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? '#020617' : '#111827', color: '#9ca3af', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} mb={6}>
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <FlightTakeoffIcon sx={{ color: '#fb5b52', fontSize: '1.5rem', transform: 'rotate(-45deg)' }} />
              <Typography fontWeight={800} color="#fff" fontSize={18}>
                Tour<span style={{ color: '#fb5b52' }}>X</span>Pro
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              Your gateway to the Pearl of the Indian Ocean. Unforgettable experiences await.
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography fontWeight={700} color="#fff" mb={2}>Quick Links</Typography>
            {['Home', 'Destinations', 'About', 'Contact'].map(l => (
              <Box key={l} mb={1}>
                <Link
                  to={l === 'Home' ? '/' : `/${l.toLowerCase()}`}
                  style={{ textDecoration: 'none', color: '#9ca3af', fontSize: 14 }}
                >
                  {l}
                </Link>
              </Box>
            ))}
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography fontWeight={700} color="#fff" mb={2}>Top Destinations</Typography>
            {['Sigiriya', 'Ella', 'Mirissa', 'Kandy', 'Galle Fort'].map(d => (
              <Box key={d} mb={1}>
                <Link
                  to={`/destinations/${d.toLowerCase().replace(' ', '-')}`}
                  style={{ textDecoration: 'none', color: '#9ca3af', fontSize: 14 }}
                >
                  {d}
                </Link>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography fontWeight={700} color="#fff" mb={2}>Contact</Typography>
            {contactItems.map(c => (
              <Box key={c.text} display="flex" alignItems="center" gap={1} mb={1.5}>
                <Box sx={{ color: '#fb5b52', display: 'flex' }}>{c.icon}</Box>
                <Typography variant="body2">{c.text}</Typography>
              </Box>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#1f2937', mb: 3 }} />
        <Typography variant="body2" textAlign="center" color="#6b7280">
          © {new Date().getFullYear()} TourXPro. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
