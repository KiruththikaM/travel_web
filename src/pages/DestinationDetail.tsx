import { useParams, Link } from 'react-router-dom'
import { destinations } from '../components/Destinations'
import type { Destination } from '../types'
import { Box, Container, Typography, Chip, Grid, Divider } from '@mui/material'
import Button from '../components/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnIcon from '@mui/icons-material/LocationOn'



const fallbackGallery = [
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop"
];

function DestinationDetail() {
  const { id } = useParams()
  const dest: Destination | undefined = destinations.find(d => d.id === id)

  if (!dest) return (
    <Box sx={{ pt: 16, textAlign: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Typography variant="h5" color="text.secondary">Destination not found.</Typography>
      <Button component={Link} to="/destinations" sx={{ mt: 2, color: '#fb5b52' }}>← Back to Destinations</Button>
    </Box>
  )

  return (
    <Box sx={{ pt: { xs: '90px', md: '110px' }, pb: 12, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg">


        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/destinations"
          sx={{
            mb: 3, color: 'text.secondary', textTransform: 'none', fontWeight: 600,
            '&:hover': { color: '#fb5b52', bgcolor: 'transparent' }
          }}
        >
          View all destinations
        </Button>


        <Box sx={{
          height: { xs: 300, sm: 450, md: 500, lg: 600 },
          mb: 6,
          display: 'flex',
          gap: 1.5
        }}>

          <Box sx={{
            flex: { xs: 1, md: 2.5 },
            height: '100%',
            overflow: 'hidden',
            borderRadius: { xs: 6, md: 8 },
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <Box component="img" src={dest.image} alt={dest.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { transform: 'scale(1.08)' } }} />
          </Box>
          <Box sx={{
            flex: 1,
            height: '100%',
            display: { xs: 'none', md: 'grid' },
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 1.5
          }}>
            {(dest.gallery ?? fallbackGallery).map((imgSrc, i) => (
              <Box key={i} sx={{ overflow: 'hidden', borderRadius: 4 }}>
                <Box component="img" src={imgSrc} alt={`${dest.name} gallery ${i + 1}`} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', '&:hover': { transform: 'scale(1.1)' } }} />
              </Box>
            ))}
          </Box>
        </Box>


        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid item xs={12} md={8}>


            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Chip
                icon={<LocationOnIcon />}
                label={`${dest.name}, Sri Lanka`}
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  px: 1.5, py: 3,
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderColor: 'divider',
                  '& .MuiChip-icon': { color: '#fb5b52' }
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" fontWeight="bold" color="text.primary">Superb Quality</Typography>
                  <Typography variant="caption" color="text.secondary">Based on 420 reviews</Typography>
                </Box>
                <Box sx={{
                  bgcolor: '#fb5b52', color: '#fff',
                  width: 48, height: 48, borderRadius: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(251, 91, 82, 0.3)'
                }}>
                  {dest.rating}
                </Box>
              </Box>
            </Box>


            <Typography variant="h3" fontWeight={900} color="text.primary" mb={4} sx={{ fontSize: { xs: '2rem', md: '3.5rem' } }}>
              {dest.category} in {dest.name}
            </Typography>

            <Divider sx={{ mb: 5 }} />


            <Typography
              color="text.secondary"
              sx={{ lineHeight: 2, fontSize: '1.15rem', mb: 6 }}
            >
              {dest.description} Explore amazing scenic views and unique adventures natively crafted for comfort and memorable experiences. {dest.tagline} guarantees top-tier relaxation away from the bustling city.
            </Typography>

          </Grid>


          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 5,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 6,
              boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 20px 60px rgba(0,0,0,0.4)' : '0 10px 40px rgba(0,0,0,0.05)',
              position: { xs: 'static', md: 'sticky' },
              top: 100,
              background: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(16px)',
            }}>
              <Typography variant="h5" fontWeight={900} mb={1}>Book your stay</Typography>
              <Typography variant="body2" color="text.secondary" mb={4} sx={{ fontSize: '1rem' }}>Secure your spot in paradise before it fills up.</Typography>

              <Button
                component={Link}
                to={`/book/${dest.id}`}
                onClick={(e: React.MouseEvent) => {
                  if (!localStorage.getItem("loggedInUser")) {
                    e.preventDefault();
                    window.dispatchEvent(new Event("openLogin"));
                  }
                }}
                variant="contained"
                fullWidth
                sx={{
                  py: 2, fontSize: '1.15rem', fontWeight: 800, bgcolor: '#fb5b52',
                  boxShadow: 'none',
                  borderRadius: 3,
                  '&:hover': { bgcolor: '#e04a42' },
                }}
              >
                Reserve Now
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}

export default DestinationDetail
