import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '270px 1fr',
        overflow: 'auto',
        height: '100vh',
      }}
    >
      <Box sx={{ overflow: 'auto' }}>Sidebar</Box>
      <Box sx={{ display: 'grid', overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
};
