import { useState } from 'react';
import { 
  HiHome, 
  HiBell,  
  HiFire, 
  HiChevronRight,
  HiChartBar,
  HiUser
} from 'react-icons/hi';
import { IoBarbellOutline, IoWaterOutline, IoFootstepsOutline, IoNutritionOutline } from 'react-icons/io5';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { name: 'Home', icon: HiHome },
    { name: 'Workouts', icon: IoBarbellOutline },
    { name: 'Nutrition', icon: IoNutritionOutline },
    { name: 'Analytics', icon: HiChartBar },
    { name: 'Profile', icon: HiUser },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 h-screen bg-base-200 text-base-content border-r border-base-300 p-4 sticky top-0 justify-between shrink-0">
      {/* User Info & Navigation */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img 
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                  alt="Alex Avatar" 
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-base-content/70">Good morning,</p>
              <h2 className="font-bold text-base tracking-tight">Hello, Alex!</h2>
            </div>
          </div>
          <button className="btn btn-ghost btn-circle btn-sm text-base-content/80 hover:text-primary">
            <HiBell className="text-xl" />
          </button>
        </div>

        
        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-content shadow-md'
                    : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
                }`}
              >
                <Icon className="text-xl" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Widget Cards */}
      {/* <div className="space-y-4 pt-4 border-t border-base-300">
        <div className="bg-base-100 p-3 rounded-2xl shadow-sm border border-base-300">
          <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-2 px-1">
            Today's Quick Overview
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-1.5 rounded-lg bg-base-200">
              <HiFire className="mx-auto text-secondary text-base mb-0.5" />
              <p className="text-xs font-bold">1.2k</p>
              <p className="text-[10px] text-base-content/60">KCAL</p>
            </div>
            <div className="p-1.5 rounded-lg bg-base-200">
              <IoWaterOutline className="mx-auto text-info text-base mb-0.5" />
              <p className="text-xs font-bold">1.8L</p>
              <p className="text-[10px] text-base-content/60">WATER</p>
            </div>
            <div className="p-1.5 rounded-lg bg-base-200">
              <IoFootstepsOutline className="mx-auto text-accent text-base mb-0.5" />
              <p className="text-xs font-bold">4.5k</p>
              <p className="text-[10px] text-base-content/60">STEPS</p>
            </div>
          </div>
        </div>

        <div className="bg-base-100 p-3 rounded-2xl shadow-sm border border-base-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary">
              <IoBarbellOutline className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-semibold">Push Day Routine</p>
              <p className="text-[11px] text-base-content/60">45 mins • 5 exercises</p>
            </div>
          </div>
          <button className="btn btn-ghost btn-circle btn-xs text-base-content/60 hover:text-primary">
            <HiChevronRight className="text-base" />
          </button>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;