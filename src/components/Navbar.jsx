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
  const [open, setOpen] = React.useState(false);

  // Close drawer on route change
  React.useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <nav className="w-full border-b border-[#2B3B32]/10 bg-[#ECE9E2]/95 backdrop-blur-md shadow-xs relative z-50">

        {/* ── Desktop Layout (lg+) — nav links absolutely centered to full navbar width ── */}
        <div
          className="hidden lg:flex relative items-center h-[72px] w-full"
          style={{ paddingLeft: '5%', paddingRight: '5%' }}
        >

          {/* Brand — proportionally spaced from left edge */}
          <Link to="/" className="no-underline shrink-0">
            <span className="font-sans text-[15px] xl:text-[17px] font-normal tracking-[0.04em] text-[#2B3B32] whitespace-nowrap hover:text-[#B87E58] transition-colors">
              Barbaranne Hill-Irving
            </span>
          </Link>

          {/* Nav links — absolutely centered to the FULL navbar width, never shifts */}
          <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-8 xl:gap-12 2xl:gap-16 pointer-events-auto">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`font-sans text-[14px] xl:text-[15px] tracking-[0.03em] select-none whitespace-nowrap no-underline transition-colors ${
                      isActive
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
        </div>

        {/* ── Mobile / Tablet Header Bar (below lg) ── */}
        <div
          className="flex lg:hidden items-center justify-between h-[60px] w-full"
          style={{ paddingLeft: '5%', paddingRight: '5%' }}
        >
          {/* Brand */}
          <Link to="/" className="no-underline">
            <span className="font-sans text-[15px] sm:text-[17px] font-normal tracking-[0.04em] text-[#2B3B32] whitespace-nowrap hover:text-[#B87E58] transition-colors">
              Barbaranne Hill-Irving
            </span>
          </Link>

          {/* Hamburger → X animated button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex flex-col items-center justify-center w-10 h-10 cursor-pointer bg-transparent border-none p-0 outline-none shrink-0"
            style={{ gap: '5px' }}
          >
            <span
              className="block w-6 rounded-sm bg-[#2B3B32] transition-all duration-300 origin-center"
              style={{
                height: '1.5px',
                transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-6 rounded-sm bg-[#2B3B32] transition-all duration-200 origin-center"
              style={{
                height: '1.5px',
                opacity: open ? 0 : 1,
                transform: open ? 'scaleX(0)' : 'scaleX(1)',
              }}
            />
            <span
              className="block w-6 rounded-sm bg-[#2B3B32] transition-all duration-300 origin-center"
              style={{
                height: '1.5px',
                transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile / Tablet Slide-down Drawer (below lg) ── */}
      <div
        className="lg:hidden fixed left-0 right-0 z-40 overflow-hidden"
        style={{
          top: '60px',
          maxHeight: open ? '400px' : '0px',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease',
        }}
      >
        <div
          className="w-full flex flex-col bg-[#ECE9E2] border-b border-[#2B3B32]/10 shadow-lg pb-5 pt-1.5"
          style={{ paddingLeft: '5%', paddingRight: '5%' }}
        >

          {/* Nav links */}
          {NAV_ITEMS.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`no-underline flex items-center justify-between py-4 transition-colors ${
                  i < NAV_ITEMS.length - 1 ? 'border-b border-[#2B3B32]/[0.07]' : ''
                }`}
              >
                <span
                  className={`font-sans text-[13px] tracking-[0.09em] uppercase transition-colors ${
                    isActive ? 'font-semibold text-[#B87E58]' : 'font-normal text-[#2B3B32]'
                  }`}
                >
                  {item.name}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B87E58] shrink-0" />
                )}
              </Link>
            );
          })}

          {/* Book CTA */}
          <div className="pt-5">
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="font-sans no-underline flex items-center justify-center w-full h-11 border border-[#B87E58] text-[#233B33] hover:bg-[#B87E58] hover:text-white transition-colors duration-300 text-[11px] tracking-[0.16em] uppercase font-normal"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop — tap outside to close */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          style={{ top: '60px' }}
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
