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
  { icon: <GroupsIcon sx={{ fontSize: 32, color: '#fb5b52' }} />, num: '45K+', label: 'Happy Travellers' },
  { icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#fb5b52' }} />, num: '1,500+', label: 'Trips Sold' },
  { icon: <PlaceIcon sx={{ fontSize: 32, color: '#fb5b52' }} />, num: '60+', label: 'Destinations' },
  { icon: <StarIcon sx={{ fontSize: 32, color: '#fb5b52' }} />, num: '150+', label: 'Travel Buddies' },
]

function About() {
  return (
    <Box sx={{
      pt: '5px', minHeight: '100vh',
      background: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
          : '#f9f9f9',
    }}>

      
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
        minHeight: { xs: 'auto', md: 420 },
        overflow: 'hidden',
      }}>
        
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&auto=format&fit=crop"
          alt="Group of travellers"
          sx={{
            width: '100%',
            height: { xs: 220, md: '100%' },
            objectFit: 'cover',
            display: { xs: 'none', md: 'block' },
          }}
        />

        
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          px: { xs: 4, md: 6 },
          py: { xs: 6, md: 8 },
          background: (theme: Theme) =>
            theme.palette.mode === 'dark' ? '#1e293b' : '#fff',
        }}>
          <Typography
            variant="overline"
            sx={{ color: '#fb5b52', fontWeight: 700, letterSpacing: 3, mb: 1 }}
          >
            WHO WE ARE
          </Typography>
          <Typography
            variant="h4"
            fontWeight={900}
            color="text.primary"
            mb={2}
            sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, lineHeight: 1.2 }}
          >
            The Ultimate Travel Experience
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.9, mb: 3, fontSize: '0.95rem' }}>
            TourXPro is a dynamic travel company dedicated to crafting unforgettable experiences for adventurers, explorers, and vacationers alike. With a passion for personalized service and a commitment to excellence, TourXPro specializes in curating bespoke travel itineraries tailored to individual preferences and interests.
          </Typography>
          <Box
            component="button"
            sx={{
              bgcolor: '#fb5b52',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              px: 3,
              py: 1.2,
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              '&:hover': { bgcolor: '#e04840' },
            }}
          >
            Read more
          </Box>
        </Box>

        
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop"
          alt="Couple travelling"
          sx={{
            width: '100%',
            height: { xs: 220, md: '100%' },
            objectFit: 'cover',
            display: { xs: 'none', md: 'block' },
          }}
        />
      </Box>

      
      <Box sx={{
        background: (theme: Theme) =>
          theme.palette.mode === 'dark' ? '#0f172a' : '#fff',
        py: { xs: 5, md: 7 },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {stats.map(s => (
              <Grid item xs={6} md={3} key={s.label} sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>{s.icon}</Box>
                <Typography
                  variant="h4"
                  fontWeight={900}
                  color="text.primary"
                  sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}
                >
                  {s.num}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {s.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
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
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&auto=format&fit=crop"
              alt="Sigiriya"
              sx={{ width: '100%', height: { xs: 250, md: 400 }, objectFit: 'cover', borderRadius: 6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            />
          </Grid>
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
