import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// ─── Nav Items Config ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

// ─── Navbar Component ──────────────────────────────────────────────────────────
export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#2B3B32]/10 bg-[#ECE9E2]">
      {/* Desktop & Tablet: 3-column grid for true, mathematical center */}
      <div className="hidden sm:grid sm:grid-cols-3 items-center h-[72px] w-full px-6 sm:px-12">
        {/* Left Column: Brand Name (shifted right by 24px as requested) */}
        <div className="flex items-center justify-start" style={{ paddingLeft: '36px' }}>
          <Link to="/" className="no-underline">
            <span className="font-sans text-lg sm:text-xl font-normal tracking-[0.04em] text-[#2B3B32] whitespace-nowrap hover:text-[#B87E58] transition-colors">
              Barbaranne Hill-Irving
            </span>
          </Link>
        </div>

        {/* Center Column: Navigation Items with increased mid gap (+20px) */}
        <div
          className="flex items-center justify-center gap-20 md:gap-24"
          style={{ gap: '96px' }}
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

        {/* Right Column: Empty spacer to guarantee Col 2 remains in exact dead center */}
        <div className="flex items-center justify-end" />
      </div>

      {/* Mobile (<640px): Centered Layout */}
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
