import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Box, Container, Typography, Grid, TextField, MenuItem, Alert } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import Card from '../components/Card.tsx'
import Button from '../components/Button'
import SendIcon from '@mui/icons-material/Send'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const contactInfo = [
  { icon: <LocationOnIcon sx={{ color: '#fb5b52' }} />, label: 'Address', value: '42 Galle Road, Colombo 03, Sri Lanka' },
  { icon: <PhoneIcon sx={{ color: '#fb5b52' }} />, label: 'Phone', value: '+94 11 234 5678' },
  { icon: <EmailIcon sx={{ color: '#fb5b52' }} />, label: 'Email', value: 'hello@tourxpro.com' },
  { icon: <AccessTimeIcon sx={{ color: '#fb5b52' }} />, label: 'Hours', value: 'Mon–Sat: 9am – 6pm (IST)' },
]

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '&.Mui-focused fieldset': { borderColor: '#fb5b52' },
  },
  '& label.Mui-focused': { color: '#fb5b52' },
}

function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', destination: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    emailjs.send('service_zlxwif9', 'template_doc6s9v', {
      title: 'New Message',
      name: form.name,
      email: form.email,
      destination: form.destination || 'Not specified',
      message: form.message,
    }, 'UZdscZBUE52_q_Tjs').then(() => {
      setSent(true)
      setForm({ name: '', email: '', destination: '', message: '' })
    }).catch((err) => {
      console.error('Failed to send message:', err)
      window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Failed to send message. Please try again.', severity: 'error' } }))
    })
  }

  return (
    <Box sx={{
      pt: '80px', minHeight: '100vh',
      background: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
          : 'linear-gradient(160deg, #fff1f0 0%, #fff5f5 50%, #fff1f0 100%)',
    }}>

      <Box sx={{ position: 'relative', height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Box component="img" src="https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1600&auto=format&fit=crop" alt="Contact"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)' }} />
        <Box sx={{
          position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          background: 'rgba(0,0,0,0.3)', px: { xs: 4, md: 8 }, py: { xs: 3, md: 5 }, borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.2)', maxWidth: '90%',
        }}>
          <Typography variant="h3" fontWeight={900} mb={1} sx={{ fontSize: { xs: '2.2rem', md: '3.5rem' } }}>Plan Your Trip</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>We'll craft your perfect Sri Lanka journey</Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8}>


          <Grid item xs={12} md={5}>
            <Typography variant="h4" fontWeight={900} color="text.primary" mb={3} sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>Get in Touch</Typography>
            <Typography color="text.secondary" mb={5} sx={{ lineHeight: 1.9, fontSize: '1.05rem' }}>
              Whether you're planning a solo adventure, a family holiday, or a honeymoon escape — our local experts are here to help you every step of the way.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {contactInfo.map(c => (
                <Card key={c.label} sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3, borderRadius: 4 }}>
                  <Box sx={{ 
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(251, 91, 82, 0.1)' : 'rgba(251, 91, 82, 0.05)',
                    p: 1.5, borderRadius: 2, display: 'flex'
                  }}>{c.icon}</Box>
                  <Box>
                    <Typography fontWeight={800} color="text.primary" fontSize={15} sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>{c.label}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>{c.value}</Typography>
                  </Box>
                </Card>
              ))}
            </Box>
          </Grid>


          <Grid item xs={12} md={7}>
            <Card sx={{ p: { xs: 4, md: 6 }, borderRadius: 6 }}>
              {sent ? (
                <Box textAlign="center" py={6}>
                  <Typography sx={{ fontSize: { xs: 48, md: 64 }, mb: 2 }}>🎉</Typography>
                  <Typography variant="h5" fontWeight={900} color="text.primary" mb={1}>Message Sent!</Typography>
                  <Typography color="text.secondary" mb={4}>We'll get back to you within 24 hours.</Typography>
                  <Alert severity="success" sx={{ borderRadius: 3, justifyContent: 'center', py: 2 }}>
                    Thank you for reaching out to TourXPro!
                  </Alert>
                  <Button onClick={() => setSent(false)} sx={{ mt: 4, color: '#fb5b52', textTransform: 'none', fontWeight: 800 }}>
                    Send another message
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Full Name" fullWidth required value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} sx={inputSx} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Email" type="email" fullWidth required value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })} sx={inputSx} />
                    </Grid>
                  </Grid>
                  <TextField label="Interested Destination" select fullWidth value={form.destination}
                    onChange={e => setForm({ ...form, destination: e.target.value })} sx={inputSx}>
                    {['Sigiriya', 'Ella', 'Mirissa', 'Kandy', 'Galle Fort', 'Yala National Park', 'Multiple'].map(d => (
                      <MenuItem key={d} value={d}>{d}</MenuItem>
                    ))}
                  </TextField>
                  <TextField label="Message" multiline rows={5} fullWidth required
                    placeholder="Tell us about your dream trip..." value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })} sx={inputSx} />
                  <Button type="submit" variant="contained" size="large" endIcon={<SendIcon />}
                    sx={{ py: 2, fontSize: 17, fontWeight: 800, borderRadius: 3 }}>
                    Send Message
                  </Button>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Contact
