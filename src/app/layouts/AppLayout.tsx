import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../widgets/sidebar/Sidebar';

export const AppLayout = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex' }}>
    <Sidebar />
    <Box sx={{ flex: 1, p: 2 }}>
      <Box
        sx={{
          minHeight: 'calc(100vh - 32px)',
          p: 3,
          borderRadius: '10px',
          backgroundColor: '#f4f9ef',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  </Box>
);
