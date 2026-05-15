import { useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/Store'
import { addContactMessage } from '../store/slices/messagesSlice'
import { fetchDestinations } from '../store/slices/destinationsSlice'
import { Box, Container, Typography, Grid, Alert, TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import TelegramIcon from '@mui/icons-material/Telegram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

function Contact() {
  const dispatch = useDispatch<AppDispatch>()
  const destinations = useSelector((state: RootState) => state.destinations.items)
  const user = useSelector((state: RootState) => state.auth.user)

  const [sent, setSent] = useState(false)
  const [serverError, setServerError] = useState('')

  const destStatus = useSelector((state: RootState) => state.destinations.status)

  useEffect(() => {
    if (destStatus === 'idle' && destinations.length === 0) dispatch(fetchDestinations())
  }, [dispatch, destStatus, destinations.length])

  const contactSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters.')
      .test('not-spaces-only', 'Name must contain at least one letter.', val => !!val && /[a-zA-Z]/.test(val))
      .max(50, 'Name must not exceed 50 characters.')
      .required('Name is required.'),
    email: Yup.string()
      .email('Please enter a valid email address.')
      .required('Email is required.'),
    phone: Yup.string()
      .matches(/^\+?[0-9\s\-()]{7,15}$/, 'Please enter a valid phone number.')
      .nullable(),
    destination: Yup.string(),
    message: Yup.string()
      .trim()
      .min(2, 'Message must be at least 2 characters.')
      .max(1000, 'Message must not exceed 1000 characters.')
      .required('Message is required.'),
  })

  const formik = useFormik({
    initialValues: { name: user?.name ?? '', email: user?.email ?? '', phone: '', destination: '', message: '' },
    validationSchema: contactSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      setServerError('')
      dispatch(addContactMessage({
        name: values.name,
        email: values.email,
        phone: values.phone,
        destination: values.destination,
        message: values.message,
      }))
      emailjs.send('service_zlxwif9', 'template_doc6s9v', {
        title: 'New Contact Message',
        name: values.name,
        email: values.email,
        phone: values.phone || 'Not provided',
        destination: values.destination || 'Not specified',
        message: values.message,
      }, 'UZdscZBUE52_q_Tjs').then(() => {
        setSent(true)
        resetForm()
      }).catch((err) => {
        console.error('EmailJS error:', err)
        setSent(true)
        resetForm()
      })
    },
  })

  return (
    <Box sx={{
      pt: '5px', minHeight: '100vh',
      background: (theme: Theme) =>
        theme.palette.mode === 'dark' ? '#0f172a' : '#f5f5f5',
    }}>

     
      <Box sx={{ position: 'relative', height: { xs: 220, md: 300 }, overflow: 'hidden' }}>
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1600&auto=format&fit=crop"
          alt="Contact hero"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.55)' }} />
        <Box sx={{ position: 'relative', zIndex: 1, px: { xs: 4, md: 8 }, pt: { xs: 4, md: 6 }, color: '#fff' }}>
          <Typography
            variant="overline"
            sx={{ color: 'rgba(255,255,255,0.75)', letterSpacing: 3, fontWeight: 600, fontSize: '0.75rem' }}
          >
            CONTACT
          </Typography>
          <Typography variant="h3" fontWeight={900} sx={{ fontSize: { xs: '2rem', md: '3rem' }, mt: 0.5 }}>
            Contact Us
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 420, fontSize: '0.9rem', lineHeight: 1.7 }}>
            We'd love to hear from you. Reach out and our team will get back to you shortly.
          </Typography>
        </Box>
  
        <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ width: '100%', height: 60, display: 'block' }}>
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="#f5f5f5"
            />
          </svg>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="flex-start">

         
          <Grid item xs={12} md={4}>
            <Box sx={{
              bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#fce8e8',
              borderRadius: 3,
              p: 4,
              height: '100%',
            }}>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                <Box sx={{
                  width: 32, height: 32, borderRadius: '50%', bgcolor: '#fb5b52',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.3,
                }}>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>1</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={700} color="text.primary" fontSize={14}>Contact Number</Typography>
                  <Typography variant="body2" color="text.secondary" fontSize={13}>+880 123 456 789</Typography>
                </Box>
              </Box>

              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                <Box sx={{
                  width: 32, height: 32, borderRadius: '50%', bgcolor: '#fb5b52',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.3,
                }}>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>2</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={700} color="text.primary" fontSize={14}>Email</Typography>
                  <Typography variant="body2" color="text.secondary" fontSize={13}>exampleinfo@gmail.com</Typography>
                </Box>
              </Box>

              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
                <Box sx={{
                  width: 32, height: 32, borderRadius: '50%', bgcolor: '#fb5b52',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.3,
                }}>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>3</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={700} color="text.primary" fontSize={14}>Join On Our Page</Typography>
                  <Typography variant="body2" color="text.secondary" fontSize={13}>facebook/telegram.com</Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7, fontSize: '0.82rem' }}>
                Stay connected with us on social media for travel tips, destination highlights, and exclusive deals.
              </Typography>

              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {[
                  { icon: <FacebookIcon fontSize="small" />, color: '#1877f2' },
                  { icon: <TwitterIcon fontSize="small" />, color: '#1da1f2' },
                  { icon: <TelegramIcon fontSize="small" />, color: '#0088cc' },
                  { icon: <LinkedInIcon fontSize="small" />, color: '#0a66c2' },
                  { icon: <InstagramIcon fontSize="small" />, color: '#e1306c' },
                  { icon: <WhatsAppIcon fontSize="small" />, color: '#25d366' },
                ].map((s, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 34, height: 34, borderRadius: '50%',
                      bgcolor: s.color, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: '#fff', cursor: 'pointer',
                      transition: 'opacity 0.2s',
                      '&:hover': { opacity: 0.8 },
                    }}
                  >
                    {s.icon}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          
          <Grid item xs={12} md={8}>
            <Box sx={{
              bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#fff',
              borderRadius: 3,
              p: { xs: 3, md: 5 },
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            }}>
              <Typography variant="h5" fontWeight={800} color="text.primary" mb={1}>
                Send Us a Suggestion!
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3} sx={{ lineHeight: 1.7 }}>
                Have a question, feedback, or just want to say hello? Fill out the form below and we'll be in touch.
              </Typography>

              {sent && (
                <Box sx={{
                  position: 'relative',
                  mb: 3,
                  bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(34,197,94,0.1)' : '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: 3,
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}>
                  <Typography sx={{ fontSize: 32 }}>🎉</Typography>
                  <Box>
                    <Typography fontWeight={800} color="success.main" fontSize={15}>Message Sent Successfully!</Typography>
                    <Typography variant="body2" color="text.secondary" fontSize={13}>
                      We'll get back to you within 24 hours.
                    </Typography>
                  </Box>
                  <Box
                    component="button"
                    onClick={() => setSent(false)}
                    sx={{
                      ml: 'auto', background: 'none', border: 'none', cursor: 'pointer',
                      color: 'text.secondary', fontSize: 18, lineHeight: 1, p: 0.5,
                      '&:hover': { color: 'text.primary' },
                    }}
                  >
                    ✕
                  </Box>
                </Box>
              )}
                          
              {serverError && (
                <Alert severity="error" sx={{ borderRadius: 2, mb: 3 }}>{serverError}</Alert>
              )}

              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TextField
                    fullWidth size="small" label="Your Name"
                    name="name" value={formik.values.name}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.name && !!formik.errors.name}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                  />
                  <TextField
                    fullWidth size="small" label="Email Address" type="email"
                    name="email" value={formik.values.email}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                  />
                </div>

                <TextField
                  fullWidth size="small" label="Contact Number (Optional)"
                  name="phone" value={formik.values.phone}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  error={formik.touched.phone && !!formik.errors.phone}
                  helperText={formik.touched.phone && formik.errors.phone}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                />

                <FormControl
                  fullWidth size="small"
                  error={formik.touched.destination && !!formik.errors.destination}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                >
                  <InputLabel>Select Destination (Optional)</InputLabel>
                  <Select
                    name="destination"
                    value={formik.values.destination}
                    label="Select Destination (Optional)"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {destinations.map(dest => (
                      <MenuItem key={dest.id} value={dest.name}>{dest.name} — {dest.location}</MenuItem>
                    ))}
                  </Select>
                  {formik.touched.destination && formik.errors.destination && (
                    <FormHelperText>{formik.errors.destination}</FormHelperText>
                  )}
                </FormControl>

                <TextField
                  fullWidth size="small" label="Your Message" multiline rows={5}
                  placeholder="Tell us how we can help..."
                  name="message" value={formik.values.message}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  error={formik.touched.message && !!formik.errors.message}
                  helperText={formik.touched.message && formik.errors.message}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                />

                <div>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-2.5 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formik.isSubmitting ? 'SENDING...' : 'SUBMIT'}
                  </button>
                </div>
              </form>
            </Box>
          </Grid>
        </Grid>

        
        <Box sx={{ mt: 6, borderRadius: 3, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', height: 300 }}>
          <iframe
            title="TourXPro Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63704!2d79.8211!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1620000000000"
            width="100%"
            height="300"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
        
        <Grid container spacing={3} sx={{ mt: 6 }}>
          {[
            { icon: <PhoneIcon sx={{ fontSize: 36, color: '#fb5b52' }} />, title: 'Contact Us', value: '+880 123 456 789' },
            { icon: <EmailIcon sx={{ fontSize: 36, color: '#fb5b52' }} />, title: 'Gmail', value: 'exampleinfo@gmail.com' },
            { icon: <LocationOnIcon sx={{ fontSize: 36, color: '#fb5b52' }} />, title: 'Location', value: 'Lalbfour Bogura' },
          ].map(card => (
            <Grid item xs={12} sm={4} key={card.title}>
              <Box sx={{
                bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#fff',
                borderRadius: 3,
                p: 4,
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                borderBottom: '3px solid #fb5b52',
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>{card.icon}</Box>
                <Typography fontWeight={700} color="text.primary" mb={0.5}>{card.title}</Typography>
                <Typography variant="body2" color="text.secondary" fontSize={13}>{card.value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Contact
