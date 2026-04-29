import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
    { name: 'Destinations', path: '/admin/destinations', icon: <PublicIcon /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <ConfirmationNumberIcon /> },
    { name: 'Users', path: '/admin/users', icon: <PeopleIcon /> },
    { name: 'Settings', path: '/admin/settings', icon: <SettingsIcon /> },
  ];

  const primaryColor = '#6366f1';
  return (
    <div className="w-full h-full bg-slate-950/95 backdrop-blur-xl text-white border-r border-white/10 p-8 flex flex-col">
      <div className="flex items-center gap-3 mb-10 pl-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${primaryColor}, #818cf8)` }}>
          <span className="text-lg">✈️</span>
        </div>
        <h1 className="text-xl font-extrabold text-white m-0 tracking-tight">
          Tour<span className="text-indigo-500">X</span>Pro
        </h1>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-indigo-600/15 text-white border border-indigo-500/20 shadow-lg shadow-indigo-500/10' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <span className={`flex items-center text-xl transition-colors ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/70'}`}>
                {item.icon}
              </span>
              <span className="font-semibold text-sm tracking-wide">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <button className="flex items-center justify-center gap-3 w-full p-3.5 bg-white/5 rounded-2xl text-white/70 border border-white/5 transition-all hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 text-sm font-semibold">
          <ExitToAppIcon className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
