import React from 'react';
import { NavLink } from 'react-router';
import { HiHome, HiChartBar, HiUser } from 'react-icons/hi';
import { IoBarbellOutline, IoNutritionOutline } from 'react-icons/io5';

const BottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/dashboard/home', icon: HiHome },
    { name: 'Workouts', path: '/dashboard/workouts', icon: IoBarbellOutline },
    { name: 'Nutrition', path: '/dashboard/nutrition', icon: IoNutritionOutline },
    { name: 'Analytics', path: '/dashboard/analytics', icon: HiChartBar },
    { name: 'Profile', path: '/dashboard/profile', icon: HiUser },
  ];

  return (
    <div className="btm-nav p-4 md:hidden fixed bg-base-200 flex bottom-0 left-0 right-0 justify-between items-center border-t border-base-300 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard/home'}
            className="{({ isActive }) =>
              isActive ? 'text-primary active' : 'text-base-content/60 hover:text-base-content'
            } p-5"
          >
            <Icon className="text-xl" />
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNav;