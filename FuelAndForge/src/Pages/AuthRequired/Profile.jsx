import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { 
  HiCamera, 
  HiChevronRight, 
  HiCog, 
  HiBell, 
  HiQuestionMarkCircle, 
  HiLogout 
} from 'react-icons/hi';
import { LuScale, LuTrophy, LuDumbbell } from 'react-icons/lu';

const Profile = () => {
  const location = useLocation();

  const stats = [
    { label: 'WORKOUTS', value: '124', color: 'text-primary' },
    { label: 'STREAK', value: '14', color: 'text-secondary' },
    { label: 'PRS', value: '32', color: 'text-accent' },
  ];

  const menuOptions = [
    {
      id: 'body-stats',
      title: 'Body Stats',
      path: '/dashboard/profile/body-status', // Navigates to the body-status child route
      icon: LuScale,
      iconBg: 'bg-primary/10 text-primary',
    },
    {
      id: 'achievement',
      title: 'Achievement',
      path: '/dashboard/profile/achievement',
      icon: LuTrophy,
      iconBg: 'bg-secondary/10 text-secondary',
    },
    {
      id: 'my-equipments',
      title: 'My Equipments',
      path: '/dashboard/profile/my-equipments',
      icon: LuDumbbell,
      iconBg: 'bg-accent/10 text-accent',
    },
    {
      id: 'app-settings',
      title: 'App Settings',
      path: '/dashboard/profile/settings',
      icon: HiCog,
      iconBg: 'bg-base-300 text-base-content/70',
    },
    {
      id: 'reminders',
      title: 'Reminders',
      path: '/dashboard/profile/reminders',
      icon: HiBell,
      iconBg: 'bg-primary/10 text-primary',
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      path: '/dashboard/profile/support',
      icon: HiQuestionMarkCircle,
      iconBg: 'bg-base-300 text-base-content/70',
    },
  ];

  const handleSignOut = () => {
    console.log('User signed out');
  };

  // If currently viewing a child route (e.g., /dashboard/profile/body-status), render the child component via Outlet
  const isChildRoute = location.pathname !== '/dashboard/profile';

  if (isChildRoute) {
    return <Outlet />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-3 bg-base-200 p-6 md:p-8 rounded-3xl border border-base-300 shadow-sm">
        {/* Avatar with Upload Camera Button */}
        <div className="relative">
          <div className="avatar">
            <div className="w-24 md:w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
              <img 
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                alt="Alex Johnson Avatar" 
              />
            </div>
          </div>
          <button 
            type="button" 
            aria-label="Upload Avatar"
            className="btn btn-circle btn-primary btn-xs absolute bottom-0 right-0 shadow-md hover:scale-110 transition-transform"
          >
            <HiCamera className="text-xs text-primary-content" />
          </button>
        </div>

        {/* User Info */}
        <div className="max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Alex Johnson</h1>
          <p className="text-xs md:text-sm text-base-content/70 mt-1.5 leading-relaxed">
            Fitness enthusiast & powerlifting competitor. Focused on strength gains and aesthetic goals.
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 w-full max-w-lg pt-4">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="bg-base-100 p-3 md:p-4 rounded-2xl border border-base-300 text-center shadow-sm"
            >
              <p className={`text-xl md:text-2xl font-black ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-[10px] md:text-xs font-bold text-base-content/60 uppercase tracking-wider mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Options List */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-base-content/60 uppercase tracking-widest px-1">
          Account Settings
        </p>

        {/* Responsive Grid: 1 column on Mobile, 2 columns on Tablet & Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {menuOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                to={option.path}
                className="w-full bg-base-200 hover:bg-base-300/70 p-4 rounded-2xl border border-base-300 transition-all duration-200 flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-3 rounded-xl ${option.iconBg}`}>
                    <Icon className="text-xl" />
                  </div>
                  <span className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors">
                    {option.title}
                  </span>
                </div>
                <HiChevronRight className="text-lg text-base-content/40 group-hover:translate-x-1 transition-transform" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full btn btn-outline btn-error rounded-2xl border-error/30 hover:border-error flex items-center justify-center gap-2 font-bold py-3 text-sm md:text-base"
        >
          <HiLogout className="text-xl" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Render sub-routes here if needed */}
      <Outlet />
    </div>
  );
};

export default Profile;