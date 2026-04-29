import React, { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { Box, Typography, TextField, Grid, Divider, Alert, Paper, Container } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { destinations } from '../components/Destinations';
import type { Destination } from '../types';
import Button from '../components/Button';

function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dest: Destination | undefined = destinations.find(d => d.id === id);
  const [submitted, setSubmitted] = useState(false);

  if (!dest) return (
    <Box sx={{ pt: 16, textAlign: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Typography variant="h5" color="text.secondary">Destination not found.</Typography>
      <Button onClick={() => navigate('/destinations')} sx={{ mt: 2, color: '#fb5b52' }}>← Back to Destinations</Button>
    </Box>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box sx={{
        pt: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: (theme: Theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #000000 100%)'
          : 'linear-gradient(135deg, #fff1f0 0%, #fef2f2 100%)',
      }}>
        <Paper elevation={24} sx={{
          p: { xs: 4, md: 6 }, textAlign: 'center', maxWidth: 500, mx: 2, borderRadius: 4,
          background: (theme) => theme.palette.mode === 'dark' ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)', border: '1px solid', borderColor: 'divider'
        }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 100, color: '#fb5b52', mb: 3 }} />
          <Typography variant="h4" fontWeight={900} mb={2} color="text.primary">Booking Confirmed!</Typography>
          <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
          <Typography color="text.secondary" mb={4} fontSize="1.1rem">
            You're heading to <Box component="span" fontWeight="bold" color="#fb5b52">{dest.name}</Box>!
            <br /> We've sent a confirmation email with your digital itinerary. Let the countdown begin!
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')} pill sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}>
            Back to Home
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pt: '100px', pb: 12, overflow: 'hidden' }}>
      
      
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box
          component="img"
          src={dest.image}
          sx={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'blur(120px)', opacity: (theme) => theme.palette.mode === 'dark' ? 0.35 : 0.4,
            transform: 'scale(1.2)'
          }}
        />
        <Box sx={{
          position: 'absolute', inset: 0,
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(15,23,42,0.8), rgba(0,0,0,0.95))'
            : 'linear-gradient(180deg, rgba(249,250,251,0.6), rgba(255,241,240,0.95))'
        }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        
        
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 4, color: 'text.secondary', textTransform: 'none', fontWeight: 600, '&:hover': { color: '#fb5b52', bgcolor: 'transparent' } }}
        >
          Back to Details
        </Button>

        <Typography variant="h3" fontWeight={900} mb={5} color="text.primary" sx={{ fontSize: { xs: '2.2rem', md: '3.5rem' } }}>
          Confirm and pay
        </Typography>

        <Grid container spacing={{ xs: 6, lg: 10 }}>
          
         
          <Grid item xs={12} md={7} sx={{ order: { xs: 2, md: 1 } }}>
            
            <Paper elevation={0} sx={{ 
              p: { xs: 3, md: 5 }, borderRadius: 6, 
              background: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(16px)', border: '1px solid', borderColor: 'divider',
              boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
            }}>
              <form onSubmit={handleSubmit}>
              
             
              <Box mb={6}>
                <Typography variant="h5" fontWeight={800} mb={3}>Personal Details</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="First Name" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Last Name" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Email Address" type="email" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Phone Number" type="tel" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                  </Grid>
                </Grid>
              </Box>
 
               <Divider sx={{ mb: 6 }} />
 
               
               <Box mb={6}>
                <Typography variant="h5" fontWeight={800} mb={3}>Trip Dates & Guests</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField required fullWidth label="Check-in Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField required fullWidth label="Check-out Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField required fullWidth label="Guests" type="number" InputProps={{ inputProps: { min: 1 } }} defaultValue={2} variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ mb: 6 }} />

            
              <Box mb={6}>
                <Typography variant="h5" fontWeight={800} mb={3}>Additional Requests</Typography>
                <TextField 
                  fullWidth 
                  label="Special Requirements (Optional)" 
                  multiline rows={4} variant="outlined" 
                  placeholder="Tell us about special occasions, dietary restrictions, etc." 
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
              </Box>
              
              <Divider sx={{ mb: 6 }} />

              <Alert 
                severity="info" 
                icon={<CheckCircleOutlineIcon fontSize="inherit" />}
                sx={{ 
                  mb: 5, borderRadius: 3, p: 2, 
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(251, 91, 82, 0.05)' : 'rgba(251, 91, 82, 0.05)', 
                  color: 'text.primary', border: '1px solid rgba(251, 91, 82, 0.3)'
                }}
              >
                <Typography variant="body1" fontWeight={500}>
                  No payment is required today. We will reach out to finalize the itinerary securely.
                </Typography>
              </Alert>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ 
                  py: 2, fontSize: '1.2rem', fontWeight: 800, bgcolor: '#fb5b52', 
                  boxShadow: 'none', borderRadius: 2,
                  '&:hover': { bgcolor: '#e04a42' } 
                }}
              >
                Request Booking
              </Button>

            </form>
            </Paper>
          </Grid>

          
          <Grid item xs={12} md={5} sx={{ order: { xs: 1, md: 2 } }}>
            <Paper elevation={0} sx={{
              p: { xs: 3, md: 4 }, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 6,
              position: { xs: 'static', md: 'sticky' },
              top: 100,
              background: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
            }}>
              
           
              <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                <Box 
                  component="img" 
                  src={dest.image} 
                  sx={{ width: { xs: 100, sm: 140 }, height: { xs: 80, sm: 110 }, borderRadius: 3, objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 0.5, fontWeight: 800, letterSpacing: 1, fontSize: '0.7rem' }}>
                    {dest.category}
                  </Typography>
                  <Typography variant="h6" fontWeight={900} lineHeight={1.2} sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                    {dest.name}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                    <StarIcon sx={{ fontSize: 16, color: '#fbcc05' }} />
                    <Typography variant="body2" fontWeight="bold">{dest.rating}</Typography>
                    <Typography variant="body2" color="text.secondary">(420 reviews)</Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ mb: 4 }} />

              <Typography variant="h6" fontWeight={800} mb={3}>Price details</Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary" fontWeight={500}>Estimated Base Rate</Typography>
                <Typography fontWeight={700}>$1,200</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary" fontWeight={500}>Service fee</Typography>
                <Typography fontWeight={700} color="#fb5b52">$0 (Waived)</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography color="text.secondary" fontWeight={500} sx={{ textDecoration: 'underline' }}>VAT</Typography>
                <Typography fontWeight={700}>$50</Typography>
              </Box>

              <Divider sx={{ mb: 4 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" fontWeight={900}>Total (USD)</Typography>
                <Typography variant="h5" fontWeight={900} color="#fb5b52">$1,250</Typography>
              </Box>
            </Paper>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
}

export default Book;
