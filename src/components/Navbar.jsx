import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// ─── Nav Items Config ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Schedule', path: '/booking' },
  { name: 'Contact', path: '/contact' },
];

// ─── Navbar Component ──────────────────────────────────────────────────────────
export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="w-full border-b border-[#2B3B32]/10 bg-[#ECE9E2]/95 backdrop-blur-md shadow-xs">
  
      <div className="hidden sm:grid sm:grid-cols-3 items-center h-[72px] w-full px-6 sm:px-12">
    
        <div className="flex items-center justify-start" style={{ paddingLeft: '36px' }}>
          <Link to="/" className="no-underline">
            <span className="font-sans text-lg sm:text-xl font-normal tracking-[0.04em] text-[#2B3B32] whitespace-nowrap hover:text-[#B87E58] transition-colors">
              Barbaranne Hill-Irving
            </span>
          </Link>
        </div>

        {/* Center Column: Navigation Items */}
        <div
          className="flex items-center justify-center gap-10 md:gap-14 lg:gap-16"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`font-sans text-sm sm:text-[15px] tracking-[0.03em] select-none whitespace-nowrap no-underline transition-colors ${isActive
                  ? 'font-medium text-[#B87E58]'
                  : 'font-normal text-[#2B3B32] hover:text-[#B87E58]'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>


        <div className="flex items-center justify-end" />
      </div>

      <div className="flex sm:hidden flex-col items-center justify-center gap-2.5 py-3 px-4">
        <Link to="/" className="no-underline">
          <span className="font-sans text-base font-normal tracking-[0.04em] text-[#2B3B32]">
            Barbaranne Hill-Irving
          </span>
        </Link>
        <div className="flex items-center justify-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`font-sans text-xs tracking-[0.03em] select-none no-underline transition-colors ${isActive
                  ? 'font-medium text-[#B87E58]'
                  : 'font-normal text-[#2B3B32] hover:text-[#B87E58]'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
