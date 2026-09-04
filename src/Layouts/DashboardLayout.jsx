import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../Components/Sidebar';
import BottomNav from '../Components/BottomNav';


const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col md:flex-row">
      {/* Sidebar - Desktop & Tablet */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 md:pb-6 overflow-y-auto max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Bottom Navigation Bar - Mobile Only */}
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;