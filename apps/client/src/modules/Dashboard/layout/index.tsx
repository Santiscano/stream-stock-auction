import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import SidebarLayout from './Sidebar';
import Main from './Main';
import { DrawerHeader } from '../components/sidebar/Drawer';

const DashboardLayout = () => {

  return (
    <Box sx={{ display: "flex" }}>

      {/* NavBar */}
      <Navbar />

      {/* sidebar */}
      <SidebarLayout />

      {/* main */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Main>
          <Outlet />
        </Main>
      </Box>

    </Box>
  );
};

export default DashboardLayout;
