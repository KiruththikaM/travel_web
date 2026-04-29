import { useState } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../components/Destinations'
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Chip, Rating, ToggleButtonGroup, ToggleButton } from '@mui/material'
import type { Theme } from '@mui/material/styles'

const categories = ['All', 'Heritage', 'Nature', 'Beach', 'Culture', 'Wildlife']

function DestinationsPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? destinations : destinations.filter(d => d.category === active)

  return (
    <Box sx={{
      pt: '80px', minHeight: '100vh',
      background: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
          : 'linear-gradient(160deg, #fff1f0 0%, #fff5f5 50%, #fff1f0 100%)',
    }}>
  
      <Box sx={{ position: 'relative', height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=1600&auto=format&fit=crop"
          alt="Sri Lanka"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)' }} />
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          background: 'rgba(0,0,0,0.3)', px: { xs: 4, md: 8 }, py: { xs: 4, md: 6 }, borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.2)', maxWidth: '90%',
        }}>
          <Typography variant="h3" fontWeight={900} mb={1} sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>Destinations</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>Discover the wonders of Sri Lanka</Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        
        <Box display="flex" justifyContent="center" mb={6}>
          <ToggleButtonGroup
            value={active}
            exclusive
            onChange={(_, val) => val && setActive(val)}
            sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid #d1d5db !important', borderRadius: '50px !important', mx: 0.5 } }}
          >
            {categories.map(c => (
              <ToggleButton
                key={c}
                value={c}
                sx={{
                  px: 3, py: 0.8, fontWeight: 600, textTransform: 'none', fontSize: 13,
                  '&.Mui-selected': { bgcolor: '#fb5b52 !important', color: '#fff !important', borderColor: '#fb5b52 !important' },
                }}
              >
                {c}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={4}>
          {filtered.map(dest => (
            <Grid item xs={12} sm={6} md={4} key={dest.id}>
              <Card elevation={0} sx={{
                borderRadius: 6, overflow: 'hidden', height: '100%',
                display: 'flex', flexDirection: 'column',
                background: (theme: Theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: (theme: Theme) =>
                  theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.75)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { boxShadow: '0 20px 40px rgba(0,0,0,0.15)', transform: 'translateY(-8px)' },
              }}>
                <CardActionArea component={Link} to={`/destinations/${dest.id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                  <Box sx={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                    <CardMedia component="img" image={dest.image} alt={dest.name} sx={{ height: '100%', transition: 'transform 0.6s', '&:hover': { transform: 'scale(1.1)' } }} />
                    <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                      <Chip label={dest.category} size="small" sx={{ bgcolor: '#fb5b52', color: '#fff', fontWeight: 800, fontSize: 11, borderRadius: 2 }} />
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Box>
                        <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.2 }}>{dest.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#fb5b52', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{dest.tagline}</Typography>
                      </Box>
                      <Rating value={dest.rating} precision={0.1} readOnly size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" mt={1.5} sx={{ lineHeight: 1.8 }}>
                      {dest.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fb5b52', fontWeight: 800, mt: 'auto', pt: 3 }}>
                      View Adventure →
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default DestinationsPage
