import { NavLink } from 'react-router';
import { 
  HiHome, 
  HiBell,  
  HiChartBar,
  HiUser
} from 'react-icons/hi';
import { IoBarbellOutline, IoNutritionOutline } from 'react-icons/io5';

const Sidebar = () => {
  const navItems = [
    { name: 'Home', path: '/dashboard/home', icon: HiHome },
    { name: 'Workouts', path: '/dashboard/workouts', icon: IoBarbellOutline },
    { name: 'Nutrition', path: '/dashboard/nutrition', icon: IoNutritionOutline },
    { name: 'Analytics', path: '/dashboard/analytics', icon: HiChartBar },
    { name: 'Profile', path: '/dashboard/profile', icon: HiUser },
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
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/dashboard/home'}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-content shadow-md'
                      : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
                  }`
                }
              >
                <Icon className="text-xl" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;