import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/Store'
import { fetchDestinations } from '../store/slices/destinationsSlice'
import { Card, CardMedia, CardContent, CardActionArea, Chip, Rating, Typography, Box, Container } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import Button from './Button'
import type { Destination } from '../types'


const categoryColors: Record<string, 'success' | 'primary' | 'info' | 'warning' | 'secondary'> = {
  Heritage: 'warning',
  Nature: 'success',
  Beach: 'info',
  Culture: 'secondary',
  Wildlife: 'primary',
}

function Destinations() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: destinations, status } = useSelector((state: RootState) => state.destinations)
  const [hover, setHover] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'idle' && destinations.length === 0) dispatch(fetchDestinations())
  }, [dispatch, status, destinations.length])

  return (
    <Box sx={{
      py: 12,
      background: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #fff5f5 0%, #fff1f0 100%)',
    }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography variant="overline" sx={{ color: '#fb5b52', fontWeight: 700, letterSpacing: 3 }}>
            Explore
          </Typography>
          <Typography variant="h3" fontWeight={800} color="text.primary" mt={1} mb={2}>
            Popular Destinations
          </Typography>
          <Typography color="text.secondary" maxWidth={480} mx="auto">
            From ancient ruins to tropical beaches — Sri Lanka has it all.
          </Typography>
        </Box>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map(dest => (
            <div key={dest.id}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 6, overflow: 'hidden', transition: 'all 0.3s', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  background: (theme: Theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: (theme: Theme) =>
                    theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.75)',
                  boxShadow: hover === dest.id ? '0 20px 40px rgba(0,0,0,0.15)' : '0 4px 16px rgba(0,0,0,0.06)',
                  transform: hover === dest.id ? 'translateY(-6px)' : 'none',
                }}
                onMouseEnter={() => setHover(dest.id)}
                onMouseLeave={() => setHover(null)}
              >
                <CardActionArea component={Link} to={`/destinations/${dest.id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: 240 }}>
                    <CardMedia
                      component="img"
                      image={dest.image}
                      alt={dest.name}
                      sx={{
                        height: '100%',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: hover === dest.id ? 'scale(1.1)' : 'scale(1)',
                      }}
                    />
                    <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                      <Chip
                        label={dest.category}
                        size="small"
                        color={categoryColors[dest.category] || 'default'}
                        sx={{ fontWeight: 800, fontSize: 11, borderRadius: 2 }}
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Box>
                        <Typography variant="h6" fontWeight={800} color="text.primary" sx={{ lineHeight: 1.2 }}>{dest.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#fb5b52', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{dest.tagline}</Typography>
                      </Box>
                      <Rating value={dest.rating} precision={0.1} readOnly size="small" sx={{ mt: 0.5 }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" mt={1.5} sx={{ lineHeight: 1.7, mb: 3 }}>
                      {dest.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fb5b52', fontWeight: 800, mt: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                      Explore Destination <span>→</span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </div>

        <Box textAlign="center" mt={6}>
          <Button
            component={Link}
            to="/destinations"
            variant="outlined"
            size="large"
            pill
            sx={{
              px: 5,
            }}
          >
            View All Destinations
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Destinations
