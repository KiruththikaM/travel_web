import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', position: 'relative', overflowX: 'hidden' }}>

     
      <Box sx={{ display: { xs: 'none', lg: 'block' }, width: 260, flexShrink: 0, position: 'fixed', height: '100%', zIndex: 50 }}>
        <Sidebar />
      </Box>

      
      <Box sx={{
        display: { lg: 'none' },
        position: 'fixed', inset: 0, zIndex: 50,
        transition: 'transform 0.3s',
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}>
        <Box
          sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsSidebarOpen(false)}
        />
        <Box sx={{ position: 'relative', width: 280, height: '100%', bgcolor: 'background.paper', boxShadow: 8 }}>
          <Box
            onClick={() => setIsSidebarOpen(false)}
            sx={{ position: 'absolute', top: 16, right: 16, color: 'text.secondary', cursor: 'pointer', zIndex: 1 }}
          >
            <CloseIcon />
          </Box>
          <Sidebar />
        </Box>
      </Box>

      
      <Box sx={{ flex: 1, width: '100%', ml: { lg: '260px' }, transition: 'margin 0.3s' }}>

       
        <Box sx={{
          display: { xs: 'flex', lg: 'none' },
          height: 64,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          alignItems: 'center',
          px: 3,
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}>
          <Box
            component="button"
            onClick={() => setIsSidebarOpen(true)}
            sx={{
              p: 1, ml: -1, background: 'none', border: 'none', cursor: 'pointer',
              color: 'text.secondary', display: 'flex', alignItems: 'center',
              '&:hover': { color: '#fb5b52' }, transition: 'color 0.2s',
            }}
          >
            <MenuIcon />
          </Box>
          <Box sx={{ ml: 2, fontWeight: 800, color: 'text.primary', fontSize: 16 }}>Admin Panel</Box>
        </Box>

        <Box component="main" sx={{ p: { xs: 3, md: 5, lg: 6 } }}>
          <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
