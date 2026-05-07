import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../components/Destinations'
import {
  Box, Container, Typography, Grid, Card, CardMedia, CardContent,
  CardActionArea, Chip, Rating, ToggleButtonGroup, ToggleButton,
  InputAdornment, TextField, MenuItem, Select, FormControl, Slider
} from '@mui/material'
import type { Theme } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'

const categories = ['All', 'Heritage', 'Nature', 'Beach', 'Culture', 'Wildlife']
const ratingOptions = [
  { label: 'All', value: 0 },
  { label: '4.0+', value: 4.0 },
  { label: '4.5+', value: 4.5 },
  { label: '4.8+', value: 4.8 },
]
const sortOptions = [
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Rating: Low to High', value: 'rating_asc' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A–Z', value: 'name_asc' },
]

const maxPrice = Math.max(...destinations.map(d => d.price ?? 0))

function DestinationsPage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('rating_desc')
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice])

  const filtered = useMemo(() => {
    return destinations
      .filter(d => category === 'All' || d.category === category)
      .filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.tagline.toLowerCase().includes(search.toLowerCase()))
      .filter(d => d.rating >= minRating)
      .filter(d => (d.price ?? 0) >= priceRange[0] && (d.price ?? maxPrice) <= priceRange[1])
      .sort((a, b) => {
        if (sortBy === 'rating_desc') return b.rating - a.rating
        if (sortBy === 'rating_asc') return a.rating - b.rating
        if (sortBy === 'price_asc') return (a.price ?? 0) - (b.price ?? 0)
        if (sortBy === 'price_desc') return (b.price ?? 0) - (a.price ?? 0)
        if (sortBy === 'name_asc') return a.name.localeCompare(b.name)
        return 0
      })
  }, [category, search, minRating, sortBy, priceRange])

  return (
    <Box sx={{
      pt: '5px', minHeight: '100vh',
      background: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
          : 'linear-gradient(160deg, #fff1f0 0%, #fff5f5 50%, #fff1f0 100%)',
    }}>

      
      <Box sx={{ position: 'relative', height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Box component="img" src="https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=1600&auto=format&fit=crop" alt="Sri Lanka"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)' }} />
        <Box sx={{
          position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          background: 'rgba(0,0,0,0.3)', px: { xs: 4, md: 8 }, py: { xs: 4, md: 6 },
          borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', maxWidth: '90%',
        }}>
          <Typography variant="h3" fontWeight={900} mb={1} sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>Destinations</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>Discover the wonders of Sri Lanka</Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>

        
        <TextField
          fullWidth
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 4,
            '& .MuiOutlinedInput-root': {
              borderRadius: 4,
              bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(8px)',
            }
          }}
        />

        <Box display="flex" justifyContent="center" mb={4}>
          <ToggleButtonGroup
            value={category}
            exclusive
            onChange={(_, val) => val && setCategory(val)}
            sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid #d1d5db !important', borderRadius: '50px !important', mx: 0.5 } }}
          >
            {categories.map(c => (
              <ToggleButton key={c} value={c} sx={{
                px: 3, py: 0.8, fontWeight: 600, textTransform: 'none', fontSize: 13,
                '&.Mui-selected': { bgcolor: '#fb5b52 !important', color: '#fff !important', borderColor: '#fb5b52 !important' },
              }}>
                {c}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box sx={{
          display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'flex-start', mb: 6,
          p: 3, borderRadius: 4,
          bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
          border: (theme: Theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
          backdropFilter: 'blur(8px)',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TuneIcon sx={{ color: '#fb5b52', fontSize: 20 }} />
            <Typography fontWeight={700} fontSize={14} color="text.primary">Filters</Typography>
          </Box>

        
          <Box>
            <Typography fontSize={12} fontWeight={600} color="text.secondary" mb={1}>Min Rating</Typography>
            <Box display="flex" gap={1}>
              {ratingOptions.map(opt => (
                <Box
                  key={opt.value}
                  onClick={() => setMinRating(opt.value)}
                  sx={{
                    px: 2, py: 0.6, borderRadius: '20px', cursor: 'pointer',
                    fontSize: 12, fontWeight: 700, border: '1.5px solid',
                    transition: 'all 0.2s',
                    borderColor: minRating === opt.value ? '#fb5b52' : 'divider',
                    color: minRating === opt.value ? '#fff' : 'text.secondary',
                    bgcolor: minRating === opt.value ? '#fb5b52' : 'transparent',
                  }}
                >
                  {opt.label}
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ minWidth: 200, flex: 1 }}>
            <Typography fontSize={12} fontWeight={600} color="text.secondary" mb={1}>
              Price Range: ${priceRange[0]} – ${priceRange[1]}
            </Typography>
            <Slider
              value={priceRange}
              onChange={(_, val) => setPriceRange(val as number[])}
              min={0}
              max={maxPrice}
              step={10}
              sx={{ color: '#fb5b52', mt: 1 }}
            />
          </Box>

          
          <Box sx={{ minWidth: 200 }}>
            <Typography fontSize={12} fontWeight={600} color="text.secondary" mb={1}>Sort By</Typography>
            <FormControl size="small" fullWidth>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{ borderRadius: 2, fontSize: 13 }}
              >
                {sortOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>{opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

    
        <Typography fontSize={13} color="text.secondary" mb={3} fontWeight={600}>
          {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
        </Typography>

   
        {filtered.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Typography variant="h6" color="text.secondary" fontWeight={700}>No destinations match your filters.</Typography>
            <Typography fontSize={14} color="text.secondary" mt={1}>Try adjusting your search or filters.</Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filtered.map(dest => (
              <Grid item xs={12} sm={6} md={4} key={dest.id}>
                <Card elevation={0} sx={{
                  borderRadius: 6, overflow: 'hidden', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  background: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                  border: (theme: Theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.75)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { boxShadow: '0 20px 40px rgba(0,0,0,0.15)', transform: 'translateY(-8px)' },
                }}>
                  <CardActionArea component={Link} to={`/destinations/${dest.id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                    <Box sx={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                      <CardMedia component="img" image={dest.image} alt={dest.name}
                        sx={{ height: '100%', transition: 'transform 0.6s', '&:hover': { transform: 'scale(1.1)' } }} />
                      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                        <Chip label={dest.category} size="small" sx={{ bgcolor: '#fb5b52', color: '#fff', fontWeight: 800, fontSize: 11, borderRadius: 2 }} />
                      </Box>
                      {dest.price && (
                        <Box sx={{
                          position: 'absolute', top: 16, right: 16,
                          bgcolor: 'rgba(0,0,0,0.6)', color: '#fff',
                          px: 1.5, py: 0.5, borderRadius: 2, fontSize: 12, fontWeight: 800,
                          backdropFilter: 'blur(4px)',
                        }}>
                          From ${dest.price}
                        </Box>
                      )}
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
        )}
      </Container>
    </Box>
  )
}

export default DestinationsPage
