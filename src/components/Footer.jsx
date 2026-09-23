import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa6';

// ─── Social Links Config (all linking to https://x.com/IrvingHill37015) ───────
const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/BarbaranneHillIrvingRealtor', icon: FaFacebook },
  { name: 'Twitter', href: 'https://x.com/IrvingHill37015', icon: FaTwitter },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/barbaranne-hill-irving-llc-9262566', icon: FaLinkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/barbarannetherealtor/', icon: FaInstagram },
];

// ─── Footer Component ─────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer
      className="w-full bg-[#2B3B32] px-6 text-center text-white flex flex-col items-center justify-center shrink-0"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        minHeight: '190px',
        flexShrink: 0,
      }}
    >
      {/* Social Media Links Row */}
      <div
        className="flex items-center justify-center gap-5 sm:gap-6"
        style={{ marginBottom: '26px' }}
      >
        {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="text-white hover:text-[#B87E58] transition-all hover:scale-110 flex items-center justify-center"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>

      {/* Copyright Line */}
      <p className="text-xs sm:text-[13px] font-light tracking-[0.03em] text-white/90 text-center select-none">
        &copy; 2026 by Barbaranne Hill-Irving Real Estate Consulting.
      </p>
    </footer>
  );
}
