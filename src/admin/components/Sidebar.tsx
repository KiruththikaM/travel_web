import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import type { AppDispatch } from '../../store/Store';
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

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const mainItems = [
    { name: 'Dashboard', path: '/admin', icon: <DashboardIcon sx={{ fontSize: 20 }} /> },
    { name: 'My Tour', path: '/admin/destinations', icon: <TourIcon sx={{ fontSize: 20 }} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <ConfirmationNumberIcon sx={{ fontSize: 20 }} /> },
    { name: 'Calendar', path: '/admin/calendar', icon: <CalendarMonthIcon sx={{ fontSize: 20 }} /> },
    { name: 'Messages', path: '/admin/messages', icon: <ChatIcon sx={{ fontSize: 20 }} /> },
    { name: 'Users', path: '/admin/users', icon: <PeopleIcon sx={{ fontSize: 20 }} /> },
    { name: 'Settings', path: '/admin/settings', icon: <SettingsIcon sx={{ fontSize: 20 }} /> },
  ];

  const insightItems = [
    { name: 'Analytics', path: '/admin/analytics', icon: <AnalyticsIcon sx={{ fontSize: 20 }} /> },
    { name: 'Top Tours', path: '/admin/top-tours', icon: <PublicIcon sx={{ fontSize: 20 }} /> },
  ];

  const NavItem = ({ item }: { item: typeof mainItems[0] }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        to={item.path}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group text-sm font-semibold ${
          isActive
            ? 'bg-red-500 text-white shadow-md shadow-red-200'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
        }`}
      >
        <span className={`flex items-center ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`}>
          {item.icon}
        </span>
        {item.name}
      </Link>
    );
  };

  return (
    <div className="w-full h-full bg-white border-r border-slate-200 flex flex-col" style={{ fontFamily: 'inherit' }}>
  
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-base">✈️</span>
        </div>
        <h1 className="text-lg font-extrabold text-slate-900 m-0 tracking-tight">
          Tour<span className="text-red-500">X</span>Pro
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Main</p>
        <nav className="space-y-0.5 mb-6">
          {mainItems.map(item => <NavItem key={item.name} item={item} />)}
        </nav>

      
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Insights</p>
        <nav className="space-y-0.5 mb-6">
          {insightItems.map(item => <NavItem key={item.name} item={item} />)}
        </nav>
      </div>

     
      <div className="px-4 py-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all text-sm font-semibold"
        >
          <ExitToAppIcon sx={{ fontSize: 20 }} />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
