import { Box, Container, Typography, Grid, Avatar } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import Card from '../components/Card.tsx'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import GroupsIcon from '@mui/icons-material/Groups'
import PlaceIcon from '@mui/icons-material/Place'
import StarIcon from '@mui/icons-material/Star'

const team = [
  { name: 'Ashan Perera', role: 'Founder & Lead Guide', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop' },
  { name: 'Nimali Silva', role: 'Travel Curator', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop' },
  { name: 'Roshan Fernando', role: 'Wildlife Expert', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop' },
]

const stats = [
  { icon: <GroupsIcon sx={{ fontSize: 32, color: '#fb5b52' }} />, num: '5,000+', label: 'Happy Travelers' },
  { icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#fb5b52' }} />, num: '15+', label: 'Years Experience' },
  { icon: <PlaceIcon sx={{ fontSize: 32, color: '#fb5b52' }} />, num: '50+', label: 'Destinations' },
  { icon: <StarIcon sx={{ fontSize: 32, color: '#fb5b52' }} />, num: '4.9★', label: 'Average Rating' },
]

function About() {
  return (
    <Box sx={{
      pt: '80px', minHeight: '100vh',
      background: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
          : 'linear-gradient(160deg, #fff1f0 0%, #fff5f5 50%, #fff1f0 100%)',
    }}>


      <Box sx={{ position: 'relative', height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Box component="img" src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600&auto=format&fit=crop" alt="About"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)' }} />
        <Box sx={{
          position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          background: 'rgba(0,0,0,0.3)', px: { xs: 4, md: 8 }, py: { xs: 4, md: 6 }, borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.2)', maxWidth: '90%',
        }}>
          <Typography variant="h3" fontWeight={900} mb={1} sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>About Us</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>Passionate about Sri Lanka since 2010</Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>


        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center" mb={12}>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" sx={{ color: '#fb5b52', fontWeight: 700, letterSpacing: 3 }}>Our Story</Typography>
            <Typography variant="h4" fontWeight={900} color="text.primary" mt={1} mb={3} sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
              Born from a Love of the Island
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.9, mb: 3 }}>
              TourXPro was founded by a group of local travel enthusiasts who wanted to share the true beauty of their homeland with the world. We go beyond the tourist trail to show you the real Sri Lanka.
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
              From the ancient rock fortress of Sigiriya to the whale-watching waters off Mirissa, we craft journeys that leave lasting memories.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="img"
              src="https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&auto=format&fit=crop"
              alt="Sigiriya"
              sx={{ width: '100%', height: { xs: 250, md: 400 }, objectFit: 'cover', borderRadius: 6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            />
          </Grid>
        </Grid>


        <Grid container spacing={3} mb={12}>
          {stats.map(s => (
            <Grid item xs={6} md={3} key={s.label}>
              <Card hover sx={{ p: { xs: 2, md: 4 }, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>{s.icon}</Box>
                <Typography variant="h4" fontWeight={900} sx={{ color: '#fb5b52', mt: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>{s.num}</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5} sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>{s.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>


        <Box textAlign="center" mb={6}>
          <Typography variant="overline" sx={{ color: '#fb5b52', fontWeight: 700, letterSpacing: 3 }}>The Team</Typography>
          <Typography variant="h4" fontWeight={800} color="text.primary" mt={1}>Meet Your Guides</Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {team.map(m => (
            <Grid item xs={12} sm={4} key={m.name}>
              <Card hover sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Avatar src={m.img} alt={m.name} sx={{ width: 100, height: 100, mx: 'auto', mb: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
                <Typography fontWeight={800} color="text.primary" fontSize={18} mb={0.5}>{m.name}</Typography>
                <Typography variant="body2" sx={{ color: '#fb5b52', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>{m.role}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default About
