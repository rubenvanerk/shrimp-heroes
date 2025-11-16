
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Shield, BarChart2, User, HelpCircle } from 'react-feather';

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const activeClass = "text-rose-500";
  const inactiveClass = "text-gray-400";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center space-y-1 transition-transform duration-200 ease-in-out hover:scale-110 ${isActive ? activeClass : inactiveClass}`
      }
    >
      {icon}
      <span className="text-xs font-bold">{label}</span>
    </NavLink>
  );
};

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto bg-white/70 backdrop-blur-lg shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] rounded-t-3xl">
      <div className="flex justify-around items-center h-20">
        <NavItem to="/" icon={<Home size={24} />} label="Home" />
        <NavItem to="/guide" icon={<HelpCircle size={24} />} label="Guide" />
        <NavLink to="/report" className="-mt-16 z-10">
            <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-400 to-orange-300 rounded-full shadow-lg shadow-rose-300/50 transform transition-transform hover:scale-110">
                <Shield size={32} className="text-white" />
            </div>
        </NavLink>
        <NavItem to="/leaderboard" icon={<BarChart2 size={24} />} label="Leaders" />
        <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
      </div>
    </nav>
  );
};
