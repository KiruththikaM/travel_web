import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardMedia, CardContent, CardActionArea, Chip, Rating, Typography, Box, Container } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import Button from './Button'
import type { Destination } from '../types'

export const destinations: Destination[] = [
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    tagline: 'The Lion Rock Fortress',
    description: 'A UNESCO World Heritage Site rising 200m above the jungle — ancient frescoes, water gardens, and breathtaking views.',
    image: 'https://t3.ftcdn.net/jpg/04/72/15/84/360_F_472158460_EEZxYRnfbPVQHR1NGjkvgZKfiSsWnCri.jpg',
    category: 'Heritage',
    rating: 4.9,
    price: 120,
    gallery: [
      'https://images.unsplash.com/photo-1601823984263-2f75fc56cde2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'ella',
    name: 'Ella',
    tagline: 'Hill Country Paradise',
    description: 'Misty mountains, tea plantations, the iconic Nine Arch Bridge, and the most scenic train ride in the world.',
    image: 'https://suhadabliss.com/wp-content/uploads/2025/06/Nine-Arch.jpg',
    category: 'Nature',
    rating: 4.8,
    price: 95,
    gallery: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    tagline: 'Whale Watching Capital',
    description: 'Pristine crescent beach, whale watching tours, surf breaks, and stunning sunsets over the Indian Ocean.',
    image: 'https://images.squarespace-cdn.com/content/v1/596b2969d2b85786e6892853/1531738844396-H040L4I7S80ZGQV196K4/DJI_0780.jpg?format=1500w',
    category: 'Beach',
    rating: 4.7,
    price: 80,
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'kandy',
    name: 'Kandy',
    tagline: 'Cultural Capital',
    description: 'Home to the sacred Temple of the Tooth Relic, surrounded by misty hills and the beautiful Kandy Lake.',
    image: 'https://www.srilankainstyle.com/storage/app/media/uploaded-files/7-reasons-to-visit-kandy-in-sri-lanka-slider-1.jpg',
    category: 'Culture',
    rating: 4.8,
    price: 110,
    gallery: [
      'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'galle',
    name: 'Galle Fort',
    tagline: 'Colonial Charm',
    description: 'A 16th-century Dutch fort with cobblestone streets, boutique cafes, art galleries, and ocean views.',
    image: 'https://do6raq9h04ex.cloudfront.net/sites/8/2025/08/Why-Galle-Fort-Is-a-Must-Visit-Day-Trip-from-Unawatuna-1050x700-1.jpg',
    category: 'Heritage',
    rating: 4.7,
    price: 75,
    gallery: [
      'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    tagline: 'Wildlife Safari',
    description: 'The highest density of leopards in the world, plus elephants, crocodiles, and hundreds of bird species.',
    image: 'https://www.andbeyond.com/wp-content/uploads/sites/5/sri-lanka-leopard-asian.jpg',
    category: 'Wildlife',
    rating: 4.9,
    price: 150,
    gallery: [
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&auto=format&fit=crop',
    ]
  },
]

const categoryColors: Record<string, 'success' | 'primary' | 'info' | 'warning' | 'secondary'> = {
  Heritage: 'warning',
  Nature: 'success',
  Beach: 'info',
  Culture: 'secondary',
  Wildlife: 'primary',
}

function Destinations() {
  const [hover, setHover] = useState<string | null>(null)

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
