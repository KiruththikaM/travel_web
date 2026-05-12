import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import type { AppDispatch } from '../../store/Store';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';
import type { AdminNavItem } from '../../types';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TourIcon from '@mui/icons-material/Tour';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const mainItems: AdminNavItem[] = [
  { name: 'Dashboard',  path: '/admin',               icon: <DashboardIcon sx={{ fontSize: 20 }} /> },
  { name: 'My Tour',    path: '/admin/destinations',   icon: <TourIcon sx={{ fontSize: 20 }} /> },
  { name: 'Bookings',   path: '/admin/bookings',       icon: <ConfirmationNumberIcon sx={{ fontSize: 20 }} /> },
  { name: 'Calendar',   path: '/admin/calendar',       icon: <CalendarMonthIcon sx={{ fontSize: 20 }} /> },
  { name: 'Messages',   path: '/admin/messages',       icon: <ChatIcon sx={{ fontSize: 20 }} /> },
  { name: 'Users',      path: '/admin/users',          icon: <PeopleIcon sx={{ fontSize: 20 }} /> },
  { name: 'Settings',   path: '/admin/settings',       icon: <SettingsIcon sx={{ fontSize: 20 }} /> },
];

const insightItems: AdminNavItem[] = [
  { name: 'Analytics', path: '/admin/analytics',  icon: <AnalyticsIcon sx={{ fontSize: 20 }} /> },
  { name: 'Top Tours', path: '/admin/top-tours',  icon: <PublicIcon sx={{ fontSize: 20 }} /> },
];

const NavItem = ({ item, currentPath }: { item: AdminNavItem; currentPath: string }) => {
  const isActive = currentPath === item.path;
  return (
    <Link to={item.path} style={{ textDecoration: 'none' }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1.5,
        px: 2, py: 1.25, borderRadius: 3,
        fontSize: 14, fontWeight: 600,
        transition: 'all 0.2s',
        bgcolor: isActive ? '#fb5b52' : 'transparent',
        color: isActive ? '#fff' : 'text.secondary',
        boxShadow: isActive ? '0 4px 12px rgba(251,91,82,0.25)' : 'none',
        '&:hover': isActive ? {} : { bgcolor: 'action.hover', color: 'text.primary' },
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', color: isActive ? '#fff' : 'text.disabled' }}>
          {item.icon}
        </Box>
        {item.name}
      </Box>
    </Link>
  );
};

const SectionLabel = ({ label }: { label: string }) => (
  <Box sx={{ fontSize: 10, fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: 2, px: 2, mb: 1 }}>
    {label}
  </Box>
);

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', borderRight: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>

      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: '#fb5b52', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 16 }}>✈️</span>
          </Box>
          <Box sx={{ fontWeight: 800, fontSize: 18, color: 'text.primary', letterSpacing: '-0.5px' }}>
            Tour<span style={{ color: '#fb5b52' }}>X</span>Pro
          </Box>
        </Box>
        <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
          <IconButton onClick={toggleTheme} size="small" sx={{ color: 'text.secondary' }}>
            {mode === 'dark' ? <LightModeIcon sx={{ fontSize: 18 }} /> : <DarkModeIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        </Tooltip>
      </Box>

     
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2 }}>
        <SectionLabel label="Main" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 3 }}>
          {mainItems.map(item => <NavItem key={item.name} item={item} currentPath={location.pathname} />)}
        </Box>

        <SectionLabel label="Insights" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {insightItems.map(item => <NavItem key={item.name} item={item} currentPath={location.pathname} />)}
        </Box>
      </Box>

      
      <Box sx={{ px: 2, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box
          component="button"
          onClick={handleLogout}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1.5,
            width: '100%', px: 2, py: 1.25, borderRadius: 3,
            fontSize: 14, fontWeight: 600,
            color: 'text.secondary', background: 'none', border: 'none', cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': { bgcolor: 'rgba(251,91,82,0.08)', color: '#fb5b52' },
          }}
        >
          <ExitToAppIcon sx={{ fontSize: 20 }} />
          Back to Home
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
