import React, { useState, Suspense } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { WidgetComponentProvider } from '../utils/LoadAppContext';
import { ClearDashboardProvider } from '../utils/ClearDashboardContext';
import { DashboardNamesProvider } from '../utils/DashboardNamesContext';

const StatusBarSvelte = React.lazy(() => import('../parcels/StatusBarSvelte'));

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <WidgetComponentProvider>
      <ClearDashboardProvider>
        <DashboardNamesProvider>
          <div className="flex h-screen">
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

            <div className="flex flex-col flex-grow overflow-hidden">
              <Navbar toggleSidebar={toggleSidebar} />
              <Outlet />
              <div className="w-full">
                <Suspense fallback={<div>Loading...</div>}>
                  <StatusBarSvelte />
                </Suspense>
              </div>
            </div>
          </div>
        </DashboardNamesProvider>
      </ClearDashboardProvider>
    </WidgetComponentProvider>
  );
};

export default Layout;
