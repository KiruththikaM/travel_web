import Hero from '../components/Hero'
import Destinations from '../components/Destinations'
import { Link } from 'react-router-dom'
import { Box, Container, Grid, Typography, Paper } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import Button from '../components/Button'
import Card from '../components/Card.tsx'
import LanguageIcon from '@mui/icons-material/Language'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import PetsIcon from '@mui/icons-material/Pets'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'

const highlights = [
  { icon: <LanguageIcon sx={{ fontSize: 40, color: '#d33d34' }} />, title: '8 UNESCO Sites', desc: 'Ancient kingdoms and sacred temples' },
  { icon: <BeachAccessIcon sx={{ fontSize: 40, color: '#d33d34' }} />, title: '1,340 km Coastline', desc: 'Pristine beaches on every shore' },
  { icon: <PetsIcon sx={{ fontSize: 40, color: '#d33d34' }} />, title: 'Rich Wildlife', desc: 'Leopards, elephants, blue whales' },
  { icon: <LocalCafeIcon sx={{ fontSize: 40, color: '#d33d34' }} />, title: 'World-Class Tea', desc: 'Ceylon tea from misty highlands' },
]

const experiences = [
  {
    title: 'Train Through Tea Country',
    image: 'https://lakpura.com/cdn/shop/files/LK7A5300C0-10-E.jpg?v=1765776199&width=1445',
    desc: 'The Kandy to Ella train ride is one of the most scenic journeys on earth.',
  },
  {
    title: 'Ancient Temple Trails',
    image: 'https://www.srilankanexpeditions.com/images/sri-lanka-travel-guide/history-archaeology-sri-lanka/ancient-temple/slider1.jpg',
    desc: 'Walk through 2,000-year-old ruins and sacred Buddhist shrines.',
  },
  {
    title: 'Surf & Beach Life',
    image: 'https://www.luex.com/cms/fileadmin/_processed_/f/3/csm_surf-sri-lanka-article-header_e4d23406e5.jpg',
    desc: 'World-class surf breaks and turquoise waters on the southern coast.',
  },
]

function Home() {
  return (
    <Box>
      <Hero />

      <Box sx={{
        py: 6,
        background: (theme: Theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(135deg, #fff1f0 0%, #fff5f5 100%)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {highlights.map(h => (
              <div key={h.title}>
                <Card hover sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                  <div className="flex justify-center mb-4">{h.icon}</div>
                  <Typography variant="h6" fontWeight={700} color="text.primary" mt={1}>{h.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>{h.desc}</Typography>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Box>

      <Destinations />

      <Box sx={{
        py: 12,
        background: (theme: Theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #fff5f5 0%, #fff1f0 100%)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Box textAlign="center" mb={10}>
            <Typography variant="overline" sx={{ color: '#fb5b52', fontWeight: 700, letterSpacing: 3 }}>
              Experiences
            </Typography>
            <Typography variant="h3" fontWeight={800} color="text.primary" mt={1} sx={{ fontSize: { xs: '2.2rem', md: '3.5rem' } }}>
              Unforgettable Moments
            </Typography>
          </Box>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {experiences.map(e => (
              <div key={e.title} className="group cursor-pointer">
                <Paper elevation={0} sx={{
                  position: 'relative', borderRadius: 6, overflow: 'hidden', height: { xs: 350, md: 450 },
                  transition: 'transform 0.4s ease',
                  '&:hover': { transform: 'translateY(-8px)' },
                  '&:hover img': { transform: 'scale(1.1)' },
                }}>
                  <Box component="img" src={e.image} alt={e.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                  <Box sx={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                  }} />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-black/30 backdrop-blur-md border-t border-white/10 transition-all duration-300 group-hover:backdrop-blur-xl">
                    <Typography variant="h5" fontWeight={800} className="mb-2" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>{e.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.6 }}>{e.desc}</Typography>
                  </div>
                </Paper>
              </div>
            ))}
          </div>
        </div>
      </Box>


      <Box sx={{ position: 'relative', py: 16, overflow: 'hidden' }}>
        <Box component="img"
          src="https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1600&auto=format&fit=crop"
          alt="Sri Lanka"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(6,95,70,0.72)' }} />
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Card sx={{
            p: { xs: 4, md: 6 }, color: '#fff',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}>
            <Typography variant="h3" fontWeight={800} mb={2}>Ready to Explore Sri Lanka?</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, fontSize: 18 }}>
              Let us craft your perfect island adventure.
            </Typography>
            <Button component={Link} to="/contact" variant="contained" size="large" pill
              sx={{ bgcolor: '#fff', color: '#d33d34', fontWeight: 800, px: 6, py: 1.5, fontSize: 16, '&:hover': { bgcolor: '#fff1f0' } }}>
              Start Planning Today
            </Button>
          </Card>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
