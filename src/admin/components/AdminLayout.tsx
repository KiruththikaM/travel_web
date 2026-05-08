import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 relative overflow-x-hidden">

      <div className="hidden lg:block w-[260px] fixed h-full z-50">
        <Sidebar />
      </div>

      <div className={`
        lg:hidden fixed inset-0 z-50 transition-all duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        <div className="relative w-[280px] h-full bg-white shadow-2xl">
          <div className="absolute top-4 right-4 text-white cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
            <CloseIcon />
          </div>
          <Sidebar />
        </div>
      </div>


      <div className={`flex-1 w-full lg:ml-[260px] transition-all duration-300`}>

        <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center px-6 sticky top-0 z-40">
          <button
            className="p-2 -ml-2 text-slate-600 hover:text-red-500 transition"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon />
          </button>
          <div className="ml-4 font-bold text-slate-900">Admin Panel</div>
        </header>

        <main className="p-6 md:p-10 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
