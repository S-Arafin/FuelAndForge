import { NavLink } from 'react-router';
import { 
  HiHome, 
  HiBell,  
  HiChartBar,
  HiUser,
  HiDocumentReport,
  HiLogout
} from 'react-icons/hi';
import { IoBarbellOutline, IoNutritionOutline } from 'react-icons/io5';

const Sidebar = () => {
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

          {/* Dashboard */}
          <NavLink
            to="/dashboard/home"
            end
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-content shadow-md'
                  : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
              }`
            }
          >
            <HiHome className="text-xl" />
            <span>Dashboard</span>
          </NavLink>


          {/* Workout */}
          <div className="mt-3">
          <NavLink
            to="/dashboard/workout"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-content shadow-md'
                  : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
              }`
            }
          >
            <IoBarbellOutline className="text-lg" />
              <span>Workout</span>
          </NavLink>
          

            

            {/* Exercises */}
            <NavLink
              to="/dashboard/workouts"
              end
              className={({ isActive }) =>
                `w-full flex items-center gap-3 pl-11 pr-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-content shadow-md'
                    : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
                }`
              }
            >
              <span>Exercises</span>
            </NavLink>

            {/* Routines */}
            <NavLink
              to="/dashboard/workouts/routine"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 pl-11 pr-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-content shadow-md'
                    : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
                }`
              }
            >
              <span>Routines</span>
            </NavLink>

            {/* Workout History */}
            <NavLink
              to="/dashboard/workouts/history"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 pl-11 pr-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-content shadow-md'
                    : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
                }`
              }
            >
              <span>Workout History</span>
            </NavLink>

          </div>


          {/* Nutrition */}
          <NavLink
            to="/dashboard/nutrition"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-content shadow-md'
                  : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
              }`
            }
          >
            <IoNutritionOutline className="text-xl" />
            <span>Nutrition</span>
          </NavLink>


          {/* Analytics */}
          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-content shadow-md'
                  : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
              }`
            }
          >
            <HiChartBar className="text-xl" />
            <span>Analytics</span>
          </NavLink>


          {/* Body-Stats */}
          <NavLink
            to="/dashboard/body-stats"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-content shadow-md'
                  : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
              }`
            }
          >
            <HiUser className="text-xl" />
            <span>Body-Stats</span>
          </NavLink>
          <NavLink
            to="/dashboard/reports"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-content shadow-md'
                  : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
              }`
            }
          >
            <HiDocumentReport className="text-xl" />
            <span>Report</span>
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-content shadow-md'
                  : 'hover:bg-base-300 text-base-content/80 hover:text-base-content'
              }`
            }
          >
            <HiLogout className="text-xl" />
            <span>Log Out</span>
          </NavLink>

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;