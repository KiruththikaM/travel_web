import React from 'react';
import { Box } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <Box sx={{
      position: 'relative',
      display: 'flex', alignItems: 'center', gap: 2.5,
      p: 3, borderRadius: 4,
      bgcolor: 'background.paper',
      border: '1px solid', borderColor: 'divider',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      transition: 'all 0.3s',
      cursor: 'pointer', overflow: 'hidden',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' },
    }}>
     
      <Box sx={{
        position: 'absolute', top: -10, right: -10,
        width: 80, height: 80, borderRadius: '50%',
        bgcolor: color, opacity: 0.08,
      }} />

     
      <Box sx={{
        position: 'relative', zIndex: 1,
        width: 56, height: 56, borderRadius: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, color,
        bgcolor: `${color}18`,
        boxShadow: `0 4px 12px ${color}20`,
      }}>
        {icon}
      </Box>

      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'text.secondary' }}>
          {title}
        </Box>
        <Box sx={{ fontSize: 24, fontWeight: 800, color: 'text.primary', mt: 0.5, letterSpacing: '-0.5px' }}>
          {value}
        </Box>
      </Box>
    </Box>
  );
};

export default StatCard;
