import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/Store'
import { logout } from '../store/slices/authSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar, Toolbar, IconButton, Drawer, List, ListItem,
  ListItemButton, ListItemText, Box, useScrollTrigger,
  Snackbar, Alert, Tooltip, Badge,
} from '@mui/material'
import Button from './Button'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import Login from '../pages/Login'
import { useThemeContext } from '../context/ThemeContext'
import type { NavLink, ToastSeverity, ToastDetail } from '../types'
import { loadUserInbox } from '../store/slices/messagesSlice'
import Search from './Search'

const links: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/blog', label: 'Blog' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 10 })
  const [loginOpen, setLoginOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastSeverity, setToastSeverity] = useState<ToastSeverity>('success')
  const [navSearch, setNavSearch] = useState('')
  const user = useSelector((state: RootState) => state.auth.user)
  const isAdmin = user?.role === 'admin'
  const isAdminRoute = pathname.startsWith('/admin')
  const dispatch = useDispatch()
  const { mode, toggleTheme } = useThemeContext()

  const getBookingCount = () =>
    user
      ? (JSON.parse(localStorage.getItem('bookings_' + user.email) || '[]') as { status: string }[])
          .filter((b) => b.status !== 'Cancelled').length
      : 0

  const [bookingCount, setBookingCount] = useState(getBookingCount)

  const getUnreadMsgCount = () =>
    user ? loadUserInbox(user.email).filter((c) => c.unread).length : 0

  const [unreadMsgCount, setUnreadMsgCount] = useState(getUnreadMsgCount)

  useEffect(() => {
    const handleUpdate = () => setBookingCount(getBookingCount())
    window.addEventListener('bookingUpdated', handleUpdate)
    return () => window.removeEventListener('bookingUpdated', handleUpdate)
  }, [user])

  useEffect(() => {
    const handleInboxUpdate = () => setUnreadMsgCount(getUnreadMsgCount())
    window.addEventListener('userInboxUpdated', handleInboxUpdate)
    window.addEventListener('storage', handleInboxUpdate)
    return () => {
      window.removeEventListener('userInboxUpdated', handleInboxUpdate)
      window.removeEventListener('storage', handleInboxUpdate)
    }
  }, [user])

  useEffect(() => {
    const handleOpenLogin = () => setLoginOpen(true)
    const handleShowToast = (e: CustomEvent<ToastDetail>) => {
      setToastMessage(e.detail.message)
      setToastSeverity(e.detail.severity ?? 'success')
      setToastOpen(true)
    }
    window.addEventListener('openLogin', handleOpenLogin)
    window.addEventListener('showToast', handleShowToast)
    return () => {
      window.removeEventListener('openLogin', handleOpenLogin)
      window.removeEventListener('showToast', handleShowToast)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    window.dispatchEvent(
      new CustomEvent('showToast', { detail: { message: 'Logged out successfully', severity: 'success' } })
    )
  }

  const handleNavSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && navSearch.trim()) {
      navigate('/destinations?search=' + encodeURIComponent(navSearch.trim()))
      setNavSearch('')
    }
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={scrolled ? 2 : 0}
        sx={{
          bgcolor: scrolled
            ? mode === 'dark' ? 'rgba(15,23,42,0.97)' : 'rgba(255,255,255,0.95)'
            : mode === 'dark' ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          color: 'text.primary',
          transition: 'all 0.3s',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 }, py: 1, minHeight: 64 }}>

          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FlightTakeoffIcon sx={{ color: '#fb5b52', fontSize: '2.2rem', transform: 'rotate(-45deg)' }} />
            <Box component="span" sx={{ fontWeight: 800, fontSize: 24, color: 'text.primary', letterSpacing: '-0.5px' }}>
              Tour<span style={{ color: '#fb5b52' }}>X</span>Pro
            </Box>
          </Link>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {links.map((l) => (
              <Button
                key={l.to}
                component={Link}
                to={l.to}
                sx={{
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: pathname === l.to ? '#fb5b52' : 'text.primary',
                  borderRadius: 0,
                  px: 2,
                  '&:hover': { color: '#fb5b52', bgcolor: 'transparent' },
                }}
              >
                {l.label}
                {pathname !== l.to && <span style={{ color: '#fb5b52', marginLeft: '4px' }}>+</span>}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

            <Box sx={{ display: { xs: 'none', sm: 'block' }, width: 220 }}>
              <Search
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                onKeyDown={handleNavSearchKeyDown}
                placeholder="Search destinations..."
                size="small"
              />
            </Box>

            {user ? (
              <Box display="flex" alignItems="center" gap={1} ml={2}>
                <Box
                  component="span"
                  onClick={() => navigate('/profile')}
                  sx={{
                    fontSize: '14px', fontWeight: 600,
                    display: { xs: 'none', sm: 'inline' },
                    color: 'text.primary', cursor: 'pointer',
                    '&:hover': { color: '#fb5b52' }, transition: 'color 0.2s',
                  }}
                >
                  Hi, {user.name}
                </Box>
                {isAdmin && (
                  <Tooltip title={isAdminRoute ? 'Back to Website' : 'Admin Dashboard'}>
                    <Box
                      onClick={() => navigate(isAdminRoute ? '/' : '/admin')}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 0.8,
                        px: 1.5, py: 0.6, borderRadius: '20px', cursor: 'pointer',
                        fontSize: '12px', fontWeight: 700, border: '1.5px solid', transition: 'all 0.25s',
                        borderColor: isAdminRoute ? '#10b981' : '#6366f1',
                        color: isAdminRoute ? '#10b981' : '#6366f1',
                        bgcolor: isAdminRoute ? 'rgba(16,185,129,0.08)' : 'rgba(99,102,241,0.08)',
                        '&:hover': { bgcolor: isAdminRoute ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.15)' },
                      }}
                    >
                      <AdminPanelSettingsIcon sx={{ fontSize: 16 }} />
                      {isAdminRoute ? 'Website' : 'Dashboard'}
                    </Box>
                  </Tooltip>
                )}
                <Tooltip title="My Profile">
                  <IconButton id="nav-bookings-icon" onClick={() => navigate('/profile')} sx={{ color: 'text.primary' }}>
                    <Badge badgeContent={bookingCount + unreadMsgCount} color="error" max={9}>
                      <PersonIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Button variant="outlined" color="error" size="small" pill onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            ) : (
              <IconButton sx={{ color: 'text.primary', ml: 1 }} onClick={() => setLoginOpen(true)}>
                <PersonIcon />
              </IconButton>
            )}

            <IconButton onClick={toggleTheme} sx={{ color: 'text.primary' }}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <IconButton sx={{ display: { md: 'none' }, color: 'text.primary' }} onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, pt: 2, bgcolor: 'background.paper', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 1 }}>
            <IconButton onClick={() => setOpen(false)} sx={{ color: 'text.primary' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {links.map((l) => (
              <ListItem key={l.to} disablePadding>
                <ListItemButton
                  component={Link}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  sx={{ color: pathname === l.to ? '#fb5b52' : 'text.primary', fontWeight: 600 }}
                >
                  <ListItemText primary={l.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Login open={loginOpen} handleClose={() => setLoginOpen(false)} />
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Navbar
