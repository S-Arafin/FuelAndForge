import React, { useState } from 'react';
import { HiHome, HiChartBar, HiUser } from 'react-icons/hi';
import { IoBarbellOutline, IoNutritionOutline } from 'react-icons/io5';

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { name: 'Home', icon: HiHome },
    { name: 'Workouts', icon: IoBarbellOutline },
    { name: 'Nutrition', icon: IoNutritionOutline },
    { name: 'Analytics', icon: HiChartBar },
    { name: 'Profile', icon: HiUser },
  ];

  return (
    <div className="btm-nav p-4 md:hidden bg-base-200 flex justify-between items-center border-t border-base-300 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.name;
        return (
          <button
            key={item.name}
            type="button"
            onClick={() => setActiveTab(item.name)}
            className="{isActive ? 'text-primary active' : 'text-base-content/60'} p-5"
          >
            <Icon className="text-xl" />
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;