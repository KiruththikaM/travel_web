import AdminLayout from '../components/AdminLayout';
import { Box, Switch, FormControlLabel } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';

const SettingRow = ({ label, checked, onChange }: { label: string; checked?: boolean; onChange?: () => void }) => (
  <Box sx={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    py: 2, borderBottom: '1px solid', borderColor: 'divider',
    '&:last-child': { borderBottom: 'none' },
  }}>
    <Box sx={{ fontWeight: 600, color: 'text.primary', fontSize: 14 }}>{label}</Box>
    <Switch checked={checked} onChange={onChange} color="error" />
  </Box>
);

const AdminSettings = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <AdminLayout>
      <Box sx={{ mb: 5 }}>
        <Box sx={{ fontSize: 28, fontWeight: 900, color: 'text.primary', letterSpacing: '-0.5px' }}>Settings</Box>
        <Box sx={{ color: 'text.secondary', mt: 0.5, fontSize: 15 }}>Configure your dashboard preferences.</Box>
      </Box>

      <Box sx={{
        bgcolor: 'background.paper', borderRadius: 4,
        border: '1px solid', borderColor: 'divider',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        p: 4,
      }}>
        <Box sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'text.disabled', mb: 2 }}>
          General Preferences
        </Box>
        <SettingRow label="Email Notifications" checked={true} />
        <SettingRow label="System Maintenance Mode" checked={false} />
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          py: 2,
        }}>
          <Box sx={{ fontWeight: 600, color: 'text.primary', fontSize: 14 }}>Dashboard Dark Theme</Box>
          <Switch checked={mode === 'dark'} onChange={toggleTheme} color="error" />
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default AdminSettings;
